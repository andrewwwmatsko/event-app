import Participant from "../Participant/Participant.jsx";

import css from "./ParticipantList.module.css";

export default function ParticipantList({ participants }) {
  return (
    <ul className={css.list}>
      {participants.map((participant) => {
        return (
          <li key={participant._id}>
            <Participant participant={participant} />
          </li>
        );
      })}
    </ul>
  );
}
