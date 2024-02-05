"use client";
import { Input } from "@nextui-org/react";
import { FunctionComponent } from "react";
import DatePicker from "../DatePicker";
import TaskInputOption from "../TaskInputOption";
import TaskPriority from "../TaskPriority";
import { cn } from "@/lib/utils";

export type Inputs = {
  [key: string]: string;
};

interface FormInputProps {
  name: string;
  register?: any;
  inputProps?: any;
  classNames?: any;
  isDatePickerVisible?: boolean;
}

const FormInput: FunctionComponent<FormInputProps> = ({
  name,
  register,
  inputProps,
  classNames,
  isDatePickerVisible = true,
}) => {
  const inputName = name as keyof Inputs;

  return (
    <div className="h-[40px] bg-[#1d1d1d] mt-5 rounded-lg flex border border-[#4a5562]">
      {/* input section */}
      <div className="flex w-full">
        <Input
          className="w-full"
          type="text"
          placeholder="Add task..."
          classNames={{
            mainWrapper: "over",
            input: ["bg-transparent", "w-full", ...(classNames?.input || [])],
            innerWrapper: [
              "bg-transparent",
              ...(classNames?.innerWrapper || []),
            ],
            inputWrapper:cn(
              "h-auto dark:focus:bg-transparent",
              "bg-transparent",
              "dark:hover:bg-transparent",
              "dark:focus-within:bg-transparent",
              ...(classNames?.inputWrapper || []),
            ),
          }}
          {...register(inputName as string, { required: true })}
          {...inputProps}
        />
      </div>
      {/* filter | options section */}
      <div className="ml-2 flex w-auto">
        <div className="flex flex-grow items-center justify-center mx-1">
          <TaskPriority register={register} />
        </div>
        {isDatePickerVisible ? (
          <div className="flex flex-grow items-center justify-center mx-1">
            <DatePicker register={register} name="date" />
          </div>
        ) : null}
        <div className="flex flex-grow items-center justify-center mx-1">
          <TaskInputOption />
        </div>
      </div>
    </div>
  );
};

export default FormInput;
