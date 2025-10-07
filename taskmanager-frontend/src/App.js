import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "LOW",
    dueDate: "",
  });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!newTask.title.trim()) return alert("Title cannot be empty");
    try {
      await axios.post("http://localhost:8080/api/tasks", newTask);
      setNewTask({ title: "", description: "", priority: "LOW", dueDate: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Toggle completion
  const toggleCompleted = async (task) => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="app">
      <h1>🧠 Task Manager</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task ${task.completed ? "done" : ""}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <strong>Priority:</strong> {task.priority} |{" "}
                <strong>Due:</strong>{" "}
                {task.dueDate ? task.dueDate : "No date"}
              </p>
              <div className="buttons">
                <button onClick={() => toggleCompleted(task)}>
                  {task.completed ? "Mark Incomplete" : "Mark Done"}
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
