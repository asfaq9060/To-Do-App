import css from "./TodoItems.module.css";
import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onCompletedClick }) => {
  return (
    <div className={css["items-container"]}>
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoDate={item.dueDate}
          todoName={item.name}
          completed={item.completed}
          onDeleteClick={onDeleteClick}
          onCompletedClick={onCompletedClick}
        />
      ))}
    </div>
  );
};
export default TodoItems;
