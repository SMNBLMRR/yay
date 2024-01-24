import authOptions from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    let todo = await prisma.todo.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    if (todo) {
      const startDate = new Date("2024-01-01");
      const endDate = new Date("2024-01-31");
      let events = await prisma.goals.findMany({
        where: {
          todoId: todo?.id,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return NextResponse.json(events);
    }
  }
  return NextResponse.json({ msg: "nothing to print" });
}

