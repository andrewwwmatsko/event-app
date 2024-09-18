import { useEffect, useState } from "react";

import Filter from "../Filter/Filter.jsx";
import Container from "../Container/Container.jsx";
import Header from "../Header/Header.jsx";
import Section from "../Section/Section.jsx";
import EventList from "../EventList/EventList.jsx";

export default function App() {
  const [todos, setTodos] = useState([
    { title: "Do something", id: 1 },
    { title: "Do something 2", id: 2 },
    { title: "Do something 3", id: 3 },
    { title: "Do something", id: 4 },
    { title: "Do something 2", id: 5 },
    { title: "Do something 3", id: 6 },
    { title: "Do something 2", id: 7 },
    { title: "Do something 3", id: 8 },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <Section>
        <Container>
          <Filter />

          <EventList todos={todos} />
        </Container>
      </Section>
    </>
  );
}
