import ProgressDashboard from '../components/ProgressDashboard.jsx'
import { useProgress } from '../context/ProgressContext.jsx'

export default function DashboardPage() {
  const { studentName, setName, summary, courseStats } = useProgress()
  return (
    <>
      <h1>{studentName ? `გამარჯობა, ${studentName}` : 'თქვენი სწავლის პროგრესი'}</h1>
      <label className="field">
        სახელი და გვარი (გამოჩნდება სერტიფიკატზე)
        <input value={studentName} onChange={(e) => setName(e.target.value)} placeholder="მაგ. ნინო გელაშვილი" autoComplete="name" />
      </label>
      <ProgressDashboard summary={summary} courseStats={courseStats} />
    </>
  )
}
