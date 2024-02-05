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
  let createdGaol = await prisma.goal.create({
    data: {
      name: payload.name,
      description: payload.description,
      priority: payload.priority,
      todoId,
    },
  });
  return createdGaol;
}

export async function createSubtask(
  payload: { name: string },
  todoId: string,
  goalId: string
) {
  let createdSubtask = await prisma.goal.update({
    where: {
      id: goalId,
    },
    data: {
      subTasks: {
        create: {
          todoId,
          ...payload,
        },
      },
    },
  });
  console.log(createdSubtask);
  console.log(payload);
}

export async function deleteTodoGoal(id: string, todoId: string) {
  return await prisma.goal.deleteMany({
    where: {
      id: id,
      todoId,
    },
  });
}

export async function updateTodoGoal(
  id: string,
  todoId: string,
  payload: GoalPayload
) {
  let value = await prisma.goal.update({
    where: {
      id,
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
  let goals = await prisma.goal.findMany({
    where: {
      todoId,
      done,
      OR: [{ parentTaskId: null }, { parentTaskId: "" }],
    },
    orderBy: {
      createdAt: orderBy,
    },include:{
      parentTask:true,
      subTasks:true
    }
  });
  console.log(goals);
  return goals;
}
