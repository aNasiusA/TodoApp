let newTodo;
let setTodos;
let setNewTodo;
let todos;

const addTodo = async () => {
  if (!newTodo) return;
  try {
    const response = await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTodo }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setNewTodo("");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export { addTodo };
