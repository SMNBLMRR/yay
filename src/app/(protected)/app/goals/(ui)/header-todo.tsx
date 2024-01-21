"use client";
import FormInput, { Inputs } from "@/ui/Form/FormInput";
import { Button } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface HeaderTodoProps {}

const HeaderTodo: FunctionComponent<HeaderTodoProps> = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="goal" register={register} />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            By default, tasks added here will be due today. Click + to add a
            task
          </span>
          {/* filter | add section */}
          <div className="flex my-2">
            <Button
              radius="sm"
              className="h-fit py-1 bg-transparent border border-[#F72585] text-[#F72585]"
            >
              Cancel
            </Button>
            <Button
              radius="sm"
              type="submit"
              className="h-fit py-1 ml-2 bg-[#06d6a0] border border-[#06d6a0] text-black"
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
