import { Chat } from "@/components/Chat";
import { ReadmeProjects } from "@/components/ReadmeProjects";

export default function Home() {
  return (
    <main className="flex lg:flex-row flex-col gap-10 min-h-screen pt-20 px-4 md:p-24">
      <ReadmeProjects />
      <Chat />
    </main>
  );
}
