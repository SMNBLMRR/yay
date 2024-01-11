import { z } from "zod";
import { GoalPayload } from "@/types/todo";

export async function validateAddTodoGoal(payload:GoalPayload) {
  const schema = z.object({
    name:z.string().min(1),
    description:z.string()
  }).strict()
  return schema.parse(payload);
}