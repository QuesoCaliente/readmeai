"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import MultipleSelector, { Option } from "../MultiSelect";
import { IProject, useProject } from "@/context/projectContext/ProjectProvider";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "ai";
import { useEffect, useState } from "react";
import { GithubService } from "@/lib/githubService";

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  github: z.string(),
  image: z.string().optional(),
  technologies: z.array(z.string()),
  chat: z.array(z.object({})).optional(),
});

interface ProjectFormProps {
  project?: IProject | null;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const { addProject, selectedProject, handleProject } = useProject();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ?? {
      name: "",
      description: "",
      github: "",
      image: "",
      technologies: [],
      chat: [],
    },
  });

  function onSubmit(values: z.infer<typeof projectSchema>) {
    try {
      addProject({
        id: values.id!,
        name: values.name,
        description: values.description,
        github: values.github,
        technologies: values.technologies,
        image: values.image ?? "",
        chat: values.chat as Message[],
      });
      toast({
        title: "Proyecto creado",
        description: "Tu proyecto ha sido creado correctamente",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error al crear proyecto",
        description: "Hubo un error al crear tu proyecto",
        variant: "destructive",
      });
    }
  }

  const lang: Option[] = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next", value: "next" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Gatsby", value: "gatsby" },
    { label: "Sapper", value: "sapper" },
    { label: "Nest", value: "nest" },
    { label: "Express", value: "express" },
    { label: "Django", value: "django" },
    { label: "Flask", value: "flask" },
    { label: "FastAPI", value: "fastapi" },
    { label: "Laravel", value: "laravel" },
    { label: "Symfony", value: "symfony" },
    { label: "Rails", value: "rails" },
    { label: "Phoenix", value: "phoenix" },
    { label: "Spring", value: "spring" },
    { label: "Strapi", value: "strapi" },
    { label: "Keystone", value: "keystone" },
    { label: "Graphql", value: "graphql" },
    { label: "Apollo", value: "apollo" },
    { label: "Prisma", value: "prisma" },
    { label: "TypeORM", value: "typeorm" },
    { label: "Sequelize", value: "sequelize" },
    { label: "Mongoose", value: "mongoose" },
    { label: "PostgreSQL", value: "postgresql" },
    { label: "MySQL", value: "mysql" },
    { label: "MongoDB", value: "mongodb" },
    { label: "SQLite", value: "sqlite" },
    { label: "Redis", value: "redis" },
    { label: "Firebase", value: "firebase" },
    { label: "AWS", value: "aws" },
    { label: "Azure", value: "azure" },
    { label: "Google Cloud", value: "google-cloud" },
    { label: "Docker", value: "docker" },
    { label: "Kubernetes", value: "kubernetes" },
    { label: "Jenkins", value: "jenkins" },
    { label: "Github Actions", value: "github-actions" },
    { label: "Gitlab CI", value: "gitlab-ci" },
    { label: "Travis CI", value: "travis-ci" },
    { label: "Circle CI", value: "circle-ci" },
    { label: "Heroku", value: "heroku" },
    { label: "Vercel", value: "vercel" },
    { label: "Netlify", value: "netlify" },
    { label: "Digital Ocean", value: "digital-ocean" },
  ];

  const githubService = new GithubService();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Proyecto</FormLabel>
              <FormControl>
                <Input placeholder="ReadmeAi" {...field} />
              </FormControl>
              <FormDescription>El nombre de tu proyecto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del proyecto</FormLabel>
              <FormControl>
                <Input placeholder="Mi proyecto es..." {...field} />
              </FormControl>
              <FormDescription>
                Descripción detallada de tu proyecto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => {
            const { onChange, ...rest } = field;
            return (
              <FormItem>
                <FormLabel>Enlace repositorio Github</FormLabel>
                <FormControl>
                  <Input
                    onChange={async (e) => {
                      onChange(e);
                      const value = e.target.value;
                      setIsLoading(true);
                      const data =
                        await githubService.getOwnerAndRepositoryByUrl(value);
                      const languages =
                        await githubService.getRepositoryLanguages(
                          data.owner,
                          data.repo
                        );

                      const image = await fetch("/api/image", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          repository: value,
                        }),
                      }).then((res) => {
                        setIsLoading(false);
                        return res.text();
                      });
                      form.setValue("image", image);
                      form.setValue("technologies", Object.keys(languages));
                    }}
                    placeholder="https://github.com/QuesoCaliente/AssetBox"
                    {...rest}
                  />
                </FormControl>
                <FormDescription>
                  Tu url del repositorio de github
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tecnologias usadas</FormLabel>
              <MultipleSelector
                disabled={isLoading}
                value={field.value.map((v) => ({
                  label: v,
                  value: v,
                }))}
                defaultOptions={lang}
                onChange={(value) =>
                  form.setValue(
                    "technologies",
                    value.map((v) => v.value)
                  )
                }
                placeholder="Selecciona las tecnologías"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    No hay tecnologías disponibles
                  </p>
                }
              />
              <FormDescription>
                Selecciona las tecnologías que usaste en tu proyecto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          Guardar
        </Button>
      </form>
    </Form>
  );
}
