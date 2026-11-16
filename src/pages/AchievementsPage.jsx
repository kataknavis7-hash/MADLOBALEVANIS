import { Link } from 'react-router-dom'
import AchievementBoard from '../components/AchievementBoard.jsx'
import { useProgress } from '../context/ProgressContext.jsx'

export default function AchievementsPage() {
  const { achievements, certificates } = useProgress()
  return (
    <>
      <h1>მიღწევები და სერტიფიკატები</h1>
      <AchievementBoard achievements={achievements} />
      <section className="panel" aria-labelledby="cert-title">
        <h2 id="cert-title">სერტიფიკატები</h2>
        {certificates.length === 0 ? (
          <p className="muted">ჯერ არცერთი კურსი არ გაქვს დასრულებული. <Link to="/courses">აირჩიე კურსი</Link></p>
        ) : (
          <ul className="list">
            {certificates.map(({ course }) => (
              <li key={course.id}><Link to={`/courses/${course.id}`}>{course.title}</Link></li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
