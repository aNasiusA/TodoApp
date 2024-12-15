import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const pool = mysql
  .createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
      ca: fs.readFileSync(process.env.CERT_PATH),
    },
    connectionLimit: 10,
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
