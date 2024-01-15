import { UserNotFoundException } from "@/exceptions/error";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import EmptyTodoList from "./(ui)/EmptyTodoList";
import { createTodo, getTodoList } from "@/lib/todo";
import { BsFilterCircleFill } from "react-icons/bs";
import { Chip, Input, Select, SelectItem } from "@nextui-org/react";
import siteConfig from "@/config/site";
import TaskPriority from "./(ui)/TaskPriority";

interface TodayProps {}

const Today: FunctionComponent<TodayProps> = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw new UserNotFoundException("The user is not present");
  let todo;
  try {
    todo = await getTodoList(session.user.id);
    if (!todo) todo = await createTodo("today", session.user.id);
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
      <div className="h-[40px] bg-gray-700 mt-5 rounded flex">
        {/* input section */}
        <div className="flex w-2/3">
          <Input
            className="w-full"
            type="text"
            placeholder="Add task..."
            classNames={{
              input: ["bg-transparent", "placeholder:text-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "h-auto",
                "bg-transparent",
                "dark:hover:bg-transparent",
                "dark:focus-within:bg-transparent",
              ],
            }}
          />
        </div>
        {/* filter | options section */}
        <div className="ml-2 flex w-1/3">
          <div className="flex w-1/2 items-center justify-center mx-1">
           <TaskPriority />
          </div>
          <div className="flex w-1/2 items-center justify-center mx-1">
           <TaskPriority />
          </div>
        </div>
      </div>
      <div className="">
        <span className="text-sm text-gray-700 mt-2">
          By default, tasks added here will be due today. Click + to add a task
        </span>
        {/* filter | add section */}
        <div></div>
      </div>
    </div>
  );
};

export default Today;
