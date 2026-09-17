import { SYMBOLS } from "@/constants/constants";

export type DifficultyKey =
  | "beginner"
  | "easy"
  | "classic"
  | "medium"
  | "hard"
  | "expert"
  | "master";
export type GameMode = "classic" | "limited-moves" | "beat-the-clock";

export interface CardData {
  id: number;
  symbol: SymbolKey;
  pairId: number;
}

export interface Settings {
  hideMatched: boolean;
  hideTimer: boolean;
  hideMoves: boolean;
  numberedCards: boolean;
  sound: boolean;
}

export interface BestScore {
  moves: number;
  time: number;
}

export type SymbolKey = (typeof SYMBOLS)[number];
