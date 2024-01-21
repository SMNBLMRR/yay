import { FunctionComponent } from "react";
import HeaderTodo from "./header-todo";
import { Button } from "@nextui-org/react";

interface TodoProps {}

const Todo: FunctionComponent<TodoProps> = () => {
  return (
    <>
      <HeaderTodo />
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">
          By default, tasks added here will be due today. Click + to add a task
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
            className="h-fit py-1 ml-2 bg-[#06d6a0] border border-[#06d6a0] text-black"
          >
            Add Task
          </Button>
        </div>
      </div>
    </>
  );
};

export default Todo;
