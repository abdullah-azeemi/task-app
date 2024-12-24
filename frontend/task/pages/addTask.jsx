import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axiosInstance.get("/tasks");
    setTasks(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post("/tasks", {
      name: taskName,
      description,
      dueDate,
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div>
        <h1>Add Task Page</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
        <h2>Your Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.name} - {task.description} - {task.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AddTask;
