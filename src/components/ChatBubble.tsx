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
  image = "/images/yuki.webp",
}: ChatBubbleProps) {
  return (
    <div className="flex items-start gap-2.5">
      <img className="w-12 h-12 rounded-full" src={image} alt={name} />
      <div className="flex flex-col w-full max-w-[620px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {/* transform time to hours and minutes */}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {message}
        </p>
      </div>
    </div>
  );
}
