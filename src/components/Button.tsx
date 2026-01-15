import type { GravityType, KeywordSize, PositionType } from "../types";
import { getKeywordSizeValue } from "../utils";
import type { ActionCallback, ActionTypes } from "./actions";

export interface ButtonProps {
  type?: "button";
  action?: ActionTypes;
  flex?: number;
  margin?: KeywordSize;
  position?: PositionType;
  offsetTop?: KeywordSize;
  offsetBottom?: KeywordSize;
  offsetStart?: KeywordSize;
  offsetEnd?: KeywordSize;
  height?: "sm" | "md";
  style?: "primary" | "secondary" | "link";
  color?: string;
  gravity?: GravityType;
  adjustMode?: "shrink-to-fit";
  scaling?: boolean;

  onAction?: ActionCallback;
}

export const Button = ({
  action,
  margin = "none",
  height = "md",
  style,
  color,
  gravity,
  onAction,
}: ButtonProps) => {
  const getColor = () => {
    if (style === "primary" || style === "secondary") {
      return "#FFFFFF";
    }
    if (color) {
      return color;
    }
    return "#42659A";
  };
  const getBackgroundColor = () => {
    if (style === "primary") {
      if (color) {
        return color;
      }
      return "#17C950";
    }
    if (style === "secondary") {
      return "#DCDFE5";
    }
    return "transparent";
  };
  const getHeight = () => {
    return height === "md" ? 52 : 40;
  };

  return (
    <div
      className="button"
      style={{
        display: "flex",
        alignContent: gravity,
        justifyContent: "center",
        backgroundColor: getBackgroundColor(),
        cursor: "pointer",
        marginTop: getKeywordSizeValue(margin),
        borderRadius: "8px",
      }}
      onClick={() => onAction?.(action!)}
    >
      <div
        style={{
          margin: 0,
          color: getColor(),
          height: getHeight(),
          display: "flex",
          alignItems: "center",
        }}
      >
        {action?.label}
      </div>
    </div>
  );
};
