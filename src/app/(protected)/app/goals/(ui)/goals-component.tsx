"use client";
import { handleDeleteGoalAction } from "@/actions/todo";
import { cn } from "@/lib/utils";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Todo } from "@prisma/client";
import { FunctionComponent, useState, useTransition } from "react";

import { TiDeleteOutline } from "react-icons/ti";
import { RiMoreFill } from "react-icons/ri";

interface GoalsProps {
  goals: any;
}

const Goals: FunctionComponent<GoalsProps> = ({ goals }) => {
  const [, startTransition] = useTransition();
  const [starColor, setStarColor] = useState(false);
  const handleDeleteGoalFn = async (id: string) => {
    startTransition(async () => {
      await handleDeleteGoalAction(id);
    });
  };

  return (
    <>
      {goals.map((goal: Todo) => {
        return (
          <div key={goal.id} className="flex w-full mt-5">
            <div className="h-[40px] flex items-center w-full justify-between">
              <div className="flex w-full items-center justify-center rounded-lg">
                <Checkbox
                  name={goal.id}
                  color="default"
                  aria-label={goal.id}
                  classNames={{
                    wrapper: cn(
                      "after:group-data-[selected=true]:bg-[#b9b4ff] after:group-data-[selected=true]:bg-[#b9b4ff] after:data-[selected=true]:bg-[#b9b4ff]",
                      "group-data-[selected=true]:bg-[#b9b4ff] group-data-[selected=true]:bg-[#b9b4ff] data-[selected=true]:bg-[#b9b4ff]",
                      "dark:group-data-[selected=true]:bg-[#b9b4ff]",
                      "before:border-[#b9b4ff] data-[selected=true]:bg-[#b9b4ff]"
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
                  className="w-full"
                  type="text"
                  value={goal.name}
                  classNames={{
                    input: [
                      "p-1 m-auto rounded-lg px-2 hover:bg-[#121212] border-2 border-[#1d1d1d]",
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
            <div className="ml-2 flex items-center justify-center ">

              <div className="flex flex-col w-fit">
                <span>created At</span>

              </div>

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    radius="sm"
                    startContent={<RiMoreFill />}
                    className="h-fit py-1 px-2 bg-[#fb5607]"
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
                  color="danger"
                  variant="flat"
                    key="delete"
                    shortcut="⌘D"
                    onClick={() => handleDeleteGoalFn(goal.id)}
                    //startContent={<AddNoteIcon className={iconClasses} />}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Goals;
