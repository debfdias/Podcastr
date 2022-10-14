import styles from './styles.module.scss';

export function Player() {
  return(
    <div className={styles.container}>
      <header>
        <img src='/playing.svg' alt='Playing now'/>
        <strong>Playing now</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Choose one podcast to listen</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider}/>
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="./shuffle.svg"/>
          </button>
          <button type="button">
            <img src="./play-previous.svg"/>
          </button>
          <button type="button">
            <img src="./play.svg"/>
          </button>
          <button type="button">
            <img src="./play-next.svg"/>
          </button>
          <button type="button">
            <img src="./repeat.svg"/>
          </button>
        </div>
      </footer>

    </div>
  )
}