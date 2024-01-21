import { Input } from "@nextui-org/react";
import { FunctionComponent } from "react";
import DatePicker from "../DatePicker";
import TaskInputOption from "../TaskInputOption";
import TaskPriority from "../TaskPriority";

export type Inputs = {
  [key: string]: string;
};

interface FormInputProps {
  register:any;
  name: string;
  inputProps?: any;
  classNames?: any;
  isDatePickerVisible?: boolean;
}

const FormInput: FunctionComponent<FormInputProps> = ({
  register,
  name,
  inputProps,
  classNames,
  isDatePickerVisible = true,
}) => {

  const inputName = name as keyof Inputs;
  return (
    <div className="h-[40px] bg-gray-700 mt-5 rounded flex">
      {/* input section */}
      <div className="flex w-full">
        <Input
          className="w-full"
          type="text"
          placeholder="Add task..."
          classNames={{
            input: [
              "bg-transparent",
              "placeholder:text-black",
              "w-full",
              ...(classNames?.input || []),
            ],
            innerWrapper: [
              "bg-transparent",
              ...(classNames?.innerWrapper || []),
            ],
            inputWrapper: [
              "h-auto",
              "bg-transparent",
              "dark:hover:bg-transparent",
              "dark:focus-within:bg-transparent",
              ...(classNames?.inputWrapper || []),
            ],
          }}
          {...register(inputName as string, { required: true })}
          {...inputProps}
        />
      </div>
      {/* filter | options section */}
      <div className="ml-2 flex w-auto">
        <div className="flex flex-grow items-center justify-center mx-1">
          <TaskPriority />
        </div>
        {isDatePickerVisible ? (
          <div className="flex flex-grow items-center justify-center mx-1">
            <DatePicker register={register} />
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
