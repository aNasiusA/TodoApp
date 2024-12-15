import "../styles/TodoContainer-styles.css";
import TodoItem from "./TodoItem";
import { useState, useEffect, useCallback } from "react";

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const endPoint = import.meta.env.VITE_NODE_BACKEND_URL;

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch(`${endPoint}/todo`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, [endPoint]); // Add dependencies

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const startEdit = (todo) => {
    setEditMode(true);
    setNewTodo(todo.description);
    setCurrentTodoId(todo.task_id);
  };

  const addTodo = async () => {
    if (!newTodo) return; // Prevent adding an empty task
    try {
      const response = await fetch(`${endPoint}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newTodo }), // Use 'description' instead of 'task'
      });
      const newTask = await response.json();
      setTodos([...todos, newTask]); // Add the new task to the list of todos
      setNewTodo(""); // Clear the input field
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${endPoint}/todo/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.task_id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const editTodo = async () => {
    if (!newTodo || !currentTodoId) return;

    try {
      await fetch(`${endPoint}/todo/${currentTodoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newTodo }),
      });
      await fetchTodos(); // Refresh list
      setEditMode(false); // Reset edit mode
      setNewTodo(""); // Clear input
      setCurrentTodoId(null); // Reset ID
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  return (
    <div className="todo-container">
      <h2>To-Do List 📝</h2>
      <div className="input-field">
        <input
          type="text"
          id="input-box"
          placeholder="Add a task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // Update state with the input value
        />
        <button
          className="add-button"
          onClick={editMode ? editTodo : addTodo}
          style={{ backgroundColor: editMode ? "green" : "#007bff" }}
        >
          {editMode ? "Update" : "Add"}
        </button>
      </div>
      {todos.length > 0 ? (
        [...todos]
          .reverse()
          .map((todo) => (
            <TodoItem
              key={todo.task_id}
              todo={todo}
              onDelete={deleteTodo}
              onEdit={startEdit}
            />
          ))
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
};
export default TodoContainer;
