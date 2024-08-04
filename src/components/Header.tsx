import { LogIn } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary-500 text-white relative overflow-hidden">
      <div className="absolute flex justify-end w-full px-8  py-4">
        <div className="flex gap-8 items-center">
          <a href="/">Actualizaciones</a>
          <a href="/">Github</a>
          <a
            className="bg-gray-500 px-2 py-2 rounded-md flex gap-2 items-center"
            href="/"
          >
            <LogIn size={16} />
            <span>Iniciar sesion</span>
          </a>
        </div>
      </div>
      <div className="h-64 md:h-9es6 flex items-center justify-center">
        <a href="/" className="text-white text-2xl md:text-4xl font-bold">
          ReadmeAi
        </a>
      </div>
    </header>
  );
}
