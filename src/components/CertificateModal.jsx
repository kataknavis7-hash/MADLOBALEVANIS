import { useEffect, useRef } from 'react'

/**
 * მოდალი: შიგთავსი (სერტიფიკატი, ღილაკები) მოდის children-ით.
 * იყენებს native <dialog>-ს: focus trap, Esc და a11y ჩაშენებულია.
 */
export default function CertificateModal({ open, onClose, title, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (open && !dlg.open) dlg.showModal()
    if (!open && dlg.open) dlg.close()
  }, [open])

  return (
    <dialog ref={ref} className="modal" aria-labelledby="cm-title" onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}>
      <div className="modal__head">
        <h2 id="cm-title">{title}</h2>
        <button className="btn btn--ghost" onClick={onClose} aria-label="დახურვა">✕</button>
      </div>
      {children}
    </dialog>
  )
}
