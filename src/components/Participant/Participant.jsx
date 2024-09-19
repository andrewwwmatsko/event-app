import { BsPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import css from "./Participant.module.css";

export default function Participant({ participant }) {
  return (
    <div className={css.box}>
      <div className={css.infoWrapper}>
        <BsPersonFill size={24} />
        <p className={css.name}> {participant.fullName}</p>
      </div>

      <div className={css.infoWrapper}>
        <MdEmail size={24} />
        <p className={css.email}> {participant.email}</p>
      </div>
    </div>
  );
}
