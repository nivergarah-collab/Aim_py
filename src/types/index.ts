export type Paso = {
  id: string
  texto: string
}

export type Bloque = {
  id: string
  etiqueta: string
  lineas: string
  paso_asociado?: string
}

export type Ejercicio = {
  id: string
  nombre: string
  premisa: string
  solucion: string
  pasos: Paso[]
  bloques: Bloque[]
  etiquetas: string[]
}

export type ExercisesContextType = {
  ejercicios: Ejercicio[]
  loading: boolean
  etiquetasDisponibles: string[]
  etiquetasSeleccionadas: string[]
  ejerciciosFiltrados: Ejercicio[]
  setEtiquetasSeleccionadas: (tags: string[]) => void
  getEjercicioById: (id: string) => Ejercicio | undefined
  getRandomEjercicioId: () => string | undefined
}
