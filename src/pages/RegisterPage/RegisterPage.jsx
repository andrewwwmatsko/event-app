import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { BiSolidCalendar } from "react-icons/bi";
import { PiClockFill } from "react-icons/pi";

import Section from "../../components/Section/Section.jsx";
import Container from "../../components/Container/Container.jsx";

import { getEventById, registerUser } from "../../Api/events-api.js";
import Loader from "../../components/Loader/Loader.jsx";

import { formatDate, formatTime } from "../../helpers/formatDate.js";
import { failedToast, makeToast } from "../../helpers/toasts.js";

import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";

import Icon from "../../icons/loudspeaker.svg";

import css from "./RegisterPage.module.css";
import BackToButton from "../../components/BackToButton/BackToButton.jsx";

export default function RegisterPage() {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  const { eventId } = useParams();

  const handleRegister = async (payload) => {
    try {
      await registerUser(eventId, payload);
      makeToast("Registered!", "✅");
    } catch (error) {
      failedToast("Something went wrong...");
      throw new Error(error);
    }
  };

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
    <main>
      <Section>
        <Container>
          {event && !isError && !isLoading && (
            <>
              <BackToButton to={backLinkRef.current}>Back</BackToButton>

              <h1 className={css.pageTitle}>Event registration</h1>

              <div className={css.wrapper}>
                <div className={css.eventBox}>
                  <h2 className={css.eventTitle}>{event.title}</h2>

                  <div>
                    <p className={css.date}>
                      <BiSolidCalendar size={24} /> Date:
                      <span className={css.text}>{formatDate(event.date)}</span>
                    </p>
                    <p className={css.time}>
                      <PiClockFill size={24} />
                      Time:
                      <span className={css.text}>{formatTime(event.date)}</span>
                    </p>
                    <p className={css.organizer}>
                      <img src={Icon} alt="icon" /> Organizer:
                      <span className={css.text}> {event.organizer}</span>
                    </p>
                  </div>

                  <p className={css.description}>{event.description}</p>
                </div>

                <div className={css.formWrapper}>
                  <h2 className={css.formTitle}>
                    Fill out the form and join the event!
                  </h2>
                  <p className={css.formSubtitle}>
                    After registering, you’ll get access to exciting activities
                    and growth opportunities. Don’t miss your chance!
                  </p>

                  <RegistrationForm handleRegister={handleRegister} />
                </div>
              </div>
            </>
          )}
          {isLoading && (
            <div className={css.loader}>
              <Loader />
            </div>
          )}
        </Container>
        <Toaster position="top-center" reverseOrder={false} />
      </Section>
    </main>
  );
}
