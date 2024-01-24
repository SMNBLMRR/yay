import { UserNotFoundException } from "@/exceptions/error";
import authOptions from "@/lib/authOptions";
import { getGoalsFromTodo, getTodoList } from "@/queries/todo";
import { getServerSession } from "next-auth";
import { FunctionComponent, Suspense } from "react";
import EmptyTodoList from "../(ui)/empty-todo-list";
import { Spinner } from "@nextui-org/react";
import Goals from "../goals/(ui)/goals-component";

interface CompletedProps {
  
}
 
const Completed: FunctionComponent<CompletedProps> = async () => {

  const session = await getServerSession(authOptions);
  if (!session) throw new UserNotFoundException("The user is not present");
  let todo, goals;
  try {
    todo = await getTodoList(session.user.id);
    if (todo) goals = await getGoalsFromTodo(todo.id,"desc",true);
  } catch (e) {
    console.log(e);
  }

  if (!todo) {
    return <EmptyTodoList />;
  }

  
  return ( 
    <>
    <div className="flex flex-col w-3/4 mx-auto p-10">
      <h1 className="text-5xl font-semibold text-[#B9B4FF]">Well done 🎉</h1>
      <h2 className="mt-2 text-[#F72585]">You've successfully completed the following tasks. Take a moment to celebrate your accomplishments.</h2>
      <Suspense fallback={<Spinner color="secondary" />}>
          <div className="my-4">
            <Goals disable={true} goals={goals} />
          </div>
        </Suspense>
      </div>
    </>
   );
}
 
export default Completed;