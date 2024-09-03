import styles from "./styles.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from './Modal';

const Main = () => {
  const priorityMap = {
    1: "Low",
    2: "Med",
    3: "High"
  };
  const url = "http://localhost:3000/api/tasks";
  const userId = localStorage.getItem("userId");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get(`${url}/${userId}`);
  //       setTasks(response.data);
  //       console.log(response)
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${url}/${userId}`);
      setTasks(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleTaskCreate = async (data) => {
    try {
      //adding userId to json data
      const newData = {userId, ...data}
      const response = await axios.post(url, newData);
      console.log("Received data:", newData);
      // Fetch tasks again after creating a new task
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>To-doey</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div>
        <h2>Lets Get Productive</h2>
        <button className="add-task-button" onClick={() => setIsModalOpen(true)}>+ Add Todo</button>
      </div>
      <ul className="task-list">
      {
        tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>Priority: {priorityMap[task.priority]}</p>
            <p>Tags: {task.tags}</p>
            <p>Date: {task.endDate}</p>
          </li>
        ))
      }
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTaskCreate}
      />
    </div>
  );
};

export default Main;

// import React, { useState } from "react";
// import styles from "./styles.module.css";

// const Main = () => {
//   const [todos, setTodos] = useState([]);
//   const [input, setInput] = useState("");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
//   };

//   const addTodo = () => {
//     if (input.trim() !== "") {
//       setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
//       setInput("");
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo,
//       ),
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   return (
//     <div className={styles.main_container}>
//       <nav className={styles.navbar}>
//         <h1>To-doey</h1>
//         <button className={styles.white_btn} onClick={handleLogout}>
//           Logout
//         </button>
//       </nav>
//       <div className={styles.todo_container}>
//         <h1>To-Doey</h1>
//         <div>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Add a new todo"
//           />
//           <button onClick={addTodo}>Add Todo</button>
//         </div>
//         <ul>
//           {todos.map((todo) => (
//             <li key={todo.id}>
//               <span
//                 style={{
//                   textDecoration: todo.completed ? "line-through" : "none",
//                 }}
//                 onClick={() => toggleTodo(todo.id)}
//               >
//                 {todo.text}
//               </span>
//               <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Main;
