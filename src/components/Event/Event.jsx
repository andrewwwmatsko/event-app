import { RiDeleteBin6Fill, RiEdit2Line } from "react-icons/ri";
import Text from "../Text/Text.jsx";

import css from "./Event.module.css";

export default function Event({ todo, index }) {
  return (
    <div className={css.box}>
      <Text textAlign="center" marginBottom="20">
        TODO # {index}
      </Text>

      <Text>{todo.title}</Text>
      <button className={css.deleteButton} type="button" onClick={() => {}}>
        <RiDeleteBin6Fill size={24} />
      </button>

      <button
        // disabled={currentTodo}
        className={css.editButton}
        type="button"
        // onClick={handleAddCurrentTodo}
      >
        <RiEdit2Line size={24} />
      </button>
    </div>
  );
}
