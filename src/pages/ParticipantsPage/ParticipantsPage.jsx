import { useEffect, useMemo, useState } from "react";
import { fetchParticipants } from "../../Api/events-api.js";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { IoSearchOutline } from "react-icons/io5";

import { failedToast } from "../../helpers/toasts.js";

import Loader from "../../components/Loader/Loader.jsx";
import Section from "../../components/Section/Section.jsx";
import Container from "../../components/Container/Container.jsx";
import ParticipantList from "../../components/ParticipantList/ParticipantList.jsx";

import css from "./Participants.module.css";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [filter, setFilter] = useState("");

  const { eventId } = useParams();

  const filteredParticipants = useMemo(() => {
    return participants.filter(
      (participant) =>
        participant.fullName.toLowerCase().includes(filter.toLowerCase()) ||
        participant.email.toLowerCase().includes(filter.toLowerCase())
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

  return (
    <main>
      <Section>
        <Container>
          <h1 className={css.title}>Participants</h1>

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

          {filter && (
            <p className={css.resultParagraph}>
              Results for <span className={css.filterResult}>{filter}</span>:
            </p>
          )}

          {participants.length > 1 && (
            <ParticipantList participants={filteredParticipants} />
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
