export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ToDoStore {
  tasks: ToDo[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: ToDo) => void;
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
  setTasks: (tasks: ToDo[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchTasks: () => Promise<void>;
}