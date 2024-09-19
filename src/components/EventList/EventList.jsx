import Event from "../Event/Event.jsx";

import css from "./EventList.module.css";

export default function EventList({ events }) {
  return (
    <>
      <ul className={css.list}>
        {events.map((event) => {
          return (
            <li key={event._id}>
              <Event event={event} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
