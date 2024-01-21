"use client";
import { addGoalTodoAction } from "@/actions/todo";
import { useCalendarStore } from "@/store/calendar";
import { GoalPayload } from "@/types/todo";
import FormInput from "@/ui/Form/FormInput";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { format, getYear, startOfMonth } from "date-fns";
import { FunctionComponent, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm<GoalPayload>();
  const [, startTransition] = useTransition();

  const onSubmit: SubmitHandler<GoalPayload> = async (data) => {
    startTransition(async () => {
      await addGoalTodoAction(data as GoalPayload);
    });
  };

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
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <FormInput
                  name="name"
                  register={register}
                  isDatePickerVisible={false}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  className="bg-[#b8b4ff] text-black"
                  onPress={onClose}
                >
                  Add task
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalTask;
