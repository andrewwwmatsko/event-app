import Event from "../Event/Event.jsx";

import css from "./EventList.module.css";

export default function EventList({ events }) {
  return (
    <>
      {/* {filteredTodos.length < 1 && (
          <Text textAlign="center">We did not find any todo😯</Text>
        )} */}
      <ul className={css.list}>
        {events.map((event, index) => {
          return (
            <li key={event._id}>
              <Event event={event} index={index + 1} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
