"use client";
import { Input } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginProps {}

type Inputs = {
  email: string;
};

const Login: FunctionComponent<LoginProps> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="h-[calc(100vh-64px)] w-full flex justify-center items-center">
      <div className="flex flex-col shadow-hero-img w-1/3 m-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input className="bg-[#b9b4ff]" variant="flat" {...register("email")} label="Email"/>
          {errors.email && <span>This field is required</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
