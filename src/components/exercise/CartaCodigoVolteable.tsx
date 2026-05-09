import { useState } from 'react'
import type { Ejercicio } from '../../types'

type TokenType = 'keyword' | 'string' | 'comment' | 'builtin' | 'text'

type CodeToken = {
  text: string
  type: TokenType
}

type CartaCodigoVolteableProps = {
  ejercicio: Ejercicio
}

const keywords = new Set([
  'def',
  'class',
  'for',
  'while',
  'if',
  'elif',
  'else',
  'return',
  'import',
  'from',
  'in',
  'not',
  'and',
  'or',
  'pass',
  'True',
  'False',
  'None',
])

const builtins = new Set(['print', 'len', 'range', 'type', 'str', 'int', 'list', 'dict'])

function tokenClass(type: TokenType) {
  if (type === 'keyword') return 'text-primary'
  if (type === 'string') return 'text-secondary-fixed'
  if (type === 'comment') return 'text-on-surface-variant italic'
  if (type === 'builtin') return 'text-tertiary'
  return 'text-on-surface'
}

function tokenizeLine(line: string): CodeToken[] {
  const tokens: CodeToken[] = []
  let index = 0

  while (index < line.length) {
    const current = line[index]

    if (current === '#') {
      tokens.push({ text: line.slice(index), type: 'comment' })
      break
    }

    if (current === '"' || current === "'") {
      const quote = current
      let end = index + 1
      while (end < line.length) {
        if (line[end] === quote && line[end - 1] !== '\\') {
          end += 1
          break
        }
        end += 1
      }
      tokens.push({ text: line.slice(index, end), type: 'string' })
      index = end
      continue
    }

    const wordMatch = line.slice(index).match(/^[A-Za-z_][A-Za-z0-9_]*/)
    if (wordMatch) {
      const word = wordMatch[0]
      const type = keywords.has(word) ? 'keyword' : builtins.has(word) ? 'builtin' : 'text'
      tokens.push({ text: word, type })
      index += word.length
      continue
    }

    tokens.push({ text: current, type: 'text' })
    index += 1
  }

  return tokens
}

function renderHighlightedCode(code: string) {
  return code.split('\n').map((line, lineIndex) => (
    <span key={`line-${lineIndex}`}>
      {tokenizeLine(line).map((token, tokenIndex) => (
        <span key={`${lineIndex}-${tokenIndex}`} className={tokenClass(token.type)}>
          {token.text}
        </span>
      ))}
      {lineIndex < code.split('\n').length - 1 ? '\n' : null}
    </span>
  ))
}

export function CartaCodigoVolteable({ ejercicio }: CartaCodigoVolteableProps) {
  const [volteada, setVolteada] = useState(false)

  return (
    <div className="perspective-1000 h-full min-h-[520px] flex-grow">
      <div className={`relative h-full min-h-[520px] w-full transform-style-3d transition-transform duration-700 ${volteada ? 'rotate-y-180' : ''}`}>
        <section className="absolute flex h-full w-full flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-[#010409] shadow-[0_8px_30px_rgb(0,0,0,0.5)] backface-hidden">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 bg-surface-container-high px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-error" />
            <div className="h-3 w-3 rounded-full bg-tertiary" />
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="ml-4 text-label-sm font-label-sm font-code-md text-on-surface-variant">solution.py</span>
            <div className="flex-grow" />
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-surface-variant text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary"
              onClick={() => setVolteada(true)}
              aria-label="Ocultar codigo"
            >
              <span className="material-symbols-outlined text-sm">360</span>
            </button>
          </div>

          <div className="flex-grow overflow-auto p-md">
            <pre className="text-code-md font-code-md leading-relaxed">{renderHighlightedCode(ejercicio.solucion)}</pre>
          </div>
        </section>

        <section className="absolute flex h-full w-full rotate-y-180 flex-col items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-[#0a192f] to-[#0B1121] shadow-[0_0_40px_rgba(59,130,246,0.15)] backface-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent bg-[length:20px_20px] opacity-10" />
          <span
            className="material-symbols-outlined z-10 mb-4 text-6xl text-primary"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
          >
            lock
          </span>
          <h3 className="z-10 mb-2 text-headline-md font-headline-md text-primary">Código oculto</h3>
          <p className="z-10 max-w-xs text-center text-body-md font-body-md text-on-surface-variant">
            Completa los pasos para desbloquear la solución óptima.
          </p>
          <button
            type="button"
            className="z-10 mt-8 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary/50 text-primary transition-colors hover:bg-primary/10"
            onClick={() => setVolteada(false)}
            aria-label="Mostrar codigo"
          >
            <span className="material-symbols-outlined">undo</span>
          </button>
        </section>
      </div>
    </div>
  )
}
