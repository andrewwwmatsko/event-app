import Event from "../Event/Event.jsx";

import css from "./EventList.module.css";

export default function EventList({ todos }) {
  return (
    <>
      {/* {filteredTodos.length < 1 && (
          <Text textAlign="center">We did not find any todo😯</Text>
        )} */}
      <ul className={css.list}>
        {todos.map((todo, index) => {
          return (
            <li key={todo.id}>
              <Event todo={todo} index={index + 1} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
