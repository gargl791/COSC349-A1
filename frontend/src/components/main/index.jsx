import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { formatDate } from "./FormatDate";

const Main = () => {
  const url = "http://localhost:3000/api/tasks";
  const userId = localStorage.getItem("userId");
  const [tasks, setTasks] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    fetchTasks();

    // Update the date and time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

const formatDateTime = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  return date.toLocaleString('en-US', options);
};

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${url}/${userId}`);
      setTasks(response.data);
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
      const newData = {userId, ...data};
      await axios.post(url, newData);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  }

  const handleTaskEdit = async (newData, taskId) => {
    try {
      await axios.put(`${url}/${taskId}`, newData);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`${url}/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div className={styles.mainContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <h1>To-doey</h1>
          <button className={styles.whiteBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className={styles.contentContainer}>
        <div className={ styles.heading}>
        <h2>Let's Get Productive!</h2>
        <h2 className={styles.currentDateTime}>{formatDateTime(currentDateTime)}</h2>
        <button className={styles.addTaskButton} onClick={() => setIsCreateModalOpen(true)}>+ Add Todo</button>
        </div>
        <div className={styles.taskList}>
          {tasks.map((task, index) => (
            <div key={index} className={styles.taskItem}>
              <h3>{task.title}</h3>
              <p>Priority: {task.priority}</p>
              <p>Tags: {task.tags}</p>
              <p>Date: {`${formatDate(task.start_date)} - ${formatDate(task.end_date)}`}</p>
              <div className={styles.taskButtons}>
                <button className={styles.whiteBtn} onClick={() => handleTaskDelete(task.task_id)}>Complete</button>
                <button className={styles.whiteBtn} onClick={() => handleOpenEditModal(task)}>Edit</button>
                <button className={styles.whiteBtn} onClick={() => handleTaskDelete(task.task_id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleTaskCreate}
        />
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleTaskEdit}
          task={taskToEdit}
        />
      </div>
    </div>
  );
};

export default Main;
