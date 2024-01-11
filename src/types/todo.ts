import { type Goals } from "@prisma/client"
export type GoalPayload = Omit<Goals, "id" | "todoId" | "createAt" | "updateAt">