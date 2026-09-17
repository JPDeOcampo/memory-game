import type { LucideIcon } from "lucide-react";
import {
  Crown,
  Diamond,
  Flame,
  Gamepad2,
  Goal,
  Rocket,
  Sparkles,
  Target,
  Timer,
  Users,
  Zap,
  Bird,
  Bug,
  Cat,
  Circle,
  Cloud,
  Clover,
  Fish,
  Flower2,
  Gem,
  Heart,
  Leaf,
  Moon,
  PawPrint,
  Rabbit,
  Shell,
  Snowflake,
  Star,
  Sun,
  TreePine,
  Trophy,
  Turtle,
  Waves,
} from "lucide-react";

import type { DifficultyKey, GameMode } from "@/@types/types";

import type { SymbolKey } from "@/@types/types";

export const SYMBOLS = [
  "cat",
  "paw",
  "bird",
  "rabbit",
  "bug",
  "fish",
  "turtle",
  "shell",
  "flower",
  "clover",
  "leaf",
  "tree",
  "star",
  "sparkles",
  "gem",
  "heart",
  "sun",
  "moon",
  "cloud",
  "snowflake",
  "waves",
  "zap",
  "trophy",
  "circle",
] as const;

export const SYMBOL_ICONS: Record<SymbolKey, LucideIcon> = {
  cat: Cat,
  paw: PawPrint,
  bird: Bird,
  rabbit: Rabbit,
  bug: Bug,
  fish: Fish,
  turtle: Turtle,
  shell: Shell,
  flower: Flower2,
  clover: Clover,
  leaf: Leaf,
  tree: TreePine,
  star: Star,
  sparkles: Sparkles,
  gem: Gem,
  heart: Heart,
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  snowflake: Snowflake,
  waves: Waves,
  zap: Zap,
  trophy: Trophy,
  circle: Circle,
};

export interface DifficultyConfig {
  label: string;
  icon: LucideIcon;
  color: string;
  cols: number;
  rows: number;
  timeLimit: number;
  moveLimit: number;
  description: string;
}

export const DIFFICULTIES: Record<DifficultyKey, DifficultyConfig> = {
  beginner: {
    label: "Beginner",
    icon: Sparkles,
    color: "#22C55E",
    cols: 3,
    rows: 2,
    timeLimit: 60,
    moveLimit: 8,
    description: "3×2 Grid",
  },

  easy: {
    label: "Easy",
    icon: Target,
    color: "#84CC16",
    cols: 4,
    rows: 3,
    timeLimit: 90,
    moveLimit: 14,
    description: "4×3 Grid",
  },

  classic: {
    label: "Classic",
    icon: Zap,
    color: "#EAB308",
    cols: 4,
    rows: 4,
    timeLimit: 120,
    moveLimit: 20,
    description: "4×4 Grid",
  },

  medium: {
    label: "Medium",
    icon: Flame,
    color: "#F97316",
    cols: 5,
    rows: 4,
    timeLimit: 160,
    moveLimit: 26,
    description: "5×4 Grid",
  },

  hard: {
    label: "Hard",
    icon: Diamond,
    color: "#EF4444",
    cols: 6,
    rows: 5,
    timeLimit: 210,
    moveLimit: 34,
    description: "6×5 Grid",
  },

  expert: {
    label: "Expert",
    icon: Rocket,
    color: "#A855F7",
    cols: 8,
    rows: 5,
    timeLimit: 280,
    moveLimit: 44,
    description: "8×5 Grid",
  },

  master: {
    label: "Master",
    icon: Crown,
    color: "#EC4899",
    cols: 8,
    rows: 6,
    timeLimit: 360,
    moveLimit: 52,
    description: "8×6 Grid",
  },
};

export interface GameModeConfig {
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const GAME_MODES: Record<GameMode, GameModeConfig> = {
  classic: {
    label: "Classic",
    description: "Match all pairs with no constraints.",
    icon: Gamepad2,
    color: "#0a66c2",
  },

  "limited-moves": {
    label: "Limited Moves",
    description: "Match all pairs within a move limit.",
    icon: Goal,
    color: "#f59e0b",
  },

  "beat-the-clock": {
    label: "Beat the Clock",
    description: "Match all pairs before time runs out.",
    icon: Timer,
    color: "#ef4444",
  },

  "two-player": {
    label: "2 Player",
    description: "Take turns finding pairs. Match again to keep your turn.",
    icon: Users,
    color: "#8b5cf6",
  },
};
