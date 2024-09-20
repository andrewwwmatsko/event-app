import { Link } from "react-router-dom";

import { RiArrowLeftSLine } from "react-icons/ri";

import css from "./BackToButton.module.css";

export default function BackToButton({ to, children }) {
  return (
    <Link to={to} className={css.button}>
      <RiArrowLeftSLine size={24} />
      {children}
    </Link>
  );
}
