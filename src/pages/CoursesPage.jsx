import CourseCard from '../components/CourseCard.jsx'
import { useProgress } from '../context/ProgressContext.jsx'

export default function CoursesPage() {
  const { courseStats } = useProgress()
  return (
    <>
      <h1>კურსები</h1>
      <div className="grid">
        {courseStats.map((s) => <CourseCard key={s.course.id} stat={s} />)}
      </div>
    </>
  )
}
