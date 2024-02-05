import { z } from "zod";
import { GoalPayload } from "@/types/todo";
import { Priority } from "@prisma/client";

export async function validateAddTodoGoal(payload: GoalPayload) {
  const schema = z
    .object({
      name: z.string().min(1),
      description: z.string().optional(),
      priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    })
    .strict();
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("error zod");
      console.log(error);
      //toast notification zod error
    } else {
      throw error;
    }
  }
}
