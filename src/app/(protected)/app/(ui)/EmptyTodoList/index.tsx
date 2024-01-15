import { FunctionComponent } from "react";

interface EmptyTodoListProps {
  
}
 
const EmptyTodoList: FunctionComponent<EmptyTodoListProps> = () => {
  return ( 
    <main className="-mt-12 flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-3 px-6 text-center w-full">
      <h1 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl xl:text-7xl">
        🧐<br /> No todo lists
      </h1>
      <p className="max-w-[45ch] text-sm text-default-500 lg:text-base">
        {/* it seems that you have deleted all the to do lists, I expect you have finished what you had to do... however in case you would like to recreate one <span className="font-extrabold text-[#D1008A]">click here</span> */}
        At the moment you don't have any list saved on ur profile, please <span className="font-extrabold text-[#D1008A]">click here</span> or press cmd + n
      </p>
    </main>
   );
}
 
export default EmptyTodoList;