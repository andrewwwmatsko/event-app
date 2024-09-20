import { IoSearchOutline } from "react-icons/io5";

import css from "./SearchBox.module.css";
import { useEffect, useState } from "react";

export default function SearchBox({ setSearch, search, handleSearchSubmit }) {
  const [inputValue, setInputValue] = useState(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value.trim();
    handleSearchSubmit(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearch(e.target.value);
  };

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  return (
    <div className={css.formWrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          className={css.input}
          value={inputValue}
          onChange={handleChange}
          placeholder="Find event by its full name"
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
