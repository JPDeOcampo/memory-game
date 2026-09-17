import { useCallback } from "react";
import type { DifficultyKey, GameMode, BestScore } from "@/@types/types";

const scoreKey = (diff: DifficultyKey, mode: GameMode) => {
  return `memory_best_${diff}_${mode}`;
};

export const useBestScore = () => {
  const getBest = useCallback(
    (diff: DifficultyKey, mode: GameMode): BestScore | null => {
      try {
        const raw = localStorage.getItem(scoreKey(diff, mode));
        return raw ? (JSON.parse(raw) as BestScore) : null;
      } catch {
        return null;
      }
    },
    [],
  );

  const trySetBest = useCallback(
    (diff: DifficultyKey, mode: GameMode, candidate: BestScore): boolean => {
      const current = (() => {
        try {
          const raw = localStorage.getItem(scoreKey(diff, mode));
          return raw ? (JSON.parse(raw) as BestScore) : null;
        } catch {
          return null;
        }
      })();
      if (
        !current ||
        candidate.moves < current.moves ||
        (candidate.moves === current.moves && candidate.time < current.time)
      ) {
        try {
          localStorage.setItem(scoreKey(diff, mode), JSON.stringify(candidate));
        } catch {}
        return true;
      }
      return false;
    },
    [],
  );

  return { getBest, trySetBest };
};
