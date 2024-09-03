import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Hand, Pencil, Zap } from "lucide-react";

export function IntroChat() {
  return (
    <div className="flex w-full items-center justify-center lg:min-h-[500px] gap-10 flex-wrap">
      <Card className="p-4 flex-1">
        <CardHeader>
          <CardTitle>Bienvenido a ReadmeAi</CardTitle>
          <CardDescription>
            soy un asistente virtual que te ayudará a generar un readme para tus
            proyectos.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full justify-center items-center">
          <Hand size={60} strokeWidth={1} />
        </CardContent>
      </Card>
      <Card className="p-4 flex-1">
        <CardHeader>
          <CardTitle>¿Cómo funciona?</CardTitle>
          <CardDescription>
            Selecciona un proyecto para comenzar a chatear conmigo y generar un
            readme.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full justify-center items-center">
          <Pencil size={60} strokeWidth={1} />
        </CardContent>
      </Card>
      <Card className="p-4 flex-1">
        <CardHeader>
          <CardTitle>¿Qué puedo hacer?</CardTitle>
          <CardDescription>
            Puedo ayudarte a generar un readme para tu proyecto en segundos.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full justify-center items-center">
          <Zap size={60} strokeWidth={1} />
        </CardContent>
      </Card>
    </div>
  );
}
