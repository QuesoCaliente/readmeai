import { projectSchema } from "@/components/forms/ProjectForm";
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from "@/lib/utils";
import { Message } from "ai";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProjectContextType {
  projects: IProject[];
  addProject: (project: IProject) => void;
  removeProject: (id: string) => void;
  selectedProject: IProject | null;
  handleProject: (project: IProject | null) => void;
  updateProject: (id: string, project: IProject) => void;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  github: string;
  image: string;
  technologies: string[];
  chat: Message[];
}

interface ProjectProviderProps {
  children: ReactNode;
}

const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  addProject: () => {},
  removeProject: () => {},
  updateProject: () => {},
  selectedProject: {
    id: "",
    name: "",
    description: "",
    github: "",
    image: "",
    technologies: [],
    chat: [],
  },
  handleProject: () => {},
});

export const useProject = () => useContext(ProjectContext);

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  useEffect(() => {
    setProjects(getProjectsFromLocalStorage());
  }, []);

  function handleProject(newProject: IProject | null) {
    setSelectedProject(newProject);
  }

  function addProject(project: IProject) {
    if (projects.some((p) => p.id === project.id)) {
      updateProject(project.id, project);
    } else {
      const { id, ...rest } = project;
      setProjects((prevProjects) => {
        const newProject: IProject = { id: crypto.randomUUID(), ...rest };
        setProjectsToLocalStorage([
          ...(prevProjects as unknown as (typeof projectSchema)[]),
          newProject as unknown as typeof projectSchema,
        ]);
        return [...prevProjects, { id: crypto.randomUUID(), ...rest }];
      });
    }
  }
  function removeProject(id: string) {
    setProjectsToLocalStorage(
      projects.filter(
        (project) => project.id !== id
      ) as unknown as (typeof projectSchema)[]
    );
    console.log(projects.filter((project) => project.id !== id));
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
    setSelectedProject(null);
  }

  function updateProject(id: string, updatedProject: IProject) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        const newProject = project.id === id ? updatedProject : project;
        setProjectsToLocalStorage(
          prevProjects as unknown as (typeof projectSchema)[]
        );
        return newProject;
      })
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        removeProject,
        selectedProject,
        handleProject,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
