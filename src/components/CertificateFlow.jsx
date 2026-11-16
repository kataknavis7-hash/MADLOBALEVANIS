import { useRef } from 'react'
import CertificateModal from './CertificateModal.jsx'
import Certificate from './Certificate.jsx'

/** სერტიფიკატის გენერაცია: SVG → Canvas → PNG ჩამოტვირთვა. */
export default function CertificateFlow({ open, onClose, name, course }) {
  const svgRef = useRef(null)
  const date = new Date().toLocaleDateString('ka-GE')

  const download = () => {
    const svg = new XMLSerializer().serializeToString(svgRef.current)
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1600
      canvas.height = 1120
      canvas.getContext('2d').drawImage(img, 0, 0, 1600, 1120)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `certificate-${course.id}.png`
        a.click()
      })
    }
    img.src = url
  }

  return (
    <CertificateModal open={open} onClose={onClose} title="თქვენი სერტიფიკატი">
      <Certificate ref={svgRef} name={name || 'სტუდენტი'} course={course.title} date={date} />
      <div className="row modal__actions">
        <button className="btn" onClick={download}>ჩამოტვირთვა (PNG)</button>
        <button className="btn btn--ghost" onClick={() => window.print()}>ბეჭდვა</button>
      </div>
    </CertificateModal>
  )
}
