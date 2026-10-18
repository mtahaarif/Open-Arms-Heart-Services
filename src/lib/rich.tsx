import { Fragment, type ReactNode } from "react";

/** Renders `**phrase**` segments of a plain string as <strong> for emphasis. */
export function rich(text: string): ReactNode {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("**") ? (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}

/** Strips `**` markers, e.g. for meta descriptions or aria labels. */
export const plain = (text: string) => text.replace(/\*\*/g, "");
