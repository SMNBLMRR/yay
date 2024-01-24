import Link from "next/link";

export default function NotFound() {
  <main className="-mt-12 flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-3 px-6 text-center">
    <h1 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl xl:text-7xl">
      😢 <br /> Where are you going?
    </h1>
    <p className="max-w-[45ch] text-sm text-default-500 lg:text-base">
      Sorry, the page you are looking for does not exist.
    </p>
    <Link href="/" className="text-[#D1008A]">Go to homepage</Link>
  </main>;
}
