import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Section from "../../Section/Section.jsx";
import Container from "../../Container/Container.jsx";

import { getEventById } from "../../../Api/events-api.js";
import Loader from "../../Loader/Loader.jsx";

import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();

  const backLinfRef = useRef(location.state ?? "/events");

  const { eventId } = useParams();

  useEffect(() => {
    const getEvent = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const event = await getEventById(eventId);
        setEvent(event);
      } catch (error) {
        setIsError(true);
        throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getEvent();
  }, [eventId]);

  return (
    <Section>
      <Container>
        {event && !isError && !isLoading && <p>Yes</p>}
        {isLoading && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}
      </Container>
    </Section>
  );
}
