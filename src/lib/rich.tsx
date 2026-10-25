import { Fragment, type ReactNode } from "react";

/** Renders `**phrase**` segments of a content string as <strong> (the key term of a passage). */
export function rich(text: string): ReactNode {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("**") ? (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}

/** Strips `**` markers — for meta descriptions, JSON-LD and llms.txt. */
export const plain = (text: string) => text.replace(/\*\*/g, "");
