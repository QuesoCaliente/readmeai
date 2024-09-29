"use client";

import { useChat } from "ai/react";
import { ChatBubble } from "./ChatBubble";
import { useProject } from "@/context/projectContext/ProjectProvider";
import { useEffect } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { IntroChat } from "./IntroChat";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Github } from "./customIcons/Github";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Badge } from "./ui/badge";

export function Chat() {
  const { toast } = useToast();
  useEffect(() => {
    hljs.addPlugin({
      "after:highlightElement": ({ el, text }) => {
        /**
         * el is the <code> element that was highlighted
         * el.parentElement is the <pre> element
         */
        const wrapper = el.parentElement;
        if (wrapper == null) {
          return;
        }

        /**
         * Make the parent relative so we can absolutely
         * position the copy button
         */
        wrapper.classList.add("relative");

        const copyButton = document.createElement("button");
        copyButton.classList.add(
          "absolute",
          "top-2",
          "right-2",
          "p-2",
          "text-gray-500",
          "hover:text-gray-700"
        );
        // Lucide copy icon
        copyButton.innerHTML = `<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
        // add buton on the right side
        const button = document.createElement("button");
        button.classList.add(
          "absolute",
          "top-2",
          "right-2",
          "p-2",
          "text-gray-500",
          "hover:text-gray-700"
        );
        // Lucide copy icon
        button.innerHTML = `<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

        button.onclick = () => {
          navigator.clipboard.writeText(text);

          // Notify user that the content has been copied
          toast({
            title: "Copiado al portapapeles",
            description: "El contenido ha sido copiado al portapapeles",
            color: "success",
          });
          button.remove();
        };
        copyButton.onclick = () => {
          navigator.clipboard.writeText(text);

        wrapper.appendChild(button);

          // Notify user that the content has been copied
          toast({
            title: "Copiado al portapapeles",
            description: "El contenido ha sido copiado al portapapeles",
            color: "success",
          });
        };

        // Append the copy button to the wrapper
        wrapper.appendChild(copyButton);
      },
    });
    hljs.highlightAll();
  });
  const { selectedProject, handleProject, updateProject } =
    useProject();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    error,
  } = useChat({ initialMessages: selectedProject?.chat });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        color: "danger",
      });
    }
  }, [error]);

  useEffect(() => {
    if (
      selectedProject?.id &&
      selectedProject.id !== "" &&
      messages.length > 0
    ) {
      const newMessages = messages.filter(
        (newMessage) =>
          !selectedProject.chat.some(
            (existingMessage) => existingMessage.id === newMessage.id
          )
      );
      handleProject({
        ...selectedProject,
        chat: messages,
      });
      updateProject(selectedProject?.id, {
        ...selectedProject,
        chat: [...selectedProject.chat, ...newMessages],
      });
    }
  }, [messages]);

  return (
    <section className="w-full">
      <div className="flex items-center gap-2">
        <span className="py-4 block">
          Proyecto cargado:{" "}
          <span className="text-blue-500 font-bold underline">
            {selectedProject?.name ?? "Ninguno"}
          </span>
        </span>
        {selectedProject?.github && (
          <Badge>
            <a
              className="flex items-center gap-2"
              href={selectedProject.github}
              target="_blank"
            >
              <Github className="size-5" />
              Github
            </a>
          </Badge>
        )}
        {selectedProject?.image && (
          <Badge>
            <a
              className="flex items-center gap-2"
              download={"vistaprevia.png"}
              href={`data:image/png;base64,${selectedProject.image}`}
            >
              <ImageIcon className="size-5" />
              Descargar Captura del sitio
            </a>
          </Badge>
        )}
      </div>
      <div className="flex flex-col flex-auto gap-4 w-full bg-primary-100 shadow-lg p-4 relative">
        <div className="flex-1 flex flex-col md:min-h-[500px] md:max-h-[500px] overflow-x-auto">
          {messages.length > 0 ? (
            messages.slice(1).map((m, index) => (
              <div
                ref={(el) => {
                  index === messages.length - 2 &&
                    el?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                key={m.id}
                className="whitespace-pre-wrap my-8"
              >
                <ChatBubble
                  name={m.role === "user" ? "Tú" : "ReadmeAi"}
                  image={
                    m.role === "user" ? "/images/user.svg" : "/images/bot.webp"
                  }
                  time={new Date(m.createdAt!).toLocaleDateString()}
                  message={m.content.replace(
                    "${vistaprevia}",
                    selectedProject?.image ?? ""
                  )}
                />
              </div>
            ))
          ) : (
            <IntroChat />
          )}
        </div>

        <form
          onSubmit={(event) =>
            handleSubmit(event, {
              data: JSON.parse(JSON.stringify(selectedProject)),
            })
          }
        >
          <Input
            value={input}
            disabled={!selectedProject}
            placeholder="Ingresa tu mensaje..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </section>
  );
}
