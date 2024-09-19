import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Filter from "../../components/Filter/Filter.jsx";
import Container from "../../components/Container/Container.jsx";
import Section from "../../components/Section/Section.jsx";
import EventList from "../../components/EventList/EventList.jsx";
import { fetchEvents } from "../../Api/events-api.js";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // const [search, setSearch] = useState("");

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
    <main>
      <Section>
        <Container>
          <div>
            {/* <Filter /> */}
            {events.length > 0 && !isLoading && !isError && (
              <EventList events={events} />
            )}
          </div>

          <Stack
            spacing={2}
            sx={{
              display: "block",
              margin: "0 auto",
              width: 400,
              marginTop: "auto",
            }}
          >
            <Pagination
              count={totalPages}
              variant="outlined"
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "#151730",
                  color: "#fbf9ff",
                  "&:hover": {
                    backgroundColor: "#151730",
                  },
                },
              }}
            />
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
