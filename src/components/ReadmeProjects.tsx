"use client";
import { Github } from "./customIcons/Github";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectForm from "./forms/ProjectForm";
import { IProject, useProject } from "@/context/projectContext/ProjectProvider";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Edit, EllipsisVertical, Import, Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { GithubService } from "@/lib/githubService";
import { Button } from "./ui/button";
import { IGithubOctokitRepository } from "@/lib/interface";
import { useUser } from "@clerk/nextjs";

export function ReadmeProjects() {
  const {
    projects,
    selectedProject,
    handleProject,
    removeProject,
    addProject,
  } = useProject();
  const githubService = new GithubService();
  const [openModal, setOpenModal] = useState(false);
  const [repositories, setRepositories] = useState<IGithubOctokitRepository[]>(
    []
  );
  const [editProject, setEditProject] = useState<IProject | null>(null);
  const { toast } = useToast();
  const user = useUser();
  return (
    <section className="lg:min-w-80 flex flex-col gap-8">
      <div className="flex gap-1.5">
        <Dialog onOpenChange={(open) => setOpenModal(open)} open={openModal}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditProject(null);
                setOpenModal(true);
              }}
            >
              <Github className="w-6 h-6 mr-2" />
              Nuevo proyecto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo Proyecto</DialogTitle>
              <DialogDescription>
                Crea un nuevo proyecto para generar un readme en segundos.
                Proporcionando información relevante permitiras generar un mejor
                resultado
              </DialogDescription>
            </DialogHeader>
            <ProjectForm project={editProject} />
          </DialogContent>
        </Dialog>
        <Dialog
          onOpenChange={(open) =>
            repositories.length > 0
              ? setRepositories([])
              : githubService
                  .getPublicAndPrivateRepositories()
                  .then((repositories) => setRepositories(repositories))
          }
          open={repositories.length > 0}
        >
          <DialogTrigger asChild>
            <Button
              disabled={!user?.isSignedIn}
              onClick={() => {
                githubService
                  .getPublicAndPrivateRepositories()
                  .then((repositories) => {
                    setRepositories(repositories);
                  });
              }}
            >
              <Import className="mr-2" />
              Importar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Elige un proyecto para importar</DialogTitle>
              <DialogDescription>
                Selecciona un proyecto de tu cuenta de Github para importar
              </DialogDescription>
            </DialogHeader>
            {repositories.length > 0 && (
              <ScrollArea className="max-h-[400px] overflow-y-auto">
                <ScrollBar />
                {repositories.map((repository) => (
                  <Card
                    key={repository.id}
                    onClick={() => {
                      const newProject: IProject = {
                        id: crypto.randomUUID(),
                        image: "",
                        name: repository.name,
                        description: repository.description,
                        github: repository.html_url,
                        technologies: [],
                        chat: [],
                      };
                      addProject(newProject);
                      handleProject(newProject);
                    }}
                    className="p-2 my-2 w-full border-l-4 border-t-0 border-b-0 border-r-0 border-primary-500 rounded-none bg-primary-50 hover:bg-primary-100 cursor-pointer"
                  >
                    <CardHeader className="flex p-0 flex-row items-center justify-between">
                      <CardDescription>{repository.name}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-500">
          Historial de proyectos
        </h2>
        <Separator className="my-2" />
        {projects.map((project) => (
          <Card
            key={project.id}
            onClick={(e) => {
              handleProject(project);
            }}
            className={`p-2 my-2 w-full border-l-4 border-t-0 border-b-0 border-r-0 border-primary-500 rounded-none bg-primary-50 hover:bg-primary-100  cursor-pointer ${
              selectedProject?.id === project.id && "bg-primary-100"
            }`}
          >
            <CardHeader className="flex p-0 flex-row items-center justify-between">
              <CardDescription>{project.name}</CardDescription>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical strokeWidth={1} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={(e) => {
                      setEditProject(project);
                      setOpenModal(true);
                    }}
                  >
                    <Edit className="mr-2" size={16} />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={(e) => {
                      removeProject(project.id);
                      toast({
                        title: "Proyecto eliminado",
                        description:
                          "El proyecto se ha eliminado correctamente",
                        variant: "destructive",
                      });
                    }}
                  >
                    <Trash2 className="mr-2" size={16} />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
