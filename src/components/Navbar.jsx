import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'პროგრესი', end: true },
  { to: '/courses', label: 'კურსები' },
  { to: '/achievements', label: 'მიღწევები' },
]

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav__in">
        <span className="brand">სწავლის პორტალი</span>
        <nav aria-label="მთავარი ნავიგაცია">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
