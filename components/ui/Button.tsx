export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 font-semibold text-sm transition-all duration-300 z-10";

  const variants = {
    primary:
      "bg-primary text-white rounded-full hover:bg-primary-glow hover:shadow-[0_0_20px_rgba(47,123,255,0.4)] relative overflow-hidden group border border-transparent hover:border-white/20",
    ghost: "text-text hover:text-white hover:bg-surface-2 rounded-full",
    outline:
      "border border-line rounded-full text-text hover:bg-surface-2 hover:border-primary-glow",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full border-[1px] border-transparent bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300 -z-10 pointer-events-none" />
      )}
    </a>
  );
}
