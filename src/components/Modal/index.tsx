import {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import styles from "./modal.module.scss";
import {ModalProps} from "./types";

const Modal = ({isOpen, onClose, children, ariaLabel}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}>
      <div
        ref={modalRef}
        className={styles.modalContent}
        tabIndex={-1}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal">
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
