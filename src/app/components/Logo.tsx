import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { width: 120, height: 36 },
  md: { width: 160, height: 48 },
  lg: { width: 200, height: 60 },
};

export function Logo({ href = "/", size = "md", className = "" }: LogoProps) {
  const { width, height } = sizes[size];

  const content = (
    <Image
      src="/logo.png"
      alt="Mathly – Korepetycje z matematyki"
      width={width}
      height={height}
      priority
      className="object-contain"
    />
  );

  const wrapperClass = `flex items-center shrink-0 ${className}`.trim();

  return href ? (
    <Link href={href} className={wrapperClass}>
      {content}
    </Link>
  ) : (
    <div className={wrapperClass}>{content}</div>
  );
}
