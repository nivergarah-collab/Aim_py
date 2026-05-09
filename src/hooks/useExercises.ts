import { useContext } from 'react'
import { ExercisesContext } from '../context/exercisesContextValue'

export function useExercises() {
  const context = useContext(ExercisesContext)

  if (!context) {
    throw new Error('useExercises debe usarse dentro de ExercisesProvider')
  }

  return context
}
