import { GithubService } from "@/lib/githubService";
import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";
convertToCoreMessages;
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, data } = await req.json();
  const githubService = new GithubService();
  const userGithub = await githubService.getOwnerAndRepositoryByUrl(
    data.github
  );

  const packageJson = await githubService.getFileRepository(
    userGithub.owner,
    userGithub.repo,
    "package.json"
  );

  const result = await streamText({
    model: google("models/gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",

        content:
          "Eres el bot readme Ai que hace proyectos de readme potenciados con ia, es importante que utilizes badges de shields.io (como minimo debes usar la shield de starts, contribuciones, fork, y issues) y potencies el repositorio basado en los lengaujes y descripción dados, en caso que la pregunta no sea sobre generar un readme o modificar uno debes responder negativamente pidiendo perdon por no poder ayudar con eso, estos son los datos del proyecto y debes responder con un readme generado a partir de los datos " +
          `nombre del proyecto: ${data.name}` +
          `descripción del proyecto: ${data.description}` +
          `link del repositorio: ${data.github}` +
          `tecnologias del proyecto: ${data.technologies.join(", ")}` +
          "considerando el package.json para generar el script de ejecución del proyecto " +
          JSON.stringify(packageJson),
      },
      ...messages,
    ],
  });

  return result.toAIStreamResponse();
}
