import { cn, priorityLabelBg } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  Chip,
  Divider,
  Input,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { FunctionComponent } from "react";
import { CiEdit } from "react-icons/ci";
import { RiMoreFill } from "react-icons/ri";

interface ModalGoalProps {
  goal: any;
  isOpen: boolean;
}

const ModalGoal: FunctionComponent<ModalGoalProps> = ({ goal, isOpen }) => {
  return (
    <>
      <Modal
      placement="top" isOpen={true}  size="3xl"
      // classNames={{
      //   backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      // }}
      >
        <ModalContent className="">
          {(onClose) => (
            <div className="min-h-[60vh]">
              <span className="text-black mx-2">
                {goal.parentTaskId ? "indietro" : null}
              </span>
              <div className="p-4 flex-1 h-full outline-none">
                <div className="max-w-lg mx-auto outline-none flex flex-col justify-start items-center">
                  <div className="flex justify-end w-full">
                    <span
                      className={cn(
                        "w-3 h-3 block relative rounded-full mx-2",
                        priorityLabelBg[goal.priority]
                      )}
                    ></span>
                  </div>
                  <div className="font-medium text-3xl mb-2 mt-2 text-black outline-none w-full">
                    <Input
                      radius="none"
                      startContent={<CiEdit size={20} />}
                      classNames={{
                        input: [
                          "p-1 text-xl rounded-lg m-auto px-2 hover:bg-transparent bg-transparent",
                          "placeholder:text-black",
                          "w-full mr-2",
                          "group[data-has-value=true] group-data-[has-value=true]:text-black",
                        ],
                        innerWrapper: ["bg-transparent] p-0"],
                        base: ["text-black"],
                        inputWrapper: [
                          "p-0",
                          "h-auto",
                          "bg-transparent",
                          "dark:hover:bg-transparent",
                          "dark:focus-within:bg-transparent",
                          "shadow-none",
                        ],
                      }}
                      defaultValue={goal.name}
                    />
                  </div>
                  <h1>{goal.name}</h1>

                  {/* descriptio */}
                  <span className="w-full text-black text-start">
                    Add a description{" "}
                    <span className="bg-blue rounded-full relative w-3 h-3">
                      +
                    </span>
                  </span>

                  <div className="flex flex-col w-full justify-start items-center">
                    <span className="text-[#F72585] w-full px-1 mt-2 mb-1 text-sm">
                      change priority
                    </span>
                    <div className="block items-center w-full mt-1">
                      {/* <span className="text-black w-full px-1">Priority</span> */}
                      {Object.keys(priorityLabelBg).map((p) => {
                        return (
                          <Chip
                            radius="sm"
                            className={cn(
                              "mr-2 border border-gray-600 hover:opacity-[0.7] cursor-pointer",
                              priorityLabelBg[p]
                            )}
                            key={p}
                          >
                            {p}
                          </Chip>
                        );
                      })}
                    </div>
                  </div>

                  <Divider className="mt-2 bg-[#989899]"></Divider>

                  <div className="w-full mt-5">
                    <Accordion className="!px-0 ">
                      <AccordionItem
                        className="text-black px-0"
                        classNames={{
                          indicator:
                            "mx-2 p-1 rounded-full bg-black text-white",
                          titleWrapper: "px-0",
                          content: "!text-black px-0",
                          title: "!text-black px-2",
                          trigger: "!text-black px-0 py-1",
                          base: "p-0 border border-black rounded",
                        }}
                        key="1"
                        aria-label="Accordion 1"
                        startContent={
                          <div className="flex mx-2 justify-center items-center">
                            <span>Sub-task</span>
                            <Chip
                              size="sm"
                              radius="sm"
                              className="mx-2 px-1 bg-transparent border border-[#9455d3] text-[#9455d3]"
                            >
                              {Array.isArray(goal.subTasks) &&
                              goal.subTasks.length > 0
                                ? goal.subTasks.length
                                : null}
                            </Chip>
                          </div>
                        }
                      >
                        {Array.isArray(goal.subTasks) &&
                        goal.subTasks.length > 0 ? (
                          <>
                            {goal.subTasks.map((g: Goal) => {
                              return (
                                <div key={g?.id} className="flex items-center">
                                  <div
                                    // onClick={() => setSelectedGoal(g)}
                                    className="w-full px-2 m-2 border border-black rounded flex justify-between items-center"
                                  >
                                    <span className="flex items-center justify-center">
                                      {g.name}{" "}
                                      <span
                                        className={cn(
                                          "w-2 h-2 rounded-full block relative ml-2",
                                          priorityLabelBg[g.priority]
                                        )}
                                      ></span>
                                    </span>
                                    <div>
                                      <RiMoreFill className="w-[20px] bg-[#fb5607] rounded" />
                                    </div>
                                  </div>
                                  <div className="pr-2">
                                    <Chip
                                      size="sm"
                                      className="rounded bg-red-600"
                                    >
                                      delete
                                    </Chip>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : null}
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalGoal;
