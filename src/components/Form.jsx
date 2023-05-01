import React, { useEffect } from "react";
import { useState } from "react";
import Task from "./Task";

function Form() {
    const initialTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setTasks([...tasks, { title, description }]);
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (index) => {
    const filteredArray = tasks.filter((val, i) => {
      return i !== index;
    });
    setTasks(filteredArray);
  };

  return (
    <div className="container">
      <h1>Daily Goals</h1>
      <form className="input" onSubmit={submitHandler}>
        <input
          type="text" 
          required
          placeholder="Enter the Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          required
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">ADD</button>
      </form>
      {tasks.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          description={item.description}
          deleteTask2={deleteTask}
          index={index}
        />
      ))}
    </div>
  );
}

export default Form;
