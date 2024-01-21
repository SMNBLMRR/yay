"use client";
import { handleDeleteGoal } from "@/actions/todo";
import { FunctionComponent, useTransition } from "react";

interface GoalsProps {
  goals: any;
}

const Goals: FunctionComponent<GoalsProps> = ({ goals }) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteGoalFn = async (id: number) => {
    startTransition(async () => {
      await handleDeleteGoal(id);
    });
  };

  return (
    <>
      {goals.map((e: any, i: any) => {
        return (
          <div key={i} className="flex">
            <h1>{e.name}</h1>
            <button onClick={() => handleDeleteGoalFn(e.id)}>
              delete {e.id}
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Goals;
