"use client";

import { useEffect } from "react";
import { useToDoStore } from "../store/useToDoStore";
import { ToDo } from "../types/todo";

export const ToDoList = () => {
  const { tasks, addTask, deleteTask, completeTask, isLoading, error, fetchTasks } = useToDoStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const generateId = () => {
    return Math.floor(Math.random() * 500);
  }

  const handleAddTask = (newTask: string) => {
    const task: ToDo = { title: newTask, completed: false, userId: generateId(), id: Date.now() };
    addTask(task);
  };

  const handleDelete = (id: number) => {
    deleteTask(id);
  };

  const handleComplete = (id: number) => {
    completeTask(id);
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">To-Do List</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Enter a new task"
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={() => handleAddTask((document.querySelector('input') as HTMLInputElement).value)}
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
