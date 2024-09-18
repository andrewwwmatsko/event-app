import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Container from "../../Container/Container.jsx";
import Section from "../../Section/Section.jsx";
import EventList from "../../EventList/EventList.jsx";
import { fetchEvents } from "../../../Api/events-api.js";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handlePageChange = (evt, value) => {
    setPage(value);
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchEvents(page);
        setEvents(response.data);
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

          <Stack
            spacing={2}
            sx={{
              display: "block",
              margin: "0 auto",
              width: 400,
            }}
          >
            <Pagination
              count={totalPages}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </Container>
      </Section>
    </>
  );
}
