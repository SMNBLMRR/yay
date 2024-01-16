import { useCalendarStore } from "@/store/calendar";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { format, getYear, startOfMonth, startOfWeek } from "date-fns";
import { FunctionComponent, useState } from "react";
import TaskPriority from "../../../(ui)/TaskPriority";

interface ModalTaskProps {
  isOpen: any;
  onOpenChange: any;
  day: string;
}

const ModalTask: FunctionComponent<ModalTaskProps> = ({
  isOpen,
  onOpenChange,
  day,
}) => {
  const { trackerMonth } = useCalendarStore();
  const [taskValue, setTaskValue] = useState("");

  const handleSubmit = async (e: any) => {
    const data = {
      name: taskValue,
    };
    e.preventDefault();
    let resp = await fetch("/api/task", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    console.log(resp);
  };

  return (
    <Modal
      size="xl"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="">{format(day, "eeee")}</div>
              <div className="text-sm">
                {format(
                  startOfMonth(new Date(getYear(new Date()), trackerMonth)),
                  "MMMM yyyy"
                )}
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="h-[40px] bg-gray-700 mt-5 rounded flex">
                {/* input section */}
                <div className="flex w-1/2">
                  <form onSubmit={handleSubmit}>
                    <Input
                      className="w-full"
                      type="text"
                      onChange={(e) => setTaskValue(e.target.value)}
                      value={taskValue}
                      placeholder="Add task..."
                      classNames={{
                        input: ["bg-transparent", "placeholder:text-black"],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                          "h-auto",
                          "bg-transparent",
                          "dark:hover:bg-transparent",
                          "dark:focus-within:bg-transparent",
                        ],
                      }}
                    />
                  </form>
                </div>
                {/* filter | options section */}
                <div className="ml-2 flex w-1/2">
                  <div className="flex w-1/2 items-center justify-center mx-1">
                    <TaskPriority />
                  </div>
                  <div className="flex w-1/2 items-center justify-center mx-1">
                    <TaskPriority />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button className="bg-[#b8b4ff] text-black" onPress={onClose}>
                Add task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalTask;
