import { InvalidAddTodoGoalException } from "@/exceptions/error";
import authOptions from "@/lib/authOptions";
import { addTodoGoal, getTodoList } from "@/lib/todo";
import { validateAddTodoGoal } from "@/schema/todo";
import { GoalPayload } from "@/types/todo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PUT(reques: Request) {
  let payload = (await reques.json()) as GoalPayload;
  if (!validateAddTodoGoal(payload))
    throw new InvalidAddTodoGoalException("Your data seems incorrect");

  const session = await getServerSession(authOptions);
  if (session?.user.id) {
    try {
      let todo = await getTodoList(session.user.id);
      console.log("this is the todo",todo);
      let newGoal;
      if(todo) newGoal = await addTodoGoal(payload, todo.id);
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

export async function GET(req:NextRequest){
  const session = await getServerSession(authOptions);
  if(session){
    let todo = await prisma.todo.findFirst({
      where:{
        userId:session.user.id
      }
    })
    if(todo){
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');
      let events = await prisma.goals.findMany({
        where:{
          todoId:todo?.id,
          createdAt:{
            gte: startDate, 
            lte: endDate, 
          }
        },
      })
      console.log(events);
      return NextResponse.json(events)
    }
  }
  return NextResponse.json({msg:"nothing to print"})
}

