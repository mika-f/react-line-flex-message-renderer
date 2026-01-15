import type { KeywordSize, PositionType, TextSize } from "../types";
import { getKeywordSize, getTextSize } from "../utils";

export interface IconProps {
  type?: "icon";
  url?: string;

  margin?: KeywordSize;
  position?: PositionType;
  offsetTop?: KeywordSize;
  offsetBottom?: KeywordSize;
  offsetStart?: KeywordSize;
  offsetEnd?: KeywordSize;
  size?: TextSize;
  scaling?: boolean;
  aspectRatio?: string;
  flex?: 0;
}

export function Icon({ url, size = "md", margin }: IconProps) {
  return (
    <div
      style={{
        marginLeft: getKeywordSize(margin),
        width: getTextSize(size),
        height: getTextSize(size),
      }}
    >
      <img src={url} alt="icon" />
    </div>
  );
}
