"use server";
import {
  addGoalTodoService,
  handleDeleteGoalByIdService,
} from "@/app/services/todo";
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
