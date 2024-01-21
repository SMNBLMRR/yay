"use server";
import { handleDeleteGoalById } from "@/app/services/todo";
import { revalidatePath } from "next/cache";

export async function handleDeleteGoal(data: any) {
  try {
    handleDeleteGoalById(data);
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/app/goals");
  }
}
