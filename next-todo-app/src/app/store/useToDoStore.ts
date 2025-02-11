import { create } from "zustand";
import { ToDoStore } from "../types/todo";
import axios from "axios";

export const useToDoStore = create<ToDoStore>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  limits: 10,

  addTask: async (task) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/todos", task);
      const newTask = { ...response.data, id: task.id || crypto.randomUUID() };
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  completeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  setTasks: (tasks) => set({ tasks }),

  setLimits: (limits) => set({ limits }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  fetchTasks: async (limits: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limits}`);
      set({ tasks: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
