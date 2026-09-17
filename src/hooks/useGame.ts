import { useState, useEffect, useCallback, useRef } from "react";
import type {
  CardData,
  DifficultyKey,
  GameMode,
  Player,
  PlayerScores,
  Settings,
} from "@/@types/types";
import { DIFFICULTIES, SYMBOLS } from "@/constants/constants";
import type { SymbolKey } from "@/@types/types";

const createDeck = (diffKey: DifficultyKey): CardData[] => {
  const { cols, rows } = DIFFICULTIES[diffKey];
  const numPairs = (cols * rows) / 2;
  const symbols = SYMBOLS.slice(0, numPairs);
  const deck: CardData[] = [];
  symbols.forEach((symbol, pairId) => {
    deck.push({ id: 0, symbol: symbol as unknown as SymbolKey, pairId });
    deck.push({ id: 0, symbol: symbol as unknown as SymbolKey, pairId });
  });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.map((c, i) => ({ ...c, id: i }));
};

export const useGame = (
  diffKey: DifficultyKey,
  mode: GameMode,
  _settings: Settings,
) => {
  const diff = DIFFICULTIES[diffKey];
  const totalPairs = (diff.cols * diff.rows) / 2;

  const [cards, setCards] = useState<CardData[]>(() => createDeck(diffKey));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(() =>
    mode === "beat-the-clock" ? diff.timeLimit : 0,
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [playerScores, setPlayerScores] = useState<PlayerScores>({
    1: 0,
    2: 0,
  });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const matchedRef = useRef(matched);
  matchedRef.current = matched;

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stopTimer();
    setCards(createDeck(diffKey));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setTimer(mode === "beat-the-clock" ? DIFFICULTIES[diffKey].timeLimit : 0);
    setGameStarted(false);
    setGameWon(false);
    setGameLost(false);
    setIsChecking(false);
    setCurrentPlayer(1);
    setPlayerScores({ 1: 0, 2: 0 });
  }, [diffKey, mode, stopTimer]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!gameStarted || gameWon || gameLost) {
      stopTimer();
      return;
    }
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (mode === "beat-the-clock") {
          if (t <= 1) {
            stopTimer();
            setGameLost(true);
            return 0;
          }
          return t - 1;
        }
        return t + 1;
      });
    }, 1000);
    return stopTimer;
  }, [gameStarted, gameWon, gameLost, mode, stopTimer]);

  const flipCard = useCallback(
    (cardId: number) => {
      if (isChecking || gameWon || gameLost) return;
      if (flipped.includes(cardId)) return;
      const card = cards[cardId];
      if (matchedRef.current.has(card.pairId)) return;

      const newFlipped = [...flipped, cardId];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        const [aId, bId] = newFlipped;
        const nextMoves = moves + 1;
        setMoves(nextMoves);
        setIsChecking(true);

        if (!gameStarted) setGameStarted(true);

        if (cards[aId].symbol === cards[bId].symbol) {
          setTimeout(() => {
            setPlayerScores((prev) => ({
              ...prev,
              [currentPlayer]: prev[currentPlayer] + 1,
            }));
            setMatched((prev) => {
              const next = new Set(prev);
              next.add(cards[aId].pairId);
              if (next.size === totalPairs) {
                stopTimer();
                setGameWon(true);
              }
              return next;
            });
            setFlipped([]);
            setIsChecking(false);
          }, 500);
        } else {
          setTimeout(() => {
            setFlipped([]);
            setIsChecking(false);
            if (mode === "two-player") {
              setCurrentPlayer((player) => (player === 1 ? 2 : 1));
            }
            if (mode === "limited-moves" && nextMoves >= diff.moveLimit) {
              stopTimer();
              setGameLost(true);
            }
          }, 900);
        }
      }
    },
    [
      isChecking,
      gameWon,
      gameLost,
      flipped,
      cards,
      gameStarted,
      moves,
      mode,
      diff.moveLimit,
      totalPairs,
      stopTimer,
      currentPlayer,
    ],
  );

  return {
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
    gameStarted,
    isChecking,
    currentPlayer,
    playerScores,
  };
};
