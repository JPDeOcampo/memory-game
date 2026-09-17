import { useEffect, useRef } from "react";
import styles from "./WinModal.module.scss";
import type { DifficultyKey, GameMode, BestScore } from "@/@types/types";
import { DIFFICULTIES, GAME_MODES } from "@/constants/constants";
import { formatTime } from "@/utils/formatTime";
import Modal from "@/components/shared/Modal/Modal";

interface Props {
  won: boolean;
  difficulty: DifficultyKey;
  gameMode: GameMode;
  moves: number;
  timer: number;
  isNewBest: boolean;
  bestScore: BestScore | null;
  onRestart: () => void;
  onChangeDifficulty: () => void;
}

const WinModal = ({
  won,
  difficulty,
  gameMode,
  moves,
  timer,
  isNewBest,
  bestScore,
  onRestart,
  onChangeDifficulty,
}: Props) => {
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    primaryRef.current?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onRestart();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onRestart]);

  const diff = DIFFICULTIES[difficulty];
  const modeConfig = GAME_MODES[gameMode];

  return (
    <Modal
      className={`${styles.modal} ${!won ? styles.lose : ""}`}
      hasXButton={false}
    >
      <div className={styles.trophy}>{won ? "🏆" : "😔"}</div>
      <div id="result-headline" className={styles.headline}>
        {won ? "You did it!" : "Game Over"}
      </div>
      <div className={styles.sub}>
        {won
          ? `${diff.label} • ${modeConfig.label} — All pairs matched!`
          : gameMode === "beat-the-clock"
            ? "Time ran out before you matched all pairs."
            : "You ran out of moves!"}
      </div>

      {won && (
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>⏱ Time</span>
            <span className={styles.statValue}>{formatTime(timer)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>🔄 Moves</span>
            <span className={styles.statValue}>{moves}</span>
          </div>
          {bestScore && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>🥇 Best</span>
              <span className={styles.statValue}>{bestScore.moves}m</span>
            </div>
          )}
        </div>
      )}

      {isNewBest && won && (
        <div className={styles.bestBadge}>⭐ New Best Score!</div>
      )}

      <div className={styles.btnRow}>
        <button
          ref={primaryRef}
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={onRestart}
        >
          {won ? "↺ Play Again" : "↺ Try Again"}
        </button>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={onChangeDifficulty}
        >
          📋 Levels
        </button>
      </div>
    </Modal>
  );
};

export default WinModal;
