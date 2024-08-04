import { createContext, ReactNode, useContext, useState } from "react";

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
}

interface Project {
  id: string;
  name: string;
  description: string;
  github: string;
  image: string;
  technologies: string[];
}

interface ProjectProviderProps {
  children: ReactNode;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => useContext(ProjectContext);

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  function addProject(project: Project) {
    if (projects.some((p) => p.id === project.id)) {
      updateProject(project.id, project);
    } else {
      const { id, ...rest } = project;
      addProject({
        id: crypto.randomUUID(),
        ...rest,
      });
    }
  }
  function removeProject(id: string) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  }

  function updateProject(id: string, updatedProject: Project) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? updatedProject : project
      )
    );
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, removeProject }}>
      {children}
    </ProjectContext.Provider>
  );
}
