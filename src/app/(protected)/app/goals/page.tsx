import { Button, Chip } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { BsFilterCircleFill } from "react-icons/bs";
import HeaderTodo from "./(ui)/HeaderTodo";
import { getServerSession } from "next-auth";
import { UserNotFoundException } from "@/exceptions/error";
import authOptions from "@/lib/authOptions";
import { createTodo, getGoalsFromTodo, getTodoList } from "@/lib/todo";
import EmptyTodoList from "../(ui)/EmptyTodoList";
import Goals from "./(ui)/Goals";

interface TodayProps {}

const Today: FunctionComponent<TodayProps> = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw new UserNotFoundException("The user is not present");
  let todo,goals;
  try {
    todo = await getTodoList(session.user.id);
    if (!todo){
      todo = await createTodo("today", session.user.id);
    } 
    goals = await getGoalsFromTodo(todo.id);
  } catch (e) {
    console.log(e);
  }

  if (!todo) {
    return <EmptyTodoList />;
  }


  return (
    <div className="flex flex-col w-3/4 mx-auto p-10">
      <div className="flex justify-between w-full relative h-fit items-center">
        <div>
          <span className="text-[#B9B4FF]">
            What do you need to get done today? 🤔
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <Chip
              // endContent={<NotificationIcon size={18} />}
              variant="flat"
              color="secondary"
              className="mx-3"
            >
              22
            </Chip>
          </div>
          <div>
            <BsFilterCircleFill color="yellow" />
          </div>
        </div>
      </div>
      <HeaderTodo />
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">
          By default, tasks added here will be due today. Click + to add a task
        </span>
        {/* filter | add section */}
        <div className="flex my-2">
          <Button radius="sm" className="h-fit py-1 bg-transparent border border-[#F72585] text-[#F72585]">Cancel</Button>
          <Button radius="sm" className="h-fit py-1 ml-2 bg-[#06d6a0] border border-[#06d6a0] text-black">Add Task</Button>
        </div>
      </div>

      <Goals goals={goals} />
    </div>
  );
};

export default Today;
