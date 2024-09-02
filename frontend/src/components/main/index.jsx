import React, { useState } from "react";
import styles from "./styles.module.css";

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>To-doey</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.todo_container}>
        <h1>To-Doey</h1>
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new todo"
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
