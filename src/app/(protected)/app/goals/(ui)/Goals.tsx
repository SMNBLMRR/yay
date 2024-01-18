"use client";
import { Todo } from "@prisma/client";
import { FunctionComponent } from "react";

interface GoalsProps {
  goals:any
}
 
const Goals: FunctionComponent<GoalsProps> = ({goals}) => {
  console.log(goals);
  return ( 
    <>
    </>
   );
}
 
export default Goals;