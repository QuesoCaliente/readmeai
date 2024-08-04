"use client";
import { ProjectProvider } from "@/context/projectContext/ProjectProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProjectProvider>{children}</ProjectProvider>;
}
