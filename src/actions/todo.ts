"use server";
import { validateAddTodoGoal } from "@/schema/todo";
import {
  addGoalTodoService,
  handleCreateSubtaskService,
  handleDeleteGoalByIdService,
  handleUpdateTodoStatusService,
} from "@/services/todo";
import { GoalPayload } from "@/types/todo";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addGoalTodoAction(data: GoalPayload) {
  try {
    //validation payload
    let validatePayload = (await validateAddTodoGoal(data)) as GoalPayload;
    //call service layer
    await addGoalTodoService(validatePayload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      //toast notification zod error
      return {
        error: error.message,
      };
    }
    return {
      error: "Generic error",
    };
  } finally {
    //revalidate path goals page
    revalidatePath("/app/goals");
  }
}

export async function handleCreateSubtaskAction(id:string){
  try {
    await handleCreateSubtaskService(id);
  } catch (error) {
    //toast notification
    console.log(error);
  } finally {
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
  id: string,
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
