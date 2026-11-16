import { forwardRef } from 'react'

/** სერტიფიკატი SVG-ად (მარტივად გადაიყვანება PNG-ში). */
const Certificate = forwardRef(function Certificate({ name, course, date }, ref) {
  return (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" role="img"
      aria-label={`სერტიფიკატი: ${name}, ${course}`} className="cert">
      <rect width="800" height="560" fill="#ffffff" />
      <rect x="20" y="20" width="760" height="520" fill="none" stroke="#16213e" strokeWidth="6" />
      <rect x="34" y="34" width="732" height="492" fill="none" stroke="#f2a900" strokeWidth="2" />
      <g fontFamily="'Noto Serif Georgian', Georgia, serif" textAnchor="middle" fill="#16213e">
        <text x="400" y="120" fontSize="40" fontWeight="800">სერტიფიკატი</text>
        <text x="400" y="180" fontSize="18" fontFamily="'Noto Sans Georgian', Arial, sans-serif">ადასტურებს, რომ</text>
        <text x="400" y="260" fontSize="46" fontWeight="800" fill="#0f766e">{name}</text>
        <text x="400" y="320" fontSize="18" fontFamily="'Noto Sans Georgian', Arial, sans-serif">წარმატებით დაასრულა კურსი</text>
        <text x="400" y="375" fontSize="28" fontWeight="600">{course}</text>
        <text x="400" y="470" fontSize="16" fontFamily="'Noto Sans Georgian', Arial, sans-serif">გაცემის თარიღი: {date}</text>
      </g>
    </svg>
  )
})
export default Certificate
