"use client";
import { ProjectProvider } from "@/context/projectContext/ProjectProvider";
import { TooltipProvider } from "./ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <ProjectProvider>{children}</ProjectProvider>
    </TooltipProvider>
  );
}
