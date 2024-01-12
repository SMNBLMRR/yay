import Header from "@/ui/Header";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Header />
      <div className="w-2/3 h-[130vh] flex flex-col justify-center items-center m-auto">
        <div className="flex flex-col">
          <span className="text-center text-xl font-semibold text-[#b9b4ff] w-2/3 m-auto -mt-20 mb-5">
            Discover the art of intentional living as you effortlessly manage
            your tasks, organize your goals, and reclaim control over your time,
            all within a single, intuitive app."
          </span>
          <h1 className="text-[#b9b4ff] font-bold text-8xl text-center">
            Empowering Your Time, One Task at a Time. 🎉
          </h1>
          <Button
            size="lg"
            className="w-fit m-auto my-5 text-xl"
            color="secondary"
            variant="flat"
            as={Link}
            href="/login"
          >
            Try for free
          </Button>
        </div>
        <div className="flex flex-col w-full justify-center items-center mt-10">
          <Image
            className="rounded-3xl mt-6 shadow-hero-img"
            src="/main-page.svg"
            width={800}
            height={400}
            alt="main-image"
          />
        </div>
      </div>
    </>
  );
}
