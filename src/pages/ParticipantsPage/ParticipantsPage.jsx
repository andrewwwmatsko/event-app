import { useCallback, useEffect, useRef, useState } from "react";
import { fetchParticipants } from "../../Api/events-api.js";
import { Link, useLocation, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { IoSearchOutline } from "react-icons/io5";

import { failedToast } from "../../helpers/toasts.js";

import Loader from "../../components/Loader/Loader.jsx";
import Section from "../../components/Section/Section.jsx";
import Container from "../../components/Container/Container.jsx";
import ParticipantList from "../../components/ParticipantList/ParticipantList.jsx";

import css from "./Participants.module.css";
import BackToButton from "../../components/BackToButton/BackToButton.jsx";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [filter, setFilter] = useState("");

  const { eventId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/events");

  const caseFilteredParticipants = useCallback(() => {
    if (!Array.isArray(participants)) return;
    setFilteredParticipants(
      participants.filter(
        (participant) =>
          participant.fullName.toLowerCase().includes(filter.toLowerCase()) ||
          participant.email.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [participants, filter]);

  useEffect(() => {
    const getParticipants = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const participants = await fetchParticipants(eventId);
        setParticipants(participants);
      } catch (error) {
        failedToast(error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getParticipants();
  }, [eventId]);

  useEffect(() => {
    if (Array.isArray(participants) && participants.length < 1) return;
    caseFilteredParticipants();
  }, [filter, caseFilteredParticipants, participants]);

  return (
    <main>
      <Section>
        <Container>
          {Array.isArray(participants) && participants.length > 1 && (
            <BackToButton to={`/events/${eventId}`}>
              Go to Event registration
            </BackToButton>
          )}

          <h1 className={css.title}>Participants</h1>

          {Array.isArray(participants) && participants.length > 0 && (
            <div className={css.searchWrapper}>
              <IoSearchOutline size={24} className={css.searchIcon} />
              <input
                className={css.search}
                type="text"
                placeholder="Search by name or email"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          )}

          {filter && (
            <p className={css.resultParagraph}>
              Results for `<span className={css.filterResult}>{filter}</span>`:
            </p>
          )}

          {Array.isArray(participants) &&
          participants.length > 0 &&
          !isError ? (
            <ParticipantList participants={filteredParticipants} />
          ) : (
            <div className={css.noParticipantsWrapper}>
              <h2 className={css.noParticipantsTitle}>
                There are no participants yet.
              </h2>
              <p className={css.noParticipantsText}>
                It seems that people cannot dare to be the first. But we are
                here to have fun and develop, so be the pioneer.
              </p>
              <p className={css.noParticipantsSlogan}>Sign up to the first!</p>
              <div className={css.linkGroup}>
                <Link
                  to={backLinkRef.current}
                  className={css.NoParticipatnsGoBack}
                >
                  Go Back
                </Link>
                <Link
                  to={`/events/${eventId}`}
                  className={css.noParticipantsSignUpBtn}
                >
                  Sign up
                </Link>
              </div>
            </div>
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
