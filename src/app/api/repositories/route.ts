import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "User not found" });
  }

  const provider = "oauth_github";
  const clerkResponse = await clerkClient().users.getUserOauthAccessToken(
    userId,
    provider
  );
  const accessToken = clerkResponse.data[0].token;

  // octokit view all repositories
  const octokit = new Octokit({
    auth: accessToken,
  });

  // get private repos
  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    visibility: "all",
  });

  console.log(JSON.stringify(repos, null, 2));

  return NextResponse.json(repos);
}
