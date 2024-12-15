import PropTypes from "prop-types";
import { useState } from "react";
import "../styles/TodoItem-style.css";
import editIcon from "../assets/edit-3-svgrepo-com.svg";
import deleteIcon from "../assets/delete-1-svgrepo-com.svg";

const TodoItem = ({ todo, onDelete, onEdit }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed === 1);
  const endPoint = import.meta.env.VITE_NODE_BACKEND_URL;

  const toggleCompletion = async () => {
    try {
      await fetch(`${endPoint}/todo/isCompleted/${todo.task_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !isCompleted }),
      });
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={toggleCompletion}
      />
      <p style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
        {todo.description}
      </p>
      <button disabled={isCompleted}>
        <img src={editIcon} alt="Edit" onClick={() => onEdit(todo)} />
      </button>
      <button onClick={() => onDelete(todo.task_id)}>
        <img src={deleteIcon} alt="Delete" />
      </button>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    description: PropTypes.string.isRequired,
    task_id: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoItem;
