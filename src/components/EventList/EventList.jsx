import { useLocation } from "react-router-dom";
import Event from "../Event/Event.jsx";

import css from "./EventList.module.css";

export default function EventList({ events }) {
  const location = useLocation();

  return (
    <>
      <ul className={css.list}>
        {events.map((event) => {
          return (
            <li key={event._id}>
              <Event event={event} location={location} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
