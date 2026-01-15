import type { TextSize } from "../types";

export interface SpanProps {
  type?: "span";
  text?: string;
  color?: string;
  size?: TextSize;
  weight?: "regular" | "bold";
  style?: "normal" | "italic";
  decoration?: "none" | "underline" | "line-through";
}

export function Span({
  text,
  color = "#444444",
  size = "md",
  weight = "regular",
  style = "normal",
  decoration = "none",
}: SpanProps) {
  return (
    <span
      style={{
        color: color,
        fontSize: size,
        fontWeight: weight === "bold" ? "bold" : "normal",
        fontStyle: style === "italic" ? "italic" : "normal",
        textDecoration:
          decoration === "underline"
            ? "underline"
            : decoration === "line-through"
              ? "line-through"
              : "none",
      }}
    >
      {text}
    </span>
  );
}
