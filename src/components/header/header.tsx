import Link from "next/link";
import styles from "./header.module.scss";
interface HeaderProps {
  userName: string;
}
export default function Header({ userName }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.nav}>
          <Link href="/">Главная</Link>
          <Link href="/utility/calculator">Калькулятор</Link>
          <Link href="/utility/password-generator">Генератор</Link>
        </nav>
        <div className={styles.user}>
          <p>{userName}</p>
          <div className={styles.userIcon}>{userName[0]}</div>
        </div>
      </div>
    </header>
  );
}
