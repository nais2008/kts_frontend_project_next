import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import cn from "classnames"
import { X } from "lucide-react"

import styles from "./Modal.module.scss"

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  children,
  className,
}) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof document === "undefined") {
      return
    }

    const tempContainer = document.createElement("div")

    document.body.appendChild(tempContainer)

    setContainer(tempContainer)

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      if (document.body.contains(tempContainer)) {
        document.body.removeChild(tempContainer)
      }
    }
  }, [onClose])

  if (!container) {
    return null
  }

  return ReactDOM.createPortal(
    <div className={styles.modal__overlay} onClick={onClose}>
      <div
        className={cn(styles.modal__content, className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>{title}</h2>
          <button className={styles.modal__closeButton} onClick={onClose}>
            <X />
          </button>
        </div>
        <div className={styles.modal__body}>{children}</div>
      </div>
    </div>,
    container
  )
}

export default Modal
