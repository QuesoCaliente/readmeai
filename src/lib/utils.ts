import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { projectSchema } from "@/components/forms/ProjectForm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProjectsFromLocalStorage() {
  if (typeof window !== "undefined") {
    const projects = localStorage.getItem("projects");
    return projects ? JSON.parse(projects) : [];
  }
  return [];
}

export function setProjectsToLocalStorage(projects: (typeof projectSchema)[]) {
  localStorage.setItem("projects", JSON.stringify(projects));
}
