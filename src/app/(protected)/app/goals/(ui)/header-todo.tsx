"use client";
import { addGoalTodoAction } from "@/actions/todo";
import { GoalPayload } from "@/types/todo";
import FormInput from "@/ui/Form/FormInput";
import { Button } from "@nextui-org/react";
import { FunctionComponent, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface HeaderTodoProps {}

const HeaderTodo: FunctionComponent<HeaderTodoProps> = () => {
  const { handleSubmit, register } = useForm<GoalPayload>();
  const [, startTransition] = useTransition();
  const onSubmit: SubmitHandler<GoalPayload> = async (data) => {
    startTransition(async () => {
      await addGoalTodoAction(data as GoalPayload);
    });
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <FormInput register={register} name="name" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Press <span className="text-[#F72585]">Enter</span> or{" "}
            <span className="text-[#06d6a0]"> Add task </span> to create a new
            task
          </span>
          {/* filter | add section */}
          <div className="flex my-2">
            <Button
              radius="sm"
              type="submit"
              className="h-fit py-1 ml-2 border border-[#06d6a0] text-[#06d6a0] bg-transparent"
            >
              Add Task
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default HeaderTodo;
