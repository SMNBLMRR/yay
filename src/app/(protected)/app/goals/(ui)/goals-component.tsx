"use client";
import { Goal as GoalTye } from "@prisma/client";
import { FunctionComponent } from "react";
import Goal from "./goal-compomemt";

interface GoalsProps {
  goals: any;
  disable?: boolean;
}

const Goals: FunctionComponent<GoalsProps> = ({ goals, disable = false }) => {
  return (
    <>
      {Array.isArray(goals) &&
        goals.length > 0 &&
        goals.map((goal: GoalTye) => {
          return <Goal key={goal.id} goal={goal} disable={disable} />;
        })}
    </>
  );
};

export default Goals;
