import type { ReactNode } from "react";
import { Reveal, SplitHeading } from "./motion";

export function SectionIntro({
  eyebrow,
  title,
  text,
  align = "left",
  dark = false,
  className = "",
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <Reveal y={12} blur={false}>
          <span className={dark ? "eyebrow-dark" : "eyebrow"}>
            <span className={`size-1.5 rounded-full ${dark ? "bg-blush-300" : "bg-blush-500"}`} />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <SplitHeading
        text={title}
        className={`mt-5 text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-[3.4rem] ${dark ? "text-white" : ""}`}
        accentClassName={dark ? "text-gradient-light italic" : "text-gradient italic"}
      />
      {text && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-iris-100/80" : "text-ink-soft"}`}>{text}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
