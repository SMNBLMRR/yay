"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { FunctionComponent } from "react";

interface TaskPriorityProps {
  register: any;
}

const TaskPriority: FunctionComponent<TaskPriorityProps> = ({ register }) => {
  return (
    <>
      <Select
        radius="sm"
        {...register("priority")}
        aria-label="select-priority"
        placeholder="Priority"
        labelPlacement="outside"
        className="max-w-xs text-white placeholder:text-white"
        classNames={{
          base: [
            "h-[30px]",
            "dark:w-full",
            "w-full",
            "text-white",
            "dark:text-white",
          ],
          trigger: [
            "h-auto",
            "dark:h-auto",
            "min-h-[30px]",
            "bg-[#0f0e0e]",
            "hover:bg-[#0f0e0e]",
            "hover:!bg-[#0f0e0e]",
            "dark:hover:!bg-[#0f0e0e]",
            "text-white",
            "dark:text-white",
          ],
          innerWrapper: [
            "w-[5rem]",
            "h-auto",
            "bg-[#0f0e0e]",
            "hover:bg-[#0f0e0e]",
            "text-white",
            "dark:text-white",
          ],
          value: ["text-[#B9B4FF]"],
          selectorIcon: ["text-[#B9B4FF]"],
        }}
      >
        <SelectItem
          key="LOW"
          classNames={{
            base: [
              "my-1 border border-[#06d6a0] dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent",
              "text-[#06d6a0] dark:hover:text-[#06d6a0] dark:focus:text-[#06d6a0]",
              "dark:hover:border-[#06d6a0] dark:focus:border-[#06d6a0]",
              "px-[10px]",
              "py-0.5",
            ],
            selectedIcon: ["hidden"],
          }}
        >
          LOW
        </SelectItem>
        <SelectItem
          key="MEDIUM"
          classNames={{
            base: [
              "my-1 border border-[#ffd60a] dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent",
              "text-[#ffd60a] dark:hover:text-[#ffd60a] dark:focus:text-[#ffd60a]",
              "dark:hover:border-[#ffd60a] dark:focus:border-[#ffd60a]",
              "px-[10px]",
              "py-0.5",
            ],
            selectedIcon: ["hidden"],
          }}
        >
          MEDIUM
        </SelectItem>
        <SelectItem
          key="HIGH"
          classNames={{
            base: [
              "my-1 border border-[#ff0054] dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent",
              "text-[#ff0054] dark:hover:text-[#ff0054] dark:focus:text-[#ff0054]",
              "dark:hover:border-[#ff0054] dark:focus:border-[#ff0054]",
              "px-[10px]",
              "py-0.5",
            ],
            selectedIcon: ["hidden"],
          }}
        >
          HIGH
        </SelectItem>
      </Select>
    </>
  );
};

export default TaskPriority;
