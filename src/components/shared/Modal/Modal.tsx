import { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";
import { X } from "lucide-react";

const Modal = ({
  children,
  className = styles.modal,
  title,
  hasXButton = true,
  onClose,
}: {
  children: React.ReactNode;
  className?: string;
  title?: {
    icon?: React.ReactNode;
    label: string;
    subLabel: string;
  };
  hasXButton?: boolean;
  onClose?: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!onClose) return;
    closeRef.current?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-overlay"
    >
      <div className={className}>
        {(hasXButton || title) && (
          <div className={styles.titleRow}>
            {title && (
              <div>
                <h2 id="settings-title" className={styles.title}>
                  {title.icon} {title.label}
                </h2>
                <div className={styles.subtitle}>{title.subLabel}</div>
              </div>
            )}
            {hasXButton && (
              <button
                ref={closeRef}
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close settings"
              >
                <X />
              </button>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
