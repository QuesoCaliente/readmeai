interface ChatBubbleProps {
  name: string;
  time?: string;
  message: string;
  image?: string;
}

export function ChatBubble({
  name,
  time = new Date().toLocaleTimeString(),
  message,
  image = "/images/bot.webp",
}: ChatBubbleProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-2.5">
      <img className="w-12 h-12 rounded-full" src={image} alt={name} />
      <div className="flex flex-col w-full max-w-[820px] leading-1.5 lg:p-4 border-gray-200  rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex flex-wrap items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {/* transform time to hours and minutes */}
          </span>
        </div>
        {name === "Tú" ? (
          <p className="text-sm font-normal bg-gray-100 px-4 py-4 my-2.5 text-gray-900 dark:text-white">
            {message}
          </p>
        ) : (
          <pre className="py-2.5 h-full w-full">
            <code className="language-markdown">{message}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
