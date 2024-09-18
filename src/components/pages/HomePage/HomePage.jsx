import { useEffect, useState } from "react";

import Filter from "../../Filter/Filter.jsx";
import Container from "../../Container/Container.jsx";
import Header from "../../Header/Header.jsx";
import Section from "../../Section/Section.jsx";
import EventList from "../../EventList/EventList.jsx";
import { fetchEvents } from "../../../Api/events-api.js";

export default function HomePage() {
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
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchEvents(page);
        setEvents((prev) => [...prev, ...response.data]);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error(error.message);
        setIsError(false);
      } finally {
        setIsLoading(false);
      }
    };
    getEvents();
  }, [page]);

  return (
    <>
      <Section>
        <Container>
          <EventList todos={todos} events={events} />
        </Container>
      </Section>
    </>
  );
}
