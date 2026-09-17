import Card from "@/components/Card/Card";
import styles from "./Board.module.scss";
import type { CardData } from "@/@types/types";

interface Props {
  cards: CardData[];
  flipped: number[];
  matched: Set<number>;
  cols: number;
  hideMatched: boolean;
  numbered: boolean;
  disabled: boolean;
  onFlip: (id: number) => void;
}

const Board = ({
  cards,
  flipped,
  matched,
  cols,
  hideMatched,
  numbered,
  disabled,
  onFlip,
}: Props) => {
  return (
    <section
      className={styles.board}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      aria-label="Memory game board"
    >
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          <Card
            symbol={card.symbol}
            cardIndex={card.id}
            isFlipped={flipped.includes(card.id)}
            isMatched={matched.has(card.pairId)}
            hideMatched={hideMatched}
            numbered={numbered}
            disabled={disabled}
            onFlip={onFlip}
          />
        </div>
      ))}
    </section>
  );
};

export default Board;
