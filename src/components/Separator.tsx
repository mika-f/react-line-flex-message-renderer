import type { KeywordSize } from "../types";
import { getKeywordSize } from "../utils";

export interface SeparatorProps {
  type?: "separator";
  margin?: KeywordSize;
  color?: string;
}

export function Separator({
  margin = "md",
  color = "#D4D6DA",
}: SeparatorProps) {
  return (
    <hr
      style={{
        width: "100%",
        marginTop: getKeywordSize(margin),
        borderTopWidth: 1,
        borderColor: color,
      }}
    />
  );
}
