import {
  TodoNotFoundException,
  UserNotFoundException,
} from "@/exceptions/error";
import authOptions from "@/lib/authOptions";
import {
  addTodoGoal,
  deleteTodoGoal,
  getTodoList,
  updateTodoGoal,
} from "@/queries/todo";
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

export async function handleUpdateTodoStatusService(
  todoId: number,
  payload: GoalPayload
) {
  const session = await getServerSession(authOptions);
  if (session && todoId) {
    let todo = await getTodoList(session.user.id);
    if (!todo) throw new TodoNotFoundException("The todo is not found");
    return await updateTodoGoal(todoId, todo.id, payload);
  }
}
