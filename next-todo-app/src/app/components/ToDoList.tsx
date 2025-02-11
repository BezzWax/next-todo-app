"use client";

import { useEffect, useState } from "react";
import { useToDoStore } from "../store/useToDoStore";
import { ToDo } from "../types/todo";

export const ToDoList = () => {
  const { tasks, limits, addTask, deleteTask, completeTask, setLimits, isLoading, error, fetchTasks } = useToDoStore();
  
  const [newTask, setNewTask] = useState("");
  const [limit, setLimit] = useState(limits);

  useEffect(() => {
    fetchTasks(limit);
  }, [fetchTasks, limit]);
  

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
  
    const newId = crypto.randomUUID();
    const task: ToDo = { title: newTask, completed: false, userId: 1, id: newId };
  
    addTask(task);
    setNewTask("");
  };
  

  const handleDelete = (id: number) => deleteTask(id);

  const handleComplete = (id: number) => completeTask(id);

  const handleSetLimits = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    if (!isNaN(newLimit)) {
      setLimit(newLimit);
      setLimits(newLimit);
    }
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">To-Do List</h2>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="w-full sm:w-auto p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={limit}
          onChange={handleSetLimits}
          placeholder="Set limit"
          className="w-full sm:w-auto p-3 border border-gray-300 rounded-md"
        />
        <button
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
          >
            <span className={task.completed ? "line-through text-gray-700" : "text-gray-700"}>
              {task.title}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleComplete(task.id)}
                className="text-green-500 hover:text-green-700 focus:outline-none"
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
