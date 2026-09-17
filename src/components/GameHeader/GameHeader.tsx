import styles from "./GameHeader.module.scss";
import type { DifficultyKey, GameMode } from "@/@types/types";
import type { Player, PlayerScores } from "@/@types/types";
import { DIFFICULTIES, GAME_MODES } from "@/constants/constants";
import {
  Bot,
  RotateCcw,
  Timer,
  Hourglass,
  RefreshCw,
  Check,
  Settings,
} from "lucide-react";
import { formatTime } from "@/utils/formatTime";

interface Props {
  difficulty: DifficultyKey;
  gameMode: GameMode;
  moves: number;
  timer: number;
  matched: number;
  totalPairs: number;
  hideTimer: boolean;
  hideMoves: boolean;
  onDifficultyOpen: () => void;
  onSettingsOpen: () => void;
  onModeChange: (m: GameMode) => void;
  onRestart: () => void;
  currentPlayer: Player;
  playerScores: PlayerScores;
}

const GameHeader = ({
  difficulty,
  gameMode,
  moves,
  timer,
  matched,
  totalPairs,
  hideTimer,
  hideMoves,
  onDifficultyOpen,
  onSettingsOpen,
  onModeChange,
  onRestart,
  currentPlayer,
  playerScores,
}: Props) => {
  const diff = DIFFICULTIES[difficulty];
  const DifficultyIcon = diff.icon;
  const progress = totalPairs > 0 ? (matched / totalPairs) * 100 : 0;

  const timerColor =
    gameMode === "beat-the-clock"
      ? timer <= 10
        ? "danger"
        : timer <= 30
          ? "warning"
          : ""
      : "";

  const movesLeft = diff.moveLimit - moves;
  const movesColor =
    gameMode === "limited-moves"
      ? movesLeft <= 3
        ? "danger"
        : movesLeft <= 6
          ? "warning"
          : ""
      : "";

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <h1 className={styles.title}>
          <span>Memory Game</span>
        </h1>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            className={styles.iconBtn}
            onClick={onSettingsOpen}
            aria-label="Open settings"
          >
            <Settings />
          </button>
        </div>
      </div>

      {/* Game mode tabs */}
      <nav className={styles.modes} aria-label="Game mode">
        {(
          Object.entries(GAME_MODES) as [
            GameMode,
            (typeof GAME_MODES)[GameMode],
          ][]
        ).map(([key, cfg]) => {
          const ModeIcon = cfg.icon;

          return (
            <button
              key={key}
              className={`${styles.modeBtn} ${gameMode === key ? styles.active : ""}`}
              style={{ "--mode-color": cfg.color } as React.CSSProperties}
              onClick={() => onModeChange(key)}
              aria-current={gameMode === key ? "true" : undefined}
            >
              <span className={styles.modeBtnIcon}>
                <ModeIcon />
              </span>
              {cfg.label}
            </button>
          );
        })}
      </nav>

      {/* Stats */}
      <div className={styles.controls}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>
            {gameMode === "beat-the-clock" ? (
              <>
                <Hourglass /> Time Left
              </>
            ) : (
              <>
                <Timer /> Time
              </>
            )}
          </span>
          <span
            className={`${styles.statValue} ${timerColor ? (styles as Record<string, string>)[timerColor] : ""}`}
          >
            {hideTimer ? "—" : formatTime(timer)}
          </span>
        </div>

        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statLabel}>
            {gameMode === "limited-moves" ? (
              <>
                <Bot /> Moves Left
              </>
            ) : (
              <>
                <RefreshCw /> Moves
              </>
            )}
          </span>
          <span
            className={`${styles.statValue} ${movesColor ? (styles as Record<string, string>)[movesColor] : ""}`}
          >
            {hideMoves
              ? "—"
              : gameMode === "limited-moves"
                ? `${movesLeft}`
                : moves}
          </span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statLabel}>
            <Check color="#4ade80" /> Pairs
          </span>
          <span className={styles.statValue}>
            {matched}/{totalPairs}
          </span>
        </div>
      </div>
      {gameMode === "two-player" && (
        <div className={styles.playerStatus} aria-live="polite">
          <span className={currentPlayer === 1 ? styles.activePlayer : ""}>
            Player 1: {playerScores[1]}{" "}
            {playerScores[1] === 1 ? "match" : "matches"}
          </span>
          <p className={styles.playerTurn}>Player {currentPlayer}'s turn</p>
          <span className={currentPlayer === 2 ? styles.activePlayer : ""}>
            Player 2: {playerScores[2]}{" "}
            {playerScores[2] === 1 ? "match" : "matches"}
          </span>
        </div>
      )}
      {/* Progress + action row */}
      <div className={styles.actionRow}>
        <button
          className={styles.diffBadge}
          onClick={onDifficultyOpen}
          aria-label="Change difficulty"
        >
          <DifficultyIcon color={diff.color} /> {diff.label}
        </button>
        <button
          className={styles.restartBtn}
          disabled={moves === 0 && timer === 0}
          onClick={onRestart}
          aria-label="Restart game"
        >
          <RotateCcw />
          Restart
        </button>
      </div>

      <div
        className={styles.progressBar}
        aria-label={`${matched} of ${totalPairs} pairs matched`}
      >
        <div
          className={styles.progressBarFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        {matched === totalPairs
          ? "You matched all pairs!"
          : `${matched} of ${totalPairs} pairs matched.`}
      </div>
    </header>
  );
};

export default GameHeader;
