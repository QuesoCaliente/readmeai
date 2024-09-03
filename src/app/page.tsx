import { Chat } from "@/components/Chat";
import { Jumbotron } from "@/components/Jumbotron";
import { ReadmeProjects } from "@/components/ReadmeProjects";

export default async function Home() {
  return (
    <main className="flex flex-col pt-10 px-4 md:p-12">
      <div className="flex lg:flex-row flex-col gap-10">
        <ReadmeProjects />
        <Chat />
      </div>
      <Jumbotron />
    </main>
  );
}
