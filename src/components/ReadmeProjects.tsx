import { Button } from "./Button";
import { Github } from "./customIcons/Github";

export function ReadmeProjects() {
  return (
    <section className="lg:min-w-80">
      <div>
        <Button startContent={<Github className="w-6 h-6" />}>
          Nuevo proyecto
        </Button>
      </div>
      <div className="bg-white"></div>
    </section>
  );
}
