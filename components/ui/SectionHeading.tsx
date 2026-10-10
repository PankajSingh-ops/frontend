export function SectionHeading({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={`font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-wide uppercase ${className}`}
    >
      {children}
    </h2>
  );
}
