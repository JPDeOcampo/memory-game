import { useState, useEffect } from "react";
import type {
  DifficultyKey,
  GameMode,
  Settings,
  BestScore,
} from "@/@types/types";
import { useGame } from "@/hooks/useGame";
import { useBestScore } from "@/hooks/useBestScore";
import Board from "@/components/Board/Board";
import GameHeader from "@/components/GameHeader/GameHeader";
import DifficultyModal from "@/components/DifficultyModal/DifficultyModal";
import SettingsDrawer from "@/components/SettingsDrawer/SettingsDrawer";
import WinModal from "@/components/WinModal/WinModal";
import styles from "./App.module.scss";

const DEFAULT_SETTINGS: Settings = {
  hideMatched: false,
  hideTimer: false,
  hideMoves: false,
  numberedCards: false,
  sound: false,
};

export default function App() {
  const [difficulty, setDifficulty] = useState<DifficultyKey>("classic");
  const [gameMode, setGameMode] = useState<GameMode>("classic");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [showDiffModal, setShowDiffModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { getBest, trySetBest } = useBestScore();
  const [bestScore, setBestScore] = useState<BestScore | null>(() =>
    getBest(difficulty, gameMode),
  );
  const [isNewBest, setIsNewBest] = useState(false);

  const {
    cards,
    flipped,
    matched,
    moves,
    timer,
    gameWon,
    gameLost,
    flipCard,
    reset,
    totalPairs,
    diff,
    isChecking,
  } = useGame(difficulty, gameMode, settings);

  // Update best score on win
  useEffect(() => {
    if (gameWon) {
      const candidate = { moves, time: timer };
      const isNew = trySetBest(difficulty, gameMode, candidate);
      setIsNewBest(isNew);
      setBestScore(getBest(difficulty, gameMode));
    }
  }, [gameWon]); // eslint-disable-line

  // Refresh best score when difficulty or mode changes
  useEffect(() => {
    setBestScore(getBest(difficulty, gameMode));
    setIsNewBest(false);
  }, [difficulty, gameMode, getBest]);

  const handleDiffSelect = (d: DifficultyKey) => {
    setDifficulty(d);
    setShowDiffModal(false);
  };

  const handleModeChange = (m: GameMode) => {
    setGameMode(m);
  };

  const showResult = gameWon || gameLost;

  return (
    <div className={styles.app}>
      <div className={styles.gameArea}>
        <GameHeader
          difficulty={difficulty}
          gameMode={gameMode}
          moves={moves}
          timer={timer}
          matched={matched.size}
          totalPairs={totalPairs}
          hideTimer={settings.hideTimer}
          hideMoves={settings.hideMoves}
          onDifficultyOpen={() => setShowDiffModal(true)}
          onSettingsOpen={() => setShowSettings(true)}
          onModeChange={handleModeChange}
          onRestart={reset}
        />

        <Board
          cards={cards}
          flipped={flipped}
          matched={matched}
          cols={diff.cols}
          hideMatched={settings.hideMatched}
          numbered={settings.numberedCards}
          disabled={isChecking || showResult}
          onFlip={flipCard}
        />
      </div>

      {showDiffModal && (
        <DifficultyModal
          current={difficulty}
          onSelect={handleDiffSelect}
          onClose={() => setShowDiffModal(false)}
        />
      )}

      {showSettings && (
        <SettingsDrawer
          settings={settings}
          onChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showResult && (
        <WinModal
          won={gameWon}
          difficulty={difficulty}
          gameMode={gameMode}
          moves={moves}
          timer={timer}
          isNewBest={isNewBest}
          bestScore={bestScore}
          onRestart={() => {
            reset();
          }}
          onChangeDifficulty={() => {
            reset();
            setShowDiffModal(true);
          }}
        />
      )}
    </div>
  );
}
