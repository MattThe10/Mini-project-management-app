import { useState, useRef } from "react";

export default function Project({
  title,
  desc,
  date,
  deleteProject,
  tasks,
  addTask,
  deleteTask,
}) {
  const dt = date == "" ? "No date stated" : new Date(date);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const task = useRef();

  function handleAddTask() {
    if (task.current.value) {
      addTask(task.current.value);
      task.current.value = "";
    }
  }

  return (
    <div className="flex flex-col w-[30vw] gap-2">
      <div className="flex flex-row text-center justify-between">
        <h1 className="font-bold text-stone-900 text-3xl self-center">
          {title}
        </h1>
        <button className="text-stone-600" onClick={deleteProject}>
          Delete
        </button>
      </div>
      <div className="flex flex-col border-stone-300 border-b-2 gap-2">
        <p className="text-stone-400">
          {dt == "No date stated"
            ? "No date stated"
            : dt.toLocaleDateString("en-US", options)}
        </p>
        <p>{desc}</p>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <div className="flex flex-row gap-4">
          <input type="text" className="bg-stone-200 rounded" ref={task} />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="bg-stone-200 rounded mt-5">
          {tasks.length == 0 ? (
            <p className="p-2">This project does not have any tasks yet</p>
          ) : (
            tasks.map((item) => (
              <span key={item.id} className="flex flex-row justify-between p-2">
                <p>{item.title}</p>
                <button onClick={() => deleteTask(item.id)}>Clear</button>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
