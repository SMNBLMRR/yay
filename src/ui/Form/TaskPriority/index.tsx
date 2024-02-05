"use client";
import { cn } from "@/lib/utils";
import { Select, SelectItem } from "@nextui-org/react";
import { FunctionComponent } from "react";

interface TaskPriorityProps {
  register: any;
}

const TaskPriority: FunctionComponent<TaskPriorityProps> = ({ register }) => {
  return (
    <>
      <Select
        {...register("priority")}
        aria-label="select-priority"
        placeholder="Priority"
        labelPlacement="outside"
        className="max-w-xs text-white placeholder:text-white"
        classNames={{
          popoverContent: ["bg-[#b7b7b7] rounded-[5px]"],
          trigger: [
            "rounded-[5px]",
            "h-auto",
            "min-h-[30px]",
            "bg-[#b7b7b7]",
            "dark:hover:!bg-[#b7b7b7]",
            "text-black",
          ],
          innerWrapper: [
            "w-[5rem]",
            "h-auto",
            "bg-[#b7b7b7]",
            "hover:bg-[#b7b7b7]",
            "text-black",
            "dark:text-black",
          ],
          value: ["text-black dark:text-black group-data-[has-value=true]:text-black"],
          selectorIcon: ["text-black"],
        }}
      >
        <SelectItem
          textValue="LOW"
          key="LOW"
          disableAnimation
          classNames={{
            // #06d6a0
            base: [
              "my-1 border border-black dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent",
              "text-black dark:hover:text-black dark:focus:text-black",
              "px-[10px]",
              "py-0.5",
            ],
            selectedIcon: ["hidden"],
          }}
        >
          <div className="flex items-center justify-between">
            <span>LOW</span>
            <span className="w-2 h-2 block relative bg-[#06d6a0] rounded-full"></span>
          </div>
        </SelectItem>
        <SelectItem
          textValue="MEDIUM"
          key="MEDIUM"
          disableAnimation
          classNames={{
            // #ffd60a
            base: [
              "my-1 border border-black dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent",
              "text-black dark:hover:text-black dark:focus:text-black",
              "px-[10px]",
              "py-0.5",
            ],
            selectedIcon: ["hidden"],
          }}
        >
          <div className="flex items-center justify-between">
            <span>MEDIUM</span>
            <span className="w-2 h-2 block relative bg-[#ffd60a] rounded-full"></span>
          </div>
        </SelectItem>
        <SelectItem
          textValue="HIGH"
          key="HIGH"
          disableAnimation
          classNames={{
            // #ff0054
            base: [
              "my-1 border border-black dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent",
              "text-black dark:hover:text-black dark:focus:text-black",
              "px-[10px]",
              "py-0.5",
            ],
            selectedIcon: ["hidden"],
          }}
        >
          <div className="flex items-center justify-between">
            <span>HIGH</span>
            <span className="w-3 h-3 block relative bg-[#ff0054] rounded-full"></span>
          </div>
        </SelectItem>
      </Select>
    </>
  );
};

export default TaskPriority;
