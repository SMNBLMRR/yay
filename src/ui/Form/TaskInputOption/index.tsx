import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Popover, PopoverContent, PopoverTrigger, User } from "@nextui-org/react";
import { FunctionComponent, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

interface TaskInputOptionProps {
  
}
 
const TaskInputOption: FunctionComponent<TaskInputOptionProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return ( 
    <>    
    <Popover
        placement="bottom"
        radius="sm"
        showArrow={true}
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        classNames={{
          base: ["h-[30px]", "dark:w-full", "w-[30px]"],
          trigger: [
            "h-auto",
            "dark:h-auto",
            "min-h-[30px]",
            "bg-[#0f0e0e]",
            "hover:bg-[#0f0e0e]",
            "hover:!bg-[#0f0e0e]",
            "dark:hover:!bg-[#0f0e0e]",
          ],
        }}
      >
        <PopoverTrigger className="">
          <div className="flex items-center justify-center px-2 rounded-lg">
            <BiDotsHorizontalRounded color="#B9B4FF" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <h1>ciao</h1>
        </PopoverContent>
      </Popover>
    </>
    
   );
}
 
export default TaskInputOption;