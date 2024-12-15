import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "todo_app_simple",
  })
  .promise();

const getAllTodos = async () => {
  const [rows] = await pool.query("SELECT * FROM tasks");
  return rows;
};

const getTodoById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM tasks WHERE task_id = ?", [
    id,
  ]);
  return rows[0];
};

const createTodo = async (task) => {
  const [result] = await pool.query(
    "INSERT INTO tasks (description) VALUES (?)",
    [task]
  );
  return result;
};

const updateTodoDesc = async (id, task) => {
  const [result] = await pool.query(
    "UPDATE tasks SET description = ? WHERE task_id = ?",
    [task, id]
  );
  return result;
};

const updateTodoCom = async (id, isCompleted) => {
  const [result] = await pool.query(
    "UPDATE tasks SET completed = ? WHERE task_id = ?",
    [isCompleted, id]
  );
  return result;
};

const deleteTodo = async (id) => {
  const [result] = await pool.query("DELETE FROM tasks WHERE task_id = ?", [
    id,
  ]);
  return result;
};

export {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodoDesc,
  updateTodoCom,
  deleteTodo,
};
