import { BiSolidCalendar } from "react-icons/bi";
import { FaBullhorn } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

import { formatDate } from "../../helpers/formatDate.js";
import { cutText } from "../../helpers/cutText.js";

import css from "./Event.module.css";

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
          <FaBullhorn size={18} /> {event.organizer}
        </p>
      </div>

      <div className={css.info}>
        <h2 className={css.title}>{cutText(event.title, 22)}</h2>

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
        <Link className={css.view}>View</Link>
      </div>
    </div>
  );
}
