import { Coffee, MessageCircle } from "lucide-react";
import { Github } from "./customIcons/Github";
import { SectionTitle } from "./SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Jumbotron() {
  return (
    <section className="md:mt-40 mt-10 md:mb-20 mb-10">
      <SectionTitle
        title="Sugerencias y comentarios"
        description="No olvides dejar feedback para mejorar nuestra herramienta"
      />
      <div className="flex flex-col md:flex-row gap-4 max-w-screen-lg md:mx-auto">
        <a className="flex flex-1" target="_blank" href={"https://github.com/QuesoCaliente/readmeai/issues"}>
          <Card className="bg-blue-300 hover:bg-blue-400/80 transition-colors flex flex-1 duration-300 items-center gap-0 p-6 shadow-sm">
            <MessageCircle className="w-16 h-16 text-gray-800" />
            <div>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Si tienes alguna sugerencia o comentario, no dudes en
                  comunicárnoslo.
                </p>
              </CardContent>
            </div>
          </Card>
        </a>
        <a className="flex flex-1" target="_blank" href="https://ko-fi.com/quesocaliente0">
          <Card className="bg-yellow-300 hover:bg-yellow-400/80 cursor-pointer transition-colors duration-300 flex flex-1 items-center gap-0 p-6 shadow-sm">
            <Coffee className="w-16 h-16 text-gray-800" />
            <div>
              <CardHeader>
                <CardTitle>Donaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Si te gusta nuestra herramienta, puedes apoyarnos con una
                  donación.
                </p>
              </CardContent>
            </div>
          </Card>
        </a>
      </div>
    </section>
  );
}
