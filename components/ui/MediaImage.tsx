import Image from "next/image";
import { IMAGES, ImageMap } from "../../lib/content";

export function MediaImage({
  imageKey,
  alt,
  className = "",
  fill = true,
  priority = false,
  width,
  height,
}: {
  imageKey: keyof ImageMap;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const src = IMAGES[imageKey];

  if (src) {
    if (fill) {
      const fitClass = className.includes("object-") ? "" : "object-cover ";
      return (
        <Image
          src={src}
          alt={alt}
          fill
          className={`${fitClass}${className}`}
          priority={priority}
        />
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width!}
        height={height!}
        className={className}
        priority={priority}
      />
    );
  }

  // Placeholder
  return (
    <div
      className={`relative bg-surface flex items-center justify-center border border-line overflow-hidden ${className} ${
        fill ? "absolute inset-0" : ""
      }`}
      style={!fill && width && height ? { width, height } : {}}
    >
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-2 opacity-50" />
      <span className="text-[10px] sm:text-xs font-mono text-muted relative z-10 px-4 text-center">
        [Placeholder]
        <br />
        {imageKey}
      </span>
    </div>
  );
}
