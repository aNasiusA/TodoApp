import express from "express";
import cors from "cors";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodoDesc,
  updateTodoCom,
  deleteTodo,
} from "./database.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello, World!");
});

app.get("/todo", async (req, res) => {
  const tasks = await getAllTodos();
  res.json(tasks);
});

app.get("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const tasks = await getTodoById(id);
  res.json(tasks);
});

app.post("/todo", async (req, res) => {
  const task = req.body.description;
  const result = await createTodo(task);
  const newTodo = await getTodoById(result.insertId);
  res.json(newTodo);
});

app.patch("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const task = req.body.description;
  const result = await updateTodoDesc(id, task);
  const newTodo = await getTodoById(result.insertId);
  res.json(newTodo);
});

app.patch("/todo/isCompleted/:id", async (req, res) => {
  const id = req.params.id;
  const isCompleted = req.body.completed;
  const result = await updateTodoCom(id, isCompleted);
  const newTodo = await getTodoById(result.insertId);
  res.json(newTodo);
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteTodo(id);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});