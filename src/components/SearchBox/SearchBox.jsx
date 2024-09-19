import { IoSearchOutline } from "react-icons/io5";

import css from "./SearchBox.module.css";

export default function SearchBox() {
  const handleSubmit = () => {};

  return (
    <div className={css.formWrapper}>
      <form className={css.form}>
        <input
          type="text"
          name="search"
          className={css.input}
          placeholder="Find event by name"
        />
        <div className={css.btnWrapper}>
          <button type="submit" className={css.submitBtn}>
            Search
          </button>
          <IoSearchOutline size={24} color="#FFFFFF" className={css.icon} />
        </div>
      </form>
    </div>
  );
}
