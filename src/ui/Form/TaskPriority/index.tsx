"use client";
import siteConfig from "@/config/site";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import { FunctionComponent } from "react";

interface TaskPriorityProps {}

const TaskPriority: FunctionComponent<TaskPriorityProps> = () => {
  return (
    <>
      <Select
        radius="sm"
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
          selectorIcon:["text-[#B9B4FF]"]
        }}
      >
        {siteConfig.priorities.map((p) => {
          let c = p.color;
          console.log("bg-red-700")
          console.log(c);
          return (
            <SelectItem
              classNames={{
                base: [c, `dark:hover${p.color}`],
              }}
              key={p.key}
              value={p.lvl}
            >
              {p.label}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
};

export default TaskPriority;
