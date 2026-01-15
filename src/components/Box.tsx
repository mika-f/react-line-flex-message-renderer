import { Fragment } from "react/jsx-runtime";
import type { KeywordSize, PositionType } from "../types";
import type { ActionCallback, ActionTypes } from "./actions";
import { Button, type ButtonProps } from "./Button";
import { Icon, type IconProps } from "./Icon";
import { Image, type ImageProps } from "./Image";
import type { TextProps } from "./Text";
import { Text } from "./Text";
import { getKeywordSize, getKeywordSizeValue } from "../utils";
import { Separator, type SeparatorProps } from "./Separator";

export interface BoxProps {
  type?: "box";
  layout?: "vertical" | "horizontal" | "baseline";
  contents: (
    | BoxProps
    | TextProps
    | ButtonProps
    | ImageProps
    | IconProps
    | SeparatorProps
  )[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?:
    | "none"
    | "light"
    | "normal"
    | "medium"
    | "semi-bold"
    | "bold"
    | string;
  cornerRadius?: KeywordSize;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  flex?: number;
  spacing?: KeywordSize;
  margin?: KeywordSize;
  paddingAll?: KeywordSize;
  paddingTop?: KeywordSize;
  paddingBottom?: KeywordSize;
  paddingStart?: KeywordSize;
  paddingEnd?: KeywordSize;
  position?: PositionType;
  offsetTop?: KeywordSize;
  offsetBottom?: KeywordSize;
  offsetStart?: KeywordSize;
  offsetEnd?: KeywordSize;
  action?: ActionTypes;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "center" | "flex-end";
  background?: {
    type?: "linearGradient";
    angle?: string;
    startColor?: string;
    endColor?: string;
    centerColor?: string;
    centerPosition?: string;
  };

  isHeader?: boolean;
  isHero?: boolean;
  isBody?: boolean;
  isFooter?: boolean;

  hasFooter?: boolean;

  onAction?: ActionCallback;
}

export function Box({
  layout = "vertical",
  contents,
  backgroundColor = "transparent",
  borderColor = "transparent",
  borderWidth = "none",
  cornerRadius,
  width,
  maxWidth,
  height,
  maxHeight,
  flex = 1,
  spacing = "none",
  margin = "none",
  paddingAll,
  paddingTop,
  paddingBottom,
  paddingStart,
  paddingEnd,
  action,
  position,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  isBody,
  isFooter,
  hasFooter,
  onAction,
}: BoxProps) {
  const getPadding = () => {
    const all = getKeywordSizeValue(paddingAll);
    const top = getKeywordSizeValue(paddingTop) || all || (isBody ? 19 : 0);
    const bottom =
      getKeywordSizeValue(paddingBottom) ||
      all ||
      (isBody ? (hasFooter ? 10 : 20) : 0);
    const start = getKeywordSizeValue(paddingStart) || all || (isBody ? 20 : 0);
    const end = getKeywordSizeValue(paddingEnd) || all || (isBody ? 20 : 0);

    if (!top && !bottom && !start && !end && isFooter) {
      return "10px";
    }

    return `${top}px ${end}px ${bottom}px ${start}px`;
  };

  const getBorderWidth = () => {
    if (borderWidth === "none") {
      return 0;
    }
    switch (borderWidth) {
      case "light":
        return 0.5;
      case "normal":
        return 1;
      case "medium":
        return 2;
      case "semi-bold":
        return 3;
      case "bold":
        return 4;
      default:
        return parseFloat(borderWidth) || 0;
    }
  };

  return (
    <div
      className="box"
      onClick={() => onAction?.(action!)}
      style={{
        display: "flex",
        position: position,
        width: layout === "horizontal" && width === undefined ? "100%" : width,
        maxWidth: maxWidth,
        height: height,
        maxHeight: maxHeight,
        borderRadius: cornerRadius,
        borderWidth: `${getBorderWidth()}px`,
        borderColor: borderColor,
        overflow: "hidden",
        top: getKeywordSize(offsetTop),
        bottom: getKeywordSize(offsetBottom),
        left: getKeywordSize(offsetStart),
        right: getKeywordSize(offsetEnd),
        flex:
          flex === 0 || layout === "horizontal" || height
            ? "0 0 auto"
            : flex === 1
              ? "0 1 auto"
              : flex === undefined
                ? "0 0 0"
                : flex,
        flexDirection: layout === "vertical" ? "column" : "row",
        alignItems: layout === "baseline" ? "baseline" : "normal",
        backgroundColor: backgroundColor,
        marginTop: getKeywordSize(margin),
        padding: getPadding(),
        rowGap: layout === "vertical" ? getKeywordSize(spacing) : undefined,
        columnGap: layout !== "vertical" ? getKeywordSize(spacing) : undefined,
      }}
    >
      {contents.map((content, index) => (
        <Fragment key={index}>
          {content.type === "text" && <Text {...content} boxLayout={layout} />}
          {content.type === "box" && <Box {...content} onAction={onAction} />}
          {content.type === "button" && (
            <Button {...content} onAction={onAction} />
          )}
          {content.type === "image" && (
            <Image {...content} onAction={onAction} boxLayout={layout} />
          )}
          {content.type === "icon" && <Icon {...content} />}
          {content.type === "separator" && <Separator {...content} />}
        </Fragment>
      ))}
    </div>
  );
}
