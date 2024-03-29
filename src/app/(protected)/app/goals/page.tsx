import { UserNotFoundException } from "@/exceptions/error";
import authOptions from "@/lib/authOptions";
import { getGoalsFromTodo, getTodoList } from "@/queries/todo";
import { Chip, Divider, Spinner } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { FunctionComponent, Suspense } from "react";
import { BsFilterCircleFill } from "react-icons/bs";
import EmptyTodoList from "../(ui)/empty-todo-list";
import Goals from "./(ui)/goals-component";
import HeaderTodo from "./(ui)/header-todo";

interface TodayProps {}

const Today: FunctionComponent<TodayProps> = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw new UserNotFoundException("The user is not present");
  let todo, goals;
  try {
    todo = await getTodoList(session.user.id);
    if (todo) goals = await getGoalsFromTodo(todo.id, "desc");
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
              size="sm"
              variant="flat"
              color="secondary"
              radius="sm"
              className="mx-3 px-2 border border-[#9455d3] bg-transparent"
            >
              {goals ? goals.length : 0}
            </Chip>
          </div>
          <div>
            <BsFilterCircleFill color="yellow" />
          </div>
        </div>
      </div>
      <HeaderTodo />
      {Array.isArray(goals) && goals?.length > 0 ? (
        <Divider className="bg-[#1d1d1d]" orientation="horizontal" />
      ) : null}
      <Suspense fallback={<Spinner color="secondary" />}>
        <div className="my-4">
          <Goals goals={goals} />
        </div>
      </Suspense>
    </div>
  );
};

export default Today;
