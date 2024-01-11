import { InvalidAddTodoGoalException } from "@/app/exceptions/error";
import authOptions from "@/lib/authOptions";
import { addTodoGoal, getTodoList } from "@/lib/todo";
import { validateAddTodoGoal } from "@/schema/todo";
import { GoalPayload } from "@/types/todo";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function PUT(reques: Request) {
  let payload = (await reques.json()) as GoalPayload;
  if (!validateAddTodoGoal(payload))
    throw new InvalidAddTodoGoalException("Your data seems incorrect");

  const session = await getServerSession(authOptions);
  if (session?.user.id) {
    try {
      let todo = await getTodoList(session.user.id);
      let newGoal = await addTodoGoal(payload, todo.id);
      NextResponse.json(newGoal, { status: 201 });
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        {
          msg: "Bad request",
        },
        {
          status: 400,
        }
      );
    }
  }

  return NextResponse.json(
    {
      msg: "Todo not found error",
    },
    {
      status: 404,
    }
  );
}
