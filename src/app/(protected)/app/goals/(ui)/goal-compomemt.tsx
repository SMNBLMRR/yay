"use client";

import {
  handleCreateSubtaskAction,
  handleDeleteGoalAction,
  handleUpdateTodoStatusAction,
} from "@/actions/todo";
import { cn, priorityLabel } from "@/lib/utils";
import YayDrawer from "@/ui/YayDrawer";
import {
  Button,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner,
} from "@nextui-org/react";
import { Goal } from "@prisma/client";
import { format } from "date-fns";
import { FunctionComponent, useRef, useState, useTransition } from "react";
import { PiInfoLight } from "react-icons/pi";
import { RiMoreFill } from "react-icons/ri";
import ModalGoal from "./modal-goal";

interface GoalProps {
  goal: Goal & { subTasks?: Goal[] };
  disable?: boolean;
}

const Goal: FunctionComponent<GoalProps> = ({ goal, disable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();
  const [isPendigDeleteTransaction, handleDeleteTransaction] = useTransition();
  const [isPendingUpdateTransition, handleUpdateTransition] = useTransition();
  const [isPendingCreateSubtask, handleCreateSubtaskTransition] =
    useTransition();
  const inputRef = useRef<HTMLInputElement>();

  const updateGoalOnBlur = async (id: string, payload: any) => {
    let initialValue = (inputRef.current as HTMLInputElement).getAttribute(
      "data-initial-value"
    );
    if (initialValue !== payload) {
      startTransition(async () => {
        await handleUpdateTodoStatusAction(id, payload);
      });
    }
  };

  const handleCreateSubtask = async (id: string) => {
    handleCreateSubtaskTransition(async () => {
      await handleCreateSubtaskAction(id);
    });
  };

  const handleDeleteGoalFn = async (id: string) => {
    handleDeleteTransaction(async () => {
      await handleDeleteGoalAction(id);
    });
  };

  const HandleUpdateTodoStatus = async (id: string, payload: any) => {
    handleUpdateTransition(async () => {
      await handleUpdateTodoStatusAction(id, payload);
    });
  };

  return (
    <>
      <div
        key={goal.id}
        className="flex w-full mt-3 border border-gray-600 px-2 py-0.5 rounded-lg"
      >
        <div className="h-[40px] flex items-center w-full justify-between">
          <div className="flex w-full items-center justify-center rounded-lg">
            <Checkbox
              isSelected={disable}
              checked={disable}
              isDisabled={disable}
              onClick={() => HandleUpdateTodoStatus(goal.id, { done: true })}
              name={goal.id.toString()}
              color="default"
              aria-label={goal.id.toString()}
              classNames={{
                wrapper: cn(
                  "after:group-data-[selected=true]:bg-[#4b5563] after:group-data-[selected=true]:bg-[#4b5563] after:data-[selected=true]:bg-[#4b5563]",
                  "group-data-[selected=true]:bg-[#4b5563] group-data-[selected=true]:bg-[#4b5563] data-[selected=true]:bg-[#4b5563]",
                  "dark:group-data-[selected=true]:bg-[#4b5563]",
                  "before:border-[#4b5563] data-[selected=true]:bg-[#4b5563]"
                ),
                base: cn(
                  "w-fit",
                  "inline-flex p-0",
                  "hover:items-center justify-start",
                  "cursor-pointer rounded-lg m-auto border-2 border-transparent"
                ),
                label: cn("w-fit bg-gray-100 border-red-700"),
              }}
            />
            <Input
              ref={inputRef as any}
              isDisabled={disable}
              data-initial-value={goal.name}
              className="w-full"
              type="text"
              onBlur={(e) =>
                updateGoalOnBlur(goal.id, {
                  name: (e.target as HTMLInputElement).value as string,
                })
              }
              defaultValue={goal.name as string}
              classNames={{
                input: [
                  "p-1 m-auto rounded-lg px-2 hover:bg-[#161616] bg-[#1d1d1d]",
                  "placeholder:text-black",
                  "w-full mr-2",
                ],
                innerWrapper: ["bg-transparent] p-0"],
                inputWrapper: [
                  "p-0",
                  "h-auto",
                  "bg-transparent",
                  "dark:hover:bg-transparent",
                  "dark:focus-within:bg-transparent",
                ],
              }}
            />
          </div>
        </div>
        {/* actions section */}
        <div className="flex items-center justify-center ">
          <div className="flex flex-col w-fit mx-1">
            <Chip
              isDisabled={disable}
              variant="solid"
              className={cn(
                "border px-3 py-0.5 rounded-lg bg-transparent ",
                priorityLabel[goal.priority]
              )}
            >
              {goal.priority}
            </Chip>
          </div>
          <div className="flex flex-col w-fit mx-2">
            <span className="text-gray-600 text-xs w-max">
              {format(goal.createdAt, "yyyy-MM-dd")}
            </span>
          </div>
          {!disable ? (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isDisabled={disable}
                  radius="sm"
                  disabled={true}
                  startContent={
                    <RiMoreFill className="w-[20px] bg-[#fb5607] rounded" />
                  }
                  className="h-fit py-1 px-2 border border-[#fb5607] ml-2 bg-transparent"
                >
                  more
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with icons"
              >
                <DropdownItem
                  textValue="more info"
                  key="more"
                  endContent={<PiInfoLight size={20} />}
                  onClick={() =>  console.log("ciao")}
                >
                  <button>Task info</button>
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  shortcut="⌘C"
                  // startContent={<CopyDocumentIcon className={iconClasses} />}
                >
                  Create a copy
                </DropdownItem>
                <DropdownItem
                  key="subtask"
                  onClick={() => handleCreateSubtask(goal.id)}
                  // startContent={<CopyDocumentIcon className={iconClasses} />}
                >
                  Create sub-task
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  variant="flat"
                  key="delete"
                  shortcut="⌘D"
                  onClick={() => handleDeleteGoalFn(goal.id.toString())}
                  //startContent={<AddNoteIcon className={iconClasses} />}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : null}
          {isPendigDeleteTransaction ? (
            <>
              <Spinner
                className="ml-2"
                classNames={{
                  circle1: cn("border-b-[#fb5607]"),
                  circle2: cn("border-[#fb5607]"),
                }}
                size="sm"
              />
            </>
          ) : null}
        </div>
        {/* <ModalGoal isOpen={true} goal={goal} /> */}
        {/* {isOpen && (
          <YayDrawer setIsOpen={setIsOpen} isOpen={isOpen} goal={goal} />
        )} */}
      </div>
      {/* {goal.subTasks && goal.subTasks.length > 0 ? (
        goal.subTasks.map((g:Goal) => {
          {console.log("INSIDE THE MAP",goal.subTasks)}
          return <Goal goal={g} key={g.id} />
        })
      ) : null} */}
    </>
  );
};

export default Goal;
