import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [timer, setTimer] = useState(""); // in minutes
  const [theme, setTheme] = useState("light");

   useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Ask for notification permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // ⏳ Countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.remainingTime > 0) {
            return { ...task, remainingTime: task.remainingTime - 1 };
          } else if (task.remainingTime === 0 && !task.notified) {
            // Send notification once
            new Notification("⏰ Task Reminder", {
              body: `Time's up for: ${task.text}`,
            });
            return { ...task, notified: true }; // mark as notified
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Add new task
  const addTask = () => {
    if (newTask.trim() === "") return;

    const timeInSeconds = timer && !isNaN(timer) ? Number(timer) * 60 : null;

    const newTaskObj = {
      text: newTask,
      done: false,
      remainingTime: timeInSeconds, // store in seconds
      notified: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
    setTimer("");
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Toggle done/undone
  const toggleDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  // Clear all
  const clearAll = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  // Format seconds → mm:ss
  const formatTime = (seconds) => {
    if (seconds == null) return null;
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          value={newTask}
          placeholder="Enter a task..."
          onChange={(e) => setNewTask(e.target.value)}
        />

        <input
          type="number"
          value={timer}
          placeholder="Timer (minutes)"
          onChange={(e) => setTimer(e.target.value)}
          style={{ width: "120px", marginLeft: "5px" }}
        />

        <button onClick={addTask}>Add</button>
        {tasks.length > 0 && (
          <button onClick={clearAll} style={{ background: "red" }}>
            Clear All
          </button>
        )}
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              onClick={() => toggleDone(index)}
              style={{
                textDecoration: task.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>

            {task.remainingTime != null && task.remainingTime > 0 && (
              <span style={{ marginLeft: "10px", color: "gray" }}>
                ⏳ {formatTime(task.remainingTime)}
              </span>
            )}

            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
