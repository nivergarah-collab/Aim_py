import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Ejercicio, ExercisesContextType } from '../types'
import { ExercisesContext } from './exercisesContextValue'

const STORAGE_KEY = 'aimpy_tags'

function readStoredTags() {
  try {
    const rawTags = window.localStorage.getItem(STORAGE_KEY)
    return rawTags ? (JSON.parse(rawTags) as string[]) : null
  } catch {
    return null
  }
}

function writeStoredTags(tags: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tags))
}

export function ExercisesProvider({ children }: { children: React.ReactNode }) {
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([])
  const [loading, setLoading] = useState(true)
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadasState] = useState<string[]>([])

  const etiquetasDisponibles = useMemo(
    () => Array.from(new Set(ejercicios.flatMap((ejercicio) => ejercicio.etiquetas))).sort(),
    [ejercicios],
  )

  const ejerciciosFiltrados = useMemo(() => {
    if (etiquetasSeleccionadas.length === 0) {
      return []
    }

    const selectedTags = new Set(etiquetasSeleccionadas)
    return ejercicios.filter((ejercicio) => ejercicio.etiquetas.some((tag) => selectedTags.has(tag)))
  }, [ejercicios, etiquetasSeleccionadas])

  useEffect(() => {
    let active = true

    async function loadExercises() {
      try {
        const response = await fetch('/data/exercises.json')
        if (!response.ok) {
          throw new Error(`No se pudo cargar exercises.json (${response.status})`)
        }

        const data = (await response.json()) as Ejercicio[]
        if (!active) {
          return
        }

        const availableTags = Array.from(new Set(data.flatMap((ejercicio) => ejercicio.etiquetas))).sort()
        const storedTags = readStoredTags()

        setEjercicios(data)
        setEtiquetasSeleccionadasState(storedTags ?? availableTags)

        if (!storedTags) {
          writeStoredTags(availableTags)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadExercises()

    return () => {
      active = false
    }
  }, [])

  const setEtiquetasSeleccionadas = useCallback((tags: string[]) => {
    setEtiquetasSeleccionadasState(tags)
    writeStoredTags(tags)
  }, [])

  const getEjercicioById = useCallback(
    (id: string) => ejercicios.find((ejercicio) => ejercicio.id === id),
    [ejercicios],
  )

  const getRandomEjercicioId = useCallback(() => {
    const source = ejerciciosFiltrados.length > 0 ? ejerciciosFiltrados : ejercicios
    if (source.length === 0) {
      return undefined
    }

    const index = Math.floor(Math.random() * source.length)
    return source[index]?.id
  }, [ejercicios, ejerciciosFiltrados])

  const value = useMemo<ExercisesContextType>(
    () => ({
      ejercicios,
      loading,
      etiquetasDisponibles,
      etiquetasSeleccionadas,
      ejerciciosFiltrados,
      setEtiquetasSeleccionadas,
      getEjercicioById,
      getRandomEjercicioId,
    }),
    [
      ejercicios,
      loading,
      etiquetasDisponibles,
      etiquetasSeleccionadas,
      ejerciciosFiltrados,
      setEtiquetasSeleccionadas,
      getEjercicioById,
      getRandomEjercicioId,
    ],
  )

  return <ExercisesContext.Provider value={value}>{children}</ExercisesContext.Provider>
}
