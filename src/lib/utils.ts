import { Priority } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const priorityLabel = {
  "LOW":"border-[#06d6a0] text-[#06d6a0]",
  "MEDIUM": "border-[#ffd60a] text-[#ffd60a]",
  "HIGH": "border-[#ff0054] text-[#ff0054]"
}

export const priorityLabelBg = {
  "LOW":"bg-[#06d6a0]",
  "MEDIUM": "bg-[#ffd60a]",
  "HIGH": "bg-[#ff0054]"
}
