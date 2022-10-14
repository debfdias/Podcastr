import styles from './styles.module.scss';
import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US'

export function Header() {
  const currentDate = format(new Date(), 'EEEE, d MMMM', {
    locale: enUS
  })
  return(
    <header className={styles.container}>
      <img src='logo.svg' alt="Podcastr logo"/>
      <p>The best dev podcast.</p>

      <span>{currentDate}</span>
    </header>
  )
}