import { useCallback, useEffect, useMemo, useState } from 'react'
import { achievementDefs } from '../data/courses'

const KEY = 'edu-portal:progress:v1'
const empty = { name: '', completed: {} }

const load = () => {
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return empty
  }
}

/**
 * Custom Hook: სტუდენტის პროგრესის მართვა და ანალიტიკა.
 * @param {Array} courses კურსების სია
 */
export function useStudentProgress(courses) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage მიუწვდომელია */
    }
  }, [state])

  const toggleLesson = useCallback((courseId, lessonId) => {
    setState((prev) => {
      const list = prev.completed[courseId] || []
      const next = list.includes(lessonId) ? list.filter((l) => l !== lessonId) : [...list, lessonId]
      return { ...prev, completed: { ...prev.completed, [courseId]: next } }
    })
  }, [])

  const setName = useCallback((name) => setState((p) => ({ ...p, name })), [])
  const reset = useCallback(() => setState(empty), [])

  const courseStats = useMemo(
    () =>
      courses.map((course) => {
        const doneIds = (state.completed[course.id] || []).filter((id) => course.lessons.some((l) => l.id === id))
        const percent = Math.round((doneIds.length / course.lessons.length) * 100)
        return { course, doneIds, done: doneIds.length, total: course.lessons.length, percent, finished: percent === 100 }
      }),
    [courses, state.completed],
  )

  const summary = useMemo(() => {
    const totalDone = courseStats.reduce((a, c) => a + c.done, 0)
    const total = courseStats.reduce((a, c) => a + c.total, 0)
    return {
      totalDone,
      total,
      percent: total ? Math.round((totalDone / total) * 100) : 0,
      completedCourses: courseStats.filter((c) => c.finished).length,
      courseCount: courses.length,
    }
  }, [courseStats, courses.length])

  const achievements = useMemo(
    () => achievementDefs.map((a) => ({ ...a, unlocked: a.test(summary) })),
    [summary],
  )

  return {
    studentName: state.name,
    setName,
    courseStats,
    summary,
    achievements,
    certificates: courseStats.filter((c) => c.finished),
    toggleLesson,
    reset,
  }
}
