import styles from "./Card.module.scss";

interface Props {
  symbol: string;
  cardIndex: number;
}

const Card = ({ symbol, cardIndex }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={`${styles.face} ${styles.back}`} />

        <div className={`${styles.face} ${styles.front}`}>
          <span className={styles.emoji}>{symbol}</span>
          <span className={styles.number}>#{cardIndex + 1}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
