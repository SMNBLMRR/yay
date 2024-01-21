"use server";
import authOptions from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function handleDeleteGoalById(todoId: number) {
  const session = await getServerSession(authOptions);
  if (session && todoId) {
    let todo = await prisma.todo.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    if (todo) {
      return await prisma.goals.deleteMany({
        where: {
          id: Number(todoId),
          todoId: todo.id,
        },
      });
    }
  }
}
