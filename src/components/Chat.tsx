"use client";

import { useChat } from "ai/react";
import { ChatBubble } from "./ChatBubble";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col flex-auto gap-4 w-full bg-white p-4">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          <ChatBubble
            name={m.role === "user" ? "You" : "ReadmeAi"}
            time={m.createdAt?.toLocaleDateString()}
            message={m.content}
          />
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 mb-8 border border-gray-300 rounded shadow-sm"
          value={input}
          placeholder="Ingresa tu mensaje..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
