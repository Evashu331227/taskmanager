import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/tasks")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> — {task.description} [{task.priority}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
