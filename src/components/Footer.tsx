import { version } from "../../package.json";

export function Footer() {
  return (
    <footer className="bg-primary-950 text-gray-300">
      <div className="p-8 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a href="/" className="text-white">
            Twitter
          </a>
          <a href="/" className="text-white">
            Actualizaciones
          </a>
        </div>
        <div className="flex w-full items-center justify-center text-white">
          <small>ReadmeAi © 2024 - Created with 💛 - {version}</small>
        </div>
      </div>
    </footer>
  );
}
