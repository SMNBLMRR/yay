"use client";
import FormInput, { Inputs } from "@/ui/Form/FormInput";
import { FunctionComponent } from "react";
import { SubmitHandler } from "react-hook-form";

interface HeaderTodoProps {
  
}
 
const HeaderTodo: FunctionComponent<HeaderTodoProps> = () => {

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return ( 
    <>
      <FormInput name="goal" onSubmit={onSubmit} />
    </>
   );
}
 
export default HeaderTodo;