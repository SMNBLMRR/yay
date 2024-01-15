import { type User } from "@prisma/client"
export type UserType = Omit<User, "id" | "email" | "password" | "emailVerified">