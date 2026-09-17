import { useRef, useEffect, useState } from "react";
import { SYMBOL_ICONS } from "@/constants/constants";
import styles from "./Card.module.scss";
import { Astroid } from "lucide-react";

interface Props {
  symbol: keyof typeof SYMBOL_ICONS;
  cardIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
  hideMatched: boolean;
  numbered: boolean;
  classroomLabel?: string;
  disabled: boolean;
  onFlip: (id: number) => void;
}

const SYMBOL_COLORS: Record<keyof typeof SYMBOL_ICONS, string> = {
  cat: "#f97316",
  paw: "#a855f7",
  bird: "#3b82f6",
  rabbit: "#ec4899",
  bug: "#22c55e",
  fish: "#06b6d4",
  turtle: "#16a34a",
  shell: "#f59e0b",
  flower: "#e11d48",
  clover: "#10b981",
  leaf: "#65a30d",
  tree: "#15803d",
  star: "#eab308",
  sparkles: "#8b5cf6",
  gem: "#06b6d4",
  heart: "#ef4444",
  sun: "#f97316",
  moon: "#6366f1",
  cloud: "#64748b",
  snowflake: "#0ea5e9",
  waves: "#0284c7",
  zap: "#facc15",
  trophy: "#d97706",
  circle: "#14b8a6",
};

const Card = ({
  symbol,
  cardIndex,
  isFlipped,
  isMatched,
  hideMatched,
  numbered,
  classroomLabel,
  disabled,
  onFlip,
}: Props) => {
  const faceUp = isFlipped || isMatched;

  const [justMatched, setJustMatched] = useState(false);
  const prevMatched = useRef(isMatched);

  const Icon = SYMBOL_ICONS[symbol];

  const iconColor = SYMBOL_COLORS[symbol];

  useEffect(() => {
    if (!prevMatched.current && isMatched) {
      setJustMatched(true);

      const t = setTimeout(() => {
        setJustMatched(false);
      }, 350);

      prevMatched.current = true;

      return () => clearTimeout(t);
    }

    prevMatched.current = isMatched;
  }, [isMatched]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      if (!disabled && !faceUp) {
        onFlip(cardIndex);
      }
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}
      role="button"
      tabIndex={disabled || (faceUp && !isFlipped) ? -1 : 0}
      aria-pressed={faceUp}
      aria-label={
        isMatched
          ? `Matched: ${symbol}`
          : isFlipped
            ? `Card showing ${symbol}`
            : classroomLabel
              ? `Face-down card at ${classroomLabel}`
              : "Face-down card"
      }
      onClick={() => {
        if (!disabled && !faceUp) {
          onFlip(cardIndex);
        }
      }}
      onKeyDown={handleKey}
    >
      <div
        className={`${styles.inner} ${
          faceUp ? styles.flipped : ""
        } ${justMatched ? styles.matchAnim : ""}`}
      >
        <div className={`${styles.face} ${styles.back}`} aria-hidden="true">
          {numbered && <span>{cardIndex + 1}</span>}

          {classroomLabel && (
            <span className={styles.classroomLabel}>{classroomLabel}</span>
          )}

          {!numbered && !classroomLabel && (
            <Astroid fill="#fff" stroke="#fff" />
          )}
        </div>

        <div
          className={`${styles.face} ${styles.front} ${
            isMatched ? styles.matched : ""
          } ${isMatched && hideMatched ? styles.hidden : ""}`}
        >
          <Icon
            className={styles.icon}
            style={{ color: iconColor }}
            aria-hidden="true"
            strokeWidth={2}
          />

          {numbered && <span className={styles.number}>#{cardIndex + 1}</span>}
        </div>
      </div>
    </div>
  );
};

export default Card;
