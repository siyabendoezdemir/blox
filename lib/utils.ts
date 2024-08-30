import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Player = {
  home: string;
  territory: string[];
  flag?: string;
}

export type MapData = {
  home: string;
  territory: string[];
}