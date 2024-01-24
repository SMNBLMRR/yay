"use server";
import {
  addGoalTodoService,
  handleDeleteGoalByIdService,
  handleUpdateTodoStatusService,
} from "@/services/todo";
import { InvalidAddTodoGoalException } from "@/exceptions/error";
import { log } from "@/lib/log";
import { validateAddTodoGoal } from "@/schema/todo";
import { GoalPayload } from "@/types/todo";
import { revalidatePath } from "next/cache";

export async function addGoalTodoAction(data: GoalPayload) {
  try {
    //validation payload
    if (!validateAddTodoGoal(data))
      throw new InvalidAddTodoGoalException("Your data seems incorrect");
    //call service layer
    await addGoalTodoService(data);
  } catch (error) {
    //toast notification
    log.error(error);
  } finally {
    //revalidate path goals page
    revalidatePath("/app/goals");
  }
}

export async function handleDeleteGoalAction(id: string) {
  try {
    await handleDeleteGoalByIdService(id);
  } catch (error) {
    //toast notification
    console.log(error);
  } finally {
    revalidatePath("/app/goals");
  }
}

export async function handleUpdateTodoStatusAction(
  id: number,
  payload: GoalPayload
) {
  try {
    await handleUpdateTodoStatusService(id, payload);
  } catch (error) {
    //toast notification
    console.log(error);
  } finally {
    revalidatePath("/app/goals");
  }
}
