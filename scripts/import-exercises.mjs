import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const sourceDir = process.argv[2]
const outFile = path.join(projectRoot, 'public', 'data', 'exercises.json')

if (!sourceDir) {
  console.error('Uso: npm run import:exercises -- "C:\\\\ruta\\\\a\\\\ejercicios"')
  process.exit(1)
}

const resolvedSourceDir = path.resolve(sourceDir)

if (!fs.existsSync(resolvedSourceDir)) {
  console.error(`No existe la carpeta de ejercicios: ${resolvedSourceDir}`)
  process.exit(1)
}

const keywordTags = [
  ['for', 'bucles'],
  ['while', 'bucles'],
  ['if', 'condicionales'],
  ['elif', 'condicionales'],
  ['else', 'condicionales'],
  ['input', 'entrada'],
  ['print', 'salida'],
  ['int', 'numeros'],
  ['float', 'numeros'],
  ['def', 'funciones'],
  ['list', 'listas'],
  ['append', 'listas'],
  ['dict', 'diccionarios'],
  ['{', 'diccionarios'],
  ['random', 'aleatorio'],
  ['import', 'modulos'],
]

const filenameTags = [
  ['login', 'validacion'],
  ['descuento', 'descuentos'],
  ['compra', 'compras'],
  ['pizzeria', 'compras'],
  ['pasajes', 'compras'],
  ['cajero', 'simulacion'],
  ['quiz', 'quiz'],
  ['test', 'quiz'],
  ['puntos', 'puntajes'],
  ['promedio', 'numeros'],
  ['division', 'numeros'],
  ['piramide', 'patrones'],
  ['luces', 'simulacion'],
  ['calculadora', 'calculadora'],
  ['medicamentos', 'salud'],
  ['residuos', 'medioambiente'],
  ['tarjeta', 'validacion'],
]

function slugify(name) {
  return name
    .replace(/\.py$/i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function stripComment(line) {
  return line.replace(/^\s*#\s?/, '').trimEnd()
}

function splitPremiseAndSolution(content) {
  const lines = content.replace(/^\uFEFF/, '').split(/\r?\n/)
  const premiseLines = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    if (/^\s*#/.test(line)) {
      premiseLines.push(stripComment(line))
      index += 1
      continue
    }
    if (line.trim() === '' && premiseLines.length > 0) {
      index += 1
      break
    }
    if (line.trim() === '') {
      index += 1
      continue
    }
    break
  }

  return {
    premisa: premiseLines.join('\n').trim(),
    solucion: lines.slice(index).join('\n').trim(),
  }
}

function inferTags(filename, code) {
  const tags = new Set(['python'])
  const lowerName = filename.toLowerCase()
  const lowerCode = code.toLowerCase()

  for (const [needle, tag] of filenameTags) {
    if (lowerName.includes(needle)) {
      tags.add(tag)
    }
  }

  for (const [needle, tag] of keywordTags) {
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (new RegExp(`(^|\\W)${escaped}($|\\W)`).test(lowerCode)) {
      tags.add(tag)
    }
  }

  return Array.from(tags).sort()
}

function makeSteps(code) {
  const steps = []
  const lower = code.toLowerCase()

  if (lower.includes('input(')) steps.push('Solicitar los datos necesarios al usuario.')
  if (/\bif\b|\belif\b|\belse\b/.test(lower)) steps.push('Evaluar las condiciones del problema con estructuras condicionales.')
  if (/\bfor\b|\bwhile\b/.test(lower)) steps.push('Repetir el proceso requerido usando ciclos.')
  if (/\bprint\(/.test(lower)) steps.push('Mostrar el resultado final en pantalla.')

  if (steps.length === 0) {
    steps.push('Leer y preparar los datos iniciales del ejercicio.')
    steps.push('Aplicar la logica solicitada en la premisa.')
    steps.push('Entregar el resultado esperado.')
  }

  while (steps.length < 3) {
    steps.splice(Math.max(steps.length - 1, 0), 0, 'Procesar los valores intermedios segun las reglas del enunciado.')
  }

  return steps.slice(0, 5).map((texto, index) => ({ id: `paso_${index + 1}`, texto }))
}

function makeBlocks(code, steps) {
  const lines = code.split(/\r?\n/)
  const nonEmpty = lines.map((line, index) => ({ line, index })).filter(({ line }) => line.trim() !== '')
  const chunks = []
  const chunkSize = Math.max(2, Math.ceil(nonEmpty.length / 3))

  for (let i = 0; i < Math.min(3, nonEmpty.length); i += 1) {
    const slice = nonEmpty.slice(i * chunkSize, (i + 1) * chunkSize)
    if (slice.length === 0) continue
    chunks.push({
      id: `bloque_${chunks.length + 1}`,
      etiqueta: chunks.length === 0 ? 'entrada y preparacion' : chunks.length === 1 ? 'logica principal' : 'salida',
      lineas: slice.map(({ line }) => line).join('\n'),
      paso_asociado: steps[Math.min(chunks.length, steps.length - 1)].id,
    })
  }

  if (chunks.length >= 2) {
    return chunks
  }

  return [
    {
      id: 'bloque_1',
      etiqueta: 'solucion completa',
      lineas: code,
      paso_asociado: steps[0].id,
    },
    {
      id: 'bloque_2',
      etiqueta: 'resultado',
      lineas: lines.slice(-Math.min(lines.length, 3)).join('\n'),
      paso_asociado: steps[steps.length - 1].id,
    },
  ]
}

const files = fs
  .readdirSync(resolvedSourceDir)
  .filter((name) => name.toLowerCase().endsWith('.py'))
  .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))

const exercises = files.map((file) => {
  const fullPath = path.join(resolvedSourceDir, file)
  const content = fs.readFileSync(fullPath, 'utf8')
  const { premisa, solucion } = splitPremiseAndSolution(content)
  const pasos = makeSteps(solucion)

  return {
    id: slugify(file),
    nombre: file,
    premisa: premisa || `Resolver el ejercicio ${file}.`,
    solucion,
    pasos,
    bloques: makeBlocks(solucion, pasos),
    etiquetas: inferTags(file, solucion),
  }
})

fs.writeFileSync(outFile, `${JSON.stringify(exercises, null, 2)}\n`, 'utf8')
console.log(`generated ${exercises.length} exercises -> ${path.relative(projectRoot, outFile)}`)
