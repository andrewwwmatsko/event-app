import Container from "../Container/Container.jsx";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Container>
        <nav className={css.nav}>
          <h3 className={css.title}>SmartEvents</h3>
        </nav>
      </Container>
    </header>
  );
}
