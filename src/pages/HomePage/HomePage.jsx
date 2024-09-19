import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Container from "../../components/Container/Container.jsx";
import Section from "../../components/Section/Section.jsx";
import EventList from "../../components/EventList/EventList.jsx";
import { fetchEvents } from "../../Api/events-api.js";
import MySelect from "../../components/MySelect/MySelect.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";

import css from "./HomePage.module.css";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [search, setSearch] = useState("");

  const handlePageChange = (evt, value) => {
    setPage(value);
  };

  const handleSearch = (query) => {
    setSearch();
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
            <h1 className={css.pageTitle}>Events</h1>
            <SearchBox />

            {events.length > 0 && !isLoading && !isError && (
              <>
                <MySelect setEvents={setEvents} page={page} />
                <EventList events={events} />
              </>
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
