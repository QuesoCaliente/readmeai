import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { SignedOut, SignedIn } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="bg-primary-950 text-white relative overflow-hidden">
      <div className="absolute flex justify-end w-full px-8  py-4">
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 items-center">
          <a href="https://github.com/QuesoCaliente/readmeai/blob/main/CHANGELOG.md" target="_blank">Actualizaciones</a>
          <a href="https://github.com/QuesoCaliente/readmeai" target="_blank">Github</a>
          <SignedOut>
            <Button disabled variant={"ghost"}>
              <LogIn className="mr-2" size={16} />
              Iniciar sesión
            </Button>
          </SignedOut>
          <SignedIn>
            <Button disabled variant={"ghost"}>
              <LogIn className="mr-2" size={16} />
              Cerrar Sesión
            </Button>
          </SignedIn>
        </div>
      </div>
      <div className="h-64 md:h-64 flex items-center justify-center">
        <a href="/" className="text-white text-2xl md:text-4xl font-bold">
          ReadmeAi
        </a>
      </div>
    </header>
  );
}
