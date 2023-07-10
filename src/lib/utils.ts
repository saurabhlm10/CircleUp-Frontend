import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import { string } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
