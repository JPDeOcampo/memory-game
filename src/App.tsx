import Board from "@/components/Board/Board";
import GameHeader from "./components/GameHeader/GameHeader";
import styles from "@/App.module.scss";

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.gameArea}>
        <GameHeader />
        <Board />
      </div>
    </div>
  );
}
