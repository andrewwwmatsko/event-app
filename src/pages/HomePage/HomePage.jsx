import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Container from "../../components/Container/Container.jsx";
import Section from "../../components/Section/Section.jsx";
import EventList from "../../components/EventList/EventList.jsx";
import { fetchEvents, getEventByName } from "../../Api/events-api.js";
import MySelect from "../../components/MySelect/MySelect.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import css from "./HomePage.module.css";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [notFoundSearch, setNotFoundSearch] = useState(false);

  const [search, setSearch] = useState("");
  const [searchSubmit, setSearchSubmit] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (evt, value) => {
    setPage(value);
  };

  const handleSearchSubmit = (query) => {
    setSearchSubmit(query);
    setPage(1);
    searchParams.delete("sortBy");
    searchParams.delete("sortOrder");
  };

  useEffect(() => {
    if (search) return;
    if (searchSubmit) return;
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");

    let loadingTimeout;

    const getEvents = async () => {
      try {
        setNotFoundSearch(false);
        setIsError(false);
        loadingTimeout = setTimeout(() => setIsLoading(true), 300);

        const response = await fetchEvents(page, { sortBy, sortOrder });

        setEvents(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        clearTimeout(loadingTimeout);
        setIsLoading(false);
      }
    };

    getEvents();

    return () => clearTimeout(loadingTimeout);
  }, [page, searchParams, search, searchSubmit]);

  useEffect(() => {
    if (!searchSubmit) return;

    let loadingTimeout;

    const searchEvent = async () => {
      try {
        setNotFoundSearch(false);
        setIsError(false);
        loadingTimeout = setTimeout(() => setIsLoading(true), 300);

        const response = await getEventByName(searchSubmit, page);

        setEvents(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        if (error.status === 404) {
          setNotFoundSearch(true);
          return;
        }
        setIsError(true);
      } finally {
        clearTimeout(loadingTimeout);
        setIsLoading(false);
      }
    };
    searchEvent();

    return () => clearTimeout(loadingTimeout);
  }, [searchSubmit, page]);

  return (
    <main>
      <Section>
        <Container>
          <div>
            <h1 className={css.pageTitle}>Events</h1>

            <SearchBox
              handleSearchSubmit={handleSearchSubmit}
              setSearch={setSearch}
              search={search}
            />

            {events.length > 0 && !isLoading && !isError && (
              <>
                {!notFoundSearch && (
                  <MySelect
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    setSearch={setSearch}
                    setPage={setPage}
                    setSearchSubmit={setSearchSubmit}
                  />
                )}
                {notFoundSearch && !isError && !isLoading ? (
                  <h2 className={css.noSearchResults}>No results 😔</h2>
                ) : (
                  <EventList events={events} />
                )}
              </>
            )}
          </div>
          {isLoading && (
            <div className={css.loader}>
              <Loader />
            </div>
          )}

          {!isLoading && !isError && !notFoundSearch && (
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
                  justifyContent: "center",
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
          )}
        </Container>
      </Section>
    </main>
  );
}
