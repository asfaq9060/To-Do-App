import { MdDelete } from "react-icons/md";

function TodoItem({
  id,
  todoDate,
  todoName,
  completed,
  onDeleteClick,
  onCompletedClick,
}) {
  return (
    <div className="container">
      <div
        className="row kg-row align-items-center"
        style={{
          background: completed ? "#e0ffe0" : "#fff",
          borderRadius: "8px",
          marginBottom: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div className="col-1 d-flex justify-content-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onCompletedClick(id)}
            style={{ width: "1.2em", height: "1.2em" }}
            title="Mark as completed"
          />
        </div>
        <div
          className="col-5"
          style={{
            textDecoration: completed ? "line-through" : "none",
            color: completed ? "#888" : "#222",
            fontWeight: 500,
          }}
        >
          {todoName}
        </div>
        <div className="col-4" style={{ color: completed ? "#aaa" : "#555" }}>
          {todoDate ? new Date(todoDate).toLocaleDateString() : ""}
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger kg-button"
            onClick={() => onDeleteClick(id)}
            title="Delete task"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}
export default TodoItem;
