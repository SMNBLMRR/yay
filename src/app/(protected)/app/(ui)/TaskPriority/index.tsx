"use client";
import siteConfig from "@/config/site";
import { Select, SelectItem } from "@nextui-org/react";
import { FunctionComponent } from "react";

interface TaskPriorityProps {}

const TaskPriority: FunctionComponent<TaskPriorityProps> = () => {
  return (
    <>
      <Select
      radius="sm"
      placeholder="Priority"
      labelPlacement="outside"
      className="max-w-xs"
      disableSelectorIconRotation classNames={{
        base:["h-[30px]","dark:w-full","w-full"],
        trigger:["h-auto","dark:h-auto","min-h-[30px]","bg-[#0f0e0e]","hover:bg-[#0f0e0e]","hover:!bg-[#0f0e0e]","dark:hover:!bg-[#0f0e0e]"],
        innerWrapper:["h-auto","bg-[#0f0e0e]","hover:bg-[#0f0e0e]"],
        
      }}>
        {siteConfig.priorities.map((p) => (
          <SelectItem key={p.key} value={p.lvl}>
            {p.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default TaskPriority;
