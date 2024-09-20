import Section from "../../components/Section/Section.jsx";
import Container from "../../components/Container/Container.jsx";

import Image from "../../images/404.png";

import css from "./PageNotFound.module.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main>
      <Section>
        <Container>
          <img
            src={Image}
            alt="icon"
            width={692}
            height={461}
            className={css.image}
          />
          <h1 className={css.title}>Page not found!</h1>
          <p className={css.subtitle}>
            Uh-oh! It seems that the page ran with the people to a cool event!
          </p>
          <p className={css.text}>Jump to all events to have fun!</p>

          <Link to="/events" className={css.link}>
            Jump to all events
          </Link>
        </Container>
      </Section>
    </main>
  );
}
