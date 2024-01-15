"use client";
import Header from "@/ui/Header";
import { Button, Divider, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface LoginProps {}

type Inputs = {
  email: string;
};

const Login: FunctionComponent<LoginProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-64px)] w-full flex justify-center items-center">
        <div className="flex flex-col w-1/4 m-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col">
              <Input
                label="Email"
                placeholder="Insert you email addresss..."
                classNames={{
                  label: [
                    "active:!text-black",
                    "dark:group-focus-within:!text-red-600",
                    "text-black",
                    "dark:!text-black",
                    "dark:group-data-[focus-within=true]:!text-black",
                  ],
                  input: [
                    "bg-transparent",
                    "dark:!text-red-900",
                    "text-red-900",
                    "placeholder:text-black",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "bg-[#b9b4ff]",
                    "dark:hover:bg-[#b9b4ff]",
                    "dark:focus-within:bg-[#b9b4ff]",
                  ],
                }}
                {...register("email")}
              />
            </div>
            <Button
              className="mt-5 border-[#b9b4ff] text-[#b9b4ff]"
              variant="bordered"
            >
              Continue with email
            </Button>
            {errors.email && <span>This field is required</span>}
          </form>
          <Divider className="my-10" />
          <Button
            onClick={() => {
              signIn("google", {
                callbackUrl: "/app",
              });
            }}
            className="mt-2"
            color="danger"
            variant="bordered"
            endContent={<FcGoogle size={20} />}
          >
            Continue with Google
          </Button>
          <Button
            className="mt-5"
            color="danger"
            variant="bordered"
            endContent={<FaApple size={20} />}
          >
            Continue with Apple
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
