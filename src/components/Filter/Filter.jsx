import css from "./Filter.module.css";

export default function Filter() {
  return (
    <div className={css.formWrapper}>
      <form>
        <input
          type="text"
          name="search"
          className={css.input}
          placeholder="Search event by name"
        />
      </form>
    </div>
  );
}
