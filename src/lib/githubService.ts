import { IGithubOctokitRepository, IGithubRepository } from "./interface";
// import fileReader
// import { fileReader } from "./fileReader";

export class GithubService {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://api.github.com";
  }

  async getRepository(owner: string, repo: string): Promise<IGithubRepository> {
    const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`);
    return response.json();
  }

  async getOwnerAndRepositoryByUrl(
    url: string
  ): Promise<{ owner: string; repo: string }> {
    const [owner, repo] = url.split("/").slice(-2);
    return { owner, repo };
  }

  async getRepositoryLanguages(owner: string, repo: string): Promise<string[]> {
    const response = await fetch(
      `${this.baseUrl}/repos/${owner}/${repo}/languages`
    );
    return response.json();
  }

  async getFileRepository(owner: string, repo: string, path: string) {
    const response = await fetch(
      `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`
    );
    return response.json();
  }

  async createScreenshotRepository(repository: IGithubRepository) {
    const response = await fetch(
      `https://api.screenshotmachine.com?key=${process.env.SCREENSHOT_API_KEY}&url=${repository.homepage}&dimension=1024xfull&device=desktop`
    );

    // Convertir la respuesta en un buffer
    const buffer = await response.arrayBuffer();

    // Convertir el buffer a base64
    const base64Image = Buffer.from(buffer).toString("base64");

    // Retornar la imagen en base64 o hacer algo con ella
    return base64Image;
  }

  async getPublicAndPrivateRepositories() {
    const response = await fetch("/api/repositories");
    return response.json() satisfies Promise<IGithubOctokitRepository[]>;
  }
}
