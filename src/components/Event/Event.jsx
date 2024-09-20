import { BiSolidCalendar } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

import { formatDate } from "../../helpers/formatDate.js";
import { cutText } from "../../helpers/cutText.js";

import css from "./Event.module.css";

import Icon from "../../icons/loudspeaker.svg";

export default function Event({ event }) {
  const location = useLocation();

  return (
    <div className={css.box}>
      <div className={css.topPart}>
        <p className={css.date}>
          <BiSolidCalendar size={18} />
          {formatDate(event.date)}
        </p>
        <p className={css.organizer}>
          <img src={Icon} alt="icon" /> {event.organizer}
        </p>
      </div>

      <div className={css.info}>
        <h2 className={css.title}>{cutText(event.title, 30)}</h2>

        <p className={css.description}>{cutText(event.description, 100)}</p>
      </div>

      <div className={css.btnGroup}>
        <Link
          to={`/events/${event._id}`}
          state={location}
          className={css.register}
        >
          Register
        </Link>
        <Link
          to={`/events/${event._id}/participants`}
          state={location}
          className={css.view}
        >
          View
        </Link>
      </div>
    </div>
  );
}
