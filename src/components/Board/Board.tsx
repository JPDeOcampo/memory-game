import Card from "../Card/Card";
import styles from "./Board.module.scss";

const cards = ["🍎", "🍌", "🍊", "🍇", "🍓", "🥝", "🍉", "🍍"];

const Board = () => {
  return (
    <section className={styles.board} aria-label="Memory game board">
      {cards.map((symbol, index) => (
        <div key={index} className={styles.card}>
          <Card symbol={symbol} cardIndex={index} />
        </div>
      ))}
    </section>
  );
};

export default Board;
