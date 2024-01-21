import {
  TodoNotFoundException,
  UserNotFoundException,
} from "@/exceptions/error";
import authOptions from "@/lib/authOptions";
import { addTodoGoal, deleteTodoGoal, getTodoList } from "@/lib/todo";
import { GoalPayload } from "@/types/todo";
import { getServerSession } from "next-auth";

export async function addGoalTodoService(data: GoalPayload) {
  const session = await getServerSession(authOptions);
  if (session) {
    let todo = await getTodoList(session.user.id);
    if (!todo) throw new TodoNotFoundException("The todo is not found");
    await addTodoGoal(data, todo.id);
  } else {
    throw new UserNotFoundException("The user is not valid");
  }
}

export async function handleDeleteGoalByIdService(todoId: string) {
  const session = await getServerSession(authOptions);
  if (session && todoId) {
    let todo = await getTodoList(session.user.id);
    if (!todo) throw new TodoNotFoundException("The todo is not found");
    return await deleteTodoGoal(todoId, todo.id);
  }
}
