import { Todo } from "@prisma/client";
import { create } from "zustand";

interface TodoStore {
  todo: Todo[];
  addTodo: (data: any) => void;
  setTodo: (todos: any) => void;
  deleteTodo:(id:any) => void;
}

export const useTodosStore = create<TodoStore>()((set) => ({
  setTodo: (todos) => set({ todo: todos }),
  todo: [],
  addTodo: (newTodo) => set((state) => ({ todo: [...state.todo, newTodo] })),
  deleteTodo: (id) => set((state) => ({todo: state.todo.filter((e:any) => e.id !== id)}))
}));
