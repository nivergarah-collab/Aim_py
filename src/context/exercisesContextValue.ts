import { createContext } from 'react'
import type { ExercisesContextType } from '../types'

export const ExercisesContext = createContext<ExercisesContextType | undefined>(undefined)
