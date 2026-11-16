import { createContext, useContext } from 'react'
import { courses } from '../data/courses'
import { useStudentProgress } from '../hooks/useStudentProgress'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const value = useStudentProgress(courses)
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
