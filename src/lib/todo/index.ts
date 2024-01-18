import {
  InvalidAddTodoGoalException,
  TodoCreationError,
  TodoNotFoundException,
} from "@/exceptions/error";
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
      todoId,
    },
  });
  if (!createdGaol)
    throw new InvalidAddTodoGoalException("Impossible to create todo");
  return createdGaol;
}

export async function getGoalsFromTodo(todoId:string){
  let goals = await prisma.goals.findMany({
    where:{
      todoId:todoId
    }
  });  
  return goals;
}