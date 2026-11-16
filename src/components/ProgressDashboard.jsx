import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar.jsx'

/** პროგრეს-დაფა: საერთო მაჩვენებელი + თითო კურსის პროგრეს-ბარი. */
export default function ProgressDashboard({ summary, courseStats }) {
  return (
    <section aria-labelledby="pd-title" className="panel">
      <h2 id="pd-title">საერთო პროგრესი</h2>
      <p className="big">{summary.percent}%</p>
      <p className="muted">
        დასრულებულია {summary.totalDone} გაკვეთილი {summary.total}-დან · {summary.completedCourses} კურსი
      </p>
      <ProgressBar value={summary.percent} label="საერთო პროგრესი" done={summary.percent === 100} />

      <ul className="list">
        {courseStats.map(({ course, percent, done, total, finished }) => (
          <li key={course.id}>
            <div className="row">
              <Link to={`/courses/${course.id}`}>{course.title}</Link>
              <span className="muted">{done}/{total}</span>
            </div>
            <ProgressBar value={percent} label={course.title} done={finished} />
          </li>
        ))}
      </ul>
    </section>
  )
}
