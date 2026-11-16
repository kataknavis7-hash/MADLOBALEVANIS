import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar.jsx'

export default function CourseCard({ stat }) {
  const { course, percent, done, total, finished } = stat
  return (
    <article className="card">
      <p className="muted">{course.level} · {course.hours} საათი</p>
      <h3>{course.title}</h3>
      <ProgressBar value={percent} label={course.title} done={finished} />
      <div className="row">
        <span className="muted">{done}/{total} გაკვეთილი</span>
        <Link className="btn btn--ghost" to={`/courses/${course.id}`}>
          {done === 0 ? 'დაწყება' : finished ? 'გადახედვა' : 'გაგრძელება'}
        </Link>
      </div>
    </article>
  )
}
