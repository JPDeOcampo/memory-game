import styles from "./GameHeader.module.scss";

export default function GameHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <h1 className={styles.title}>
          <span>Memory Game Concentration</span>
        </h1>

        <button className={styles.iconBtn} aria-label="Open settings">
          ⚙️
        </button>
      </div>

      <nav className={styles.modes} aria-label="Game mode">
        <button className={`${styles.modeBtn} ${styles.active}`}>
          <span className={styles.modeBtnIcon}>🎮</span>
          Classic
        </button>

        <button className={styles.modeBtn}>
          <span className={styles.modeBtnIcon}>⏱️</span>
          Beat the Clock
        </button>

        <button className={styles.modeBtn}>
          <span className={styles.modeBtnIcon}>🎯</span>
          Limited Moves
        </button>
      </nav>

      <div className={styles.controls}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>⏱ Time</span>
          <span className={styles.statValue}>00:00</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.stat}>
          <span className={styles.statLabel}>🔄 Moves</span>
          <span className={styles.statValue}>0</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.stat}>
          <span className={styles.statLabel}>✅ Pairs</span>
          <span className={styles.statValue}>0/8</span>
        </div>
      </div>

      <div className={styles.actionRow}>
        <button className={styles.diffBadge}>🟢 Classic</button>

        <button className={styles.restartBtn}>↺ Restart</button>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressBarFill} style={{ width: "0%" }} />
      </div>
    </header>
  );
}
