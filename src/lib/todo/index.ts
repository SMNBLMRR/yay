import { InvalidAddTodoGoalException, TodoNotFoundException } from "@/app/exceptions/error";
import { prisma } from "@/lib/prisma";
import { GoalPayload } from "@/types/todo";
export async function getTodoList(userId: string) {
  let todo;
  todo = await prisma.todo.findFirst({
    where: {
      userId,
    },
  });
  if (!todo)
    throw new TodoNotFoundException("Impossible to retrieve the todo do list");
  return todo;
}

export async function addTodoGoal(payload:GoalPayload,todoId:string) {
  let createdGaol = await prisma.goals.create({
    data:{
      name:payload.name,
      description:payload.description,
      todoId
    }
  })
  if(!createdGaol)
    throw new InvalidAddTodoGoalException("Impossible to create todo");
  return createdGaol;
}