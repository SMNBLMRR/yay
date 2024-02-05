"use client";
import { addGoalTodoAction } from "@/actions/todo";
import { cn } from "@/lib/utils";
import { GoalPayload } from "@/types/todo";
import FormInput from "@/ui/Form/FormInput";
import { Button, Spinner } from "@nextui-org/react";
import { FunctionComponent, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface HeaderTodoProps {}

const HeaderTodo: FunctionComponent<HeaderTodoProps> = () => {
  const { handleSubmit, register } = useForm<GoalPayload>();
  const [isPendingAddTodo, addGoalTransaction] = useTransition();
  const onSubmit: SubmitHandler<GoalPayload> = async (data) => {
    addGoalTransaction(async () => {
      let result = await addGoalTodoAction(data as GoalPayload);
      console.log(result);
      if(result?.error){
        toast.error("Error adding todo",{
          icon:"❌",
          style: {
            backgroundColor:"#b7b7b7",
            height:"fit-content",
            border: '1px solid #713200',
            color: '#713200',
          },
        })
        return;
      } 
      toast.success("Successfully added",{
        icon:"✅",
        style: {
          backgroundColor:"#b7b7b7",
          height:"fit-content",
          border: '1px solid #713200',
          color: '#713200',
        },
      })
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
              <div className="flex justify-between items-center">
                <span>Add Task</span>

                {isPendingAddTodo ? (
                  <Spinner
                    className="ml-2"
                    classNames={{
                      circle1: cn("border-b-[#06d6a0]"),
                      circle2: cn("border-[#06d69e4e]"),
                    }}
                    size="sm"
                  />
                ) : null}
              </div>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default HeaderTodo;
