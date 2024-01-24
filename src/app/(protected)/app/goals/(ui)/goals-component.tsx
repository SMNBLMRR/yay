"use client";
import {
  handleDeleteGoalAction,
  handleUpdateTodoStatusAction,
} from "@/actions/todo";
import { cn, priorityLabel } from "@/lib/utils";
import {
  Button,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input
} from "@nextui-org/react";
import { Goals } from "@prisma/client";
import { format } from "date-fns";
import { FunctionComponent, useTransition } from "react";
import { RiMoreFill } from "react-icons/ri";

interface GoalsProps {
  goals: any;
  disable?: boolean;
}

const Goals: FunctionComponent<GoalsProps> = ({ goals, disable = false }) => {
  const [, startTransition] = useTransition();

  const handleDeleteGoalFn = async (id: string) => {
    startTransition(async () => {
      await handleDeleteGoalAction(id);
    });
  };

  const HandleUpdateTodoStatus = async (id: number, payload: any) => {
    startTransition(async () => {
      await handleUpdateTodoStatusAction(id, payload);
    });
  };

  return (
    <>
      {goals.map((goal: Goals) => {
        return (
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
                  onClick={() =>
                    HandleUpdateTodoStatus(goal.id, { done: true })
                  }
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
                  isDisabled={disable}
                  className="w-full"
                  type="text"
                  defaultValue={goal.name}
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
                      actions
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="faded"
                    aria-label="Dropdown menu with icons"
                  >
                    <DropdownItem
                      key="copy"
                      shortcut="⌘C"
                      // startContent={<CopyDocumentIcon className={iconClasses} />}
                    >
                      Create a copy
                    </DropdownItem>
                    <DropdownItem
                      key="ExpirationData"
                      // startContent={<CopyDocumentIcon className={iconClasses} />}
                    >
                      Expiration data
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
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Goals;
