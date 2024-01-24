import { prisma } from "@/lib/prisma";
import { GoalPayload } from "@/types/todo";

export async function createTodo(title: string, userId: string) {
  let newTodo = await prisma.todo.create({
    data: {
      name: title,
      userId,
    },
  });
  return newTodo;
}

export async function getTodoList(userId: string) {
  let todo;
  todo = await prisma.todo.findFirst({
    where: {
      userId,
    },
  });
  return todo;
}

export async function addTodoGoal(payload: GoalPayload, todoId: string) {
  let createdGaol = await prisma.goals.create({
    data: {
      name: payload.name,
      description: payload.description,
      priority: payload.priority,
      todoId,
    },
  });
  return createdGaol;
}

export async function deleteTodoGoal(id: string, todoId: string) {
  return await prisma.goals.deleteMany({
    where: {
      id: Number(id),
      todoId,
    },
  });
}

export async function updateTodoGoal(
  id: number,
  todoId: string,
  payload: GoalPayload
) {
  let value = await prisma.goals.update({
    where: {
      id: Number(id),
      todoId,
    },
    data: {
      ...payload,
    },
  });
  return value;
}

export async function getGoalsFromTodo(
  todoId: string,
  orderBy: "asc" | "desc",
  done: boolean = false
) {
  let goals = await prisma.goals.findMany({
    where: {
      todoId: todoId,
      done,
    },
    orderBy: {
      createdAt: orderBy,
    },
  });
  return goals;
}
