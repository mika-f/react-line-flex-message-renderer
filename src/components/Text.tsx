import type {
  AlignType,
  GravityType,
  KeywordSize,
  PositionType,
  TextSize,
} from "../types";
import { getKeywordSize, getTextSize } from "../utils";
import type { ActionTypes } from "./actions";
import { Span, type SpanProps } from "./Span";

export interface TextProps {
  type?: "text";
  text?: string;
  contents?: SpanProps[];
  adjustMode?: "shrink-to-fit";
  flex?: number;
  margin?: KeywordSize;
  position?: PositionType;
  offsetTop?: KeywordSize;
  offsetBottom?: KeywordSize;
  offsetStart?: KeywordSize;
  offsetEnd?: KeywordSize;
  size?: TextSize;
  scaling?: boolean;
  align?: AlignType;
  gravity?: GravityType;
  wrap?: boolean;
  lineSpacing?: string;
  maxLines?: number;
  weight?: "regular" | "bold";
  color?: string;
  action?: ActionTypes;
  style?: "normal" | "italic";
  decoration?: "none" | "underline" | "line-through";

  boxLayout?: "vertical" | "horizontal" | "baseline";
}

export function Text({
  text,
  contents,
  flex,
  margin = "none",
  size = "md",
  align = "start",
  weight = "regular",
  color = "#444444",
  boxLayout,
}: TextProps) {
  const getFontWeight = () => {
    switch (weight) {
      case "bold":
        return "bold";
      default:
        return "normal";
    }
  };

  const texts = text ? text.split("\n") : [];

  return (
    <div
      style={{
        flex: flex === 0 ? "0 0 auto" : flex === undefined ? "1 1 0%" : flex,
        marginTop:
          boxLayout === "vertical" ? getKeywordSize(margin) : undefined,
        marginLeft:
          boxLayout !== "vertical" ? getKeywordSize(margin) : undefined,
      }}
    >
      {texts.length > 0 ? (
        texts.map((line, index) => (
          <p
            key={index}
            style={{
              fontSize: getTextSize(size),
              fontWeight: getFontWeight(),
              color: color,
              wordWrap: "break-word",
              whiteSpace: "normal",
              textOverflow: "clip",
              textAlign: align,
            }}
          >
            {line}
          </p>
        ))
      ) : (
        <p
          style={{
            fontSize: getTextSize(size),
            fontWeight: getFontWeight(),
            color: color,
            wordWrap: "break-word",
            whiteSpace: "normal",
            textOverflow: "clip",
            textAlign: align,
          }}
        >
          {contents && contents.length > 0
            ? contents.map((span, index) => <Span {...span} key={index} />)
            : text}
        </p>
      )}
    </div>
  );
}
