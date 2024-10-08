import { GithubService } from "@/lib/githubService";

export async function POST(req: Request) {
  //   body
  const body = await req.json();
  const githubService = new GithubService();
  const userGithub = await githubService.getOwnerAndRepositoryByUrl(
    body.repository
  );
  const githubRepository = await githubService.getRepository(
    userGithub.owner,
    userGithub.repo
  );
  if (!githubRepository.homepage) {
    return new Response("", {
      headers:{
        "Content-Type": "text/plain",
      }
    })
  }
  const imageBase64 = githubRepository.homepage
    ? await githubService.createScreenshotRepository(githubRepository)
    : "";
  console.log(imageBase64);
  return new Response(imageBase64, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
