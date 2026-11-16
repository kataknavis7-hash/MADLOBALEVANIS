import { memo } from 'react'

function ProgressBar({ value, label, done = false }) {
  return (
    <div
      className={`bar ${done ? 'bar--done' : ''}`}
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span className="bar__fill" style={{ width: `${value}%` }} />
    </div>
  )
}
export default memo(ProgressBar)
