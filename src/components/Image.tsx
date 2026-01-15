import type {
  AlignType,
  GravityType,
  ImageSize,
  KeywordSize,
  PositionType,
} from "../types";
import { getImageSize } from "../utils";
import type { ActionCallback, ActionTypes } from "./actions";

export interface ImageProps {
  type?: "image";
  url?: string;
  flex?: number;
  margin?: KeywordSize;
  position?: PositionType;
  offsetTop?: KeywordSize;
  offsetBottom?: KeywordSize;
  offsetStart?: KeywordSize;
  offsetEnd?: KeywordSize;
  align?: AlignType;
  gravity?: GravityType;
  size?: ImageSize;
  aspectRatio?: string;
  aspectMode?: "cover" | "fit";
  backgroundColor?: string;
  action?: ActionTypes;
  animated?: boolean;

  boxLayout?: "vertical" | "horizontal" | "baseline";
  onAction?: ActionCallback;
}

export function Image({
  url,
  flex,
  size = "md",
  aspectRatio,
  aspectMode,
  boxLayout,
  action,
  onAction,
}: ImageProps) {
  const aspectRatioValue = () => {
    const split = aspectRatio?.split(":");
    if (!split) {
      return undefined;
    }
    const width = parseFloat(split[0]);
    const height = parseFloat(split[1]);
    if (isNaN(width) || isNaN(height) || height === 0) {
      return undefined;
    }
    return width / height;
  };

  const objectFit = aspectMode === "cover" ? "cover" : "contain";

  return (
    <img
      src={url}
      alt="image"
      onClick={() => onAction?.(action!)}
      style={{
        flex: flex === 0 ? "0 0 auto" : flex === undefined ? "1 1 0%" : flex,
        objectFit: objectFit,
        width: boxLayout === "horizontal" ? getImageSize(size) : "100%",
        maxWidth: "100%",
        minWidth: 0,
        height: "auto",
        aspectRatio: aspectRatioValue(),
        alignSelf: "center",
      }}
    />
  );
}
