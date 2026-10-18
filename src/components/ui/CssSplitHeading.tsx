import { Fragment } from "react";

/**
 * Word-by-word headline entrance driven purely by CSS (see `word-rise` in globals.css).
 * Used above the fold: words stay painted while they rise, so the heading counts toward
 * Largest Contentful Paint at first render instead of after hydration.
 * Wrap a phrase in *asterisks* to give it the gradient accent treatment.
 */
export function CssSplitHeading({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  accentClassName = "text-gradient italic",
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
  accentClassName?: string;
}) {
  const words: { w: string; accent: boolean }[] = [];
  for (const part of text.split(/(\*[^*]+\*)/g).filter(Boolean)) {
    const accent = part.startsWith("*");
    for (const w of part.replace(/\*/g, "").split(" ").filter(Boolean)) words.push({ w, accent });
  }

  return (
    <Tag className={className}>
      {words.map(({ w, accent }, i) => (
        <Fragment key={i}>
          <span
            className={`inline-block pr-[0.06em] ${accent ? accentClassName : ""}`}
            style={{ animation: `word-rise 1s var(--ease-out-expo) ${delay + i * 55}ms both` }}
          >
            {w}
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
