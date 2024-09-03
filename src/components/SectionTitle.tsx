interface SectionTitleProps {
  title: string;
  description: string;
}

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="text-center mx-auto mb-16 max-w-[50%]">
      <h2 className="text-xl font-medium text-gray-800">{title}</h2>
      <p className="text-gray-600 text-lg text-balance mt-4">{description}</p>
    </div>
  );
}
