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
        className="rounded-[5px]"
        showArrow={true}
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        classNames={{
          base: ["h-[30px]", "dark:w-full", "w-[30px]"],
          trigger: [
            "rounded-[5px]",
            "h-auto",
            "dark:h-auto",
            "min-h-[30px]",
            "bg-[#b7b7b7]",
            "hover:bg-[#b7b7b7]",
            "hover:!bg-[#b7b7b7]",
            "dark:hover:bg-[#b7b7b7]",
          ],
        }}
      >
        <PopoverTrigger >
          <div className="flex items-center justify-center px-2">
            <BiDotsHorizontalRounded color="black" />
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