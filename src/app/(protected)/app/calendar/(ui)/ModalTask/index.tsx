import { useCalendarStore } from "@/store/calendar";
import FormInput, { Inputs } from "@/ui/Form/FormInput";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import { format, getYear, startOfMonth } from "date-fns";
import { FunctionComponent } from "react";
import { SubmitHandler } from "react-hook-form";

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
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  
  // const handleSubmit = async (e: any) => {
  //   const data = {
  //     name: taskValue,
  //   };
  //   e.preventDefault();
  //   let resp = await fetch("/api/task", {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   });
  //   console.log(resp);
  // };

  return (
    <Modal
      size="xl"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="!shadow-modal">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-0">
              <div className="">
                {format(day, "eeee")} {format(day, "dd")}
              </div>
              <div className="text-sm">
                {format(
                  startOfMonth(new Date(getYear(new Date()), trackerMonth)),
                  "MMMM yyyy"
                )}
              </div>
            </ModalHeader>
            <ModalBody>
              <FormInput name="name" onSubmit={onSubmit} isDatePickerVisible={false} />
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
