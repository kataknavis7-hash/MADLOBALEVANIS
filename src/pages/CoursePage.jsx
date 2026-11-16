import { lazy, Suspense, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar.jsx'
import { useProgress } from '../context/ProgressContext.jsx'

// მოდალი იტვირთება მხოლოდ საჭიროების შემთხვევაში
const CertificateFlow = lazy(() => import('../components/CertificateFlow.jsx'))

export default function CoursePage() {
  const { courseId } = useParams()
  const { courseStats, toggleLesson, studentName } = useProgress()
  const [open, setOpen] = useState(false)
  const stat = courseStats.find((s) => s.course.id === courseId)

  if (!stat) return <p>კურსი ვერ მოიძებნა. <Link to="/courses">უკან</Link></p>
  const { course, percent, doneIds, finished } = stat

  return (
    <>
      <Link to="/courses">← ყველა კურსი</Link>
      <h1>{course.title}</h1>
      <ProgressBar value={percent} label={course.title} done={finished} />
      <ul className="lessons">
        {course.lessons.map((l) => (
          <li key={l.id}>
            <label>
              <input type="checkbox" checked={doneIds.includes(l.id)} onChange={() => toggleLesson(course.id, l.id)} />
              <span>{l.title}</span>
            </label>
          </li>
        ))}
      </ul>
      {finished && <button className="btn" onClick={() => setOpen(true)}>სერტიფიკატის მიღება</button>}
      {open && (
        <Suspense fallback={null}>
          <CertificateFlow open={open} onClose={() => setOpen(false)} name={studentName} course={course} />
        </Suspense>
      )}
    </>
  )
}
