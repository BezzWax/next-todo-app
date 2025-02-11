export interface ToDo {
  userId: number;
  id: any;
  title: string;
  completed: boolean;
}

export interface ToDoStore {
  tasks: ToDo[];
  isLoading: boolean;
  error: string | null;
  limits: number;
  addTask: (task: ToDo) => void;
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
  setTasks: (tasks: ToDo[]) => void;
  setLoading: (loading: boolean) => void;
  setLimits: (limits: number) => void;
  setError: (error: string | null) => void;
  fetchTasks: (limits: number) => Promise<void>;
}