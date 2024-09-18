import { useEffect, useState } from "react";

import Filter from "../../Filter/Filter.jsx";
import Container from "../../Container/Container.jsx";
import Header from "../../Header/Header.jsx";
import Section from "../../Section/Section.jsx";
import EventList from "../../EventList/EventList.jsx";
import { fetchEvents } from "../../../Api/events-api.js";

export default function HomePage() {
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
          {events.length > 0 && !isLoading && !isError && (
            <EventList events={events} />
          )}
        </Container>
      </Section>
    </>
  );
}
