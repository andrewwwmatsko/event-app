import { BiSolidCalendar } from "react-icons/bi";
import { FaBullhorn } from "react-icons/fa6";

import { formatDate } from "../../helpers/formatDate.js";
import { cutText } from "../../helpers/cutText.js";

import css from "./Event.module.css";

export default function Event({ event }) {
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
        <button type="button" className={css.register}>
          Register
        </button>
        <button type="button" className={css.view}>
          View
        </button>
      </div>
    </div>
  );
}
