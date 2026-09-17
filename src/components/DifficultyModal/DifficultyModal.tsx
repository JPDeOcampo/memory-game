import { useEffect, useRef } from "react";
import styles from "./DifficultyModal.module.scss";
import type { DifficultyKey } from "@/@types/types";
import { DIFFICULTIES } from "@/constants/constants";
import Modal from "@/components/shared/Modal/Modal";

interface Props {
  current: DifficultyKey;
  onSelect: (d: DifficultyKey) => void;
  onClose: () => void;
}

const DIFF_KEYS = Object.keys(DIFFICULTIES) as DifficultyKey[];

const DifficultyModal = ({ current, onSelect, onClose }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  return (
    <Modal
      title={{
        icon: null,
        label: "Select Board Size",
        subLabel: "Choose your challenge level",
      }}
      onClose={onClose}
    >
      <div className={styles.grid}>
        {DIFF_KEYS.map((key) => {
          const d = DIFFICULTIES[key];
          const Icon = d.icon;
          return (
            <button
              key={key}
              className={`${styles.card} ${current === key ? styles.selected : ""}`}
              onClick={() => {
                onSelect(key);
                onClose();
              }}
              aria-current={current === key ? "true" : undefined}
            >
              <span className={styles.cardEmoji}>
                <Icon aria-hidden="true" color={d.color} />
              </span>
              <span className={styles.cardLabel}>{d.label}</span>
              <span className={styles.cardDesc}>{d.description}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.tip}>
        <span>💡</span>
        <span>Larger grids offer more challenge and longer gameplay!</span>
      </div>
    </Modal>
  );
};

export default DifficultyModal;
