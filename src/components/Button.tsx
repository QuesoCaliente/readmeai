interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export function Button({
  children,
  startContent,
  endContent,
  ...props
}: ButtonProps) {
  return (
    <button
      className="bg-primary-500 ring-primary-500 hover:bg-primary-600 hover:ring-primary-600 focus:ring-primary-600 focus:outline-none
     text-white px-4 py-2 rounded-md flex gap-2"
      {...props}
    >
      {startContent}
      {children}
      {endContent}
    </button>
  );
}
