/** მიღწევების დაფა */
export default function AchievementBoard({ achievements }) {
  const unlocked = achievements.filter((a) => a.unlocked).length
  return (
    <section aria-labelledby="ab-title" className="panel">
      <h2 id="ab-title">მიღწევები <span className="muted">({unlocked}/{achievements.length})</span></h2>
      <ul className="badges">
        {achievements.map((a) => (
          <li key={a.id} className={`badge ${a.unlocked ? 'badge--on' : ''}`}>
            <span className="badge__icon" aria-hidden="true">{a.unlocked ? '★' : '☆'}</span>
            <div>
              <strong>{a.title}</strong>
              <p className="muted">{a.unlocked ? 'მიღწეულია' : a.hint}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
