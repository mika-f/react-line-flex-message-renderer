import type { ActionCallback, ActionTypes } from "../components/actions";
import { Box, type BoxProps } from "../components/Box";
import { Image, type ImageProps } from "../components/Image";
import { Video, type VideoProps } from "../components/Video";

type BlockStyle = {
  backgroundColor?: string;
  separator?: boolean;
  separatorColor?: string;
};

type BubbleSize =
  | "nano"
  | "micro"
  | "deca"
  | "hecto"
  | "kilo"
  | "mega"
  | "giga";

export interface BubbleProps {
  size?: BubbleSize;
  direction?: "ltr" | "rtl";
  header?: BoxProps;
  hero?: BoxProps | ImageProps | VideoProps;
  body?: BoxProps;
  footer?: BoxProps;
  styles?: {
    header?: BlockStyle;
    hero?: BlockStyle;
    body?: BlockStyle;
    footer?: BlockStyle;
  };
  action?: ActionTypes;

  onAction?: ActionCallback;
}

export function Bubble({
  size = "mega",
  direction = "ltr",
  header,
  hero,
  body,
  footer,
  styles,
  action,
  onAction,
}: BubbleProps) {
  const getCornerRadius = (size: BubbleSize) => {
    if (size === "giga") {
      return 5;
    }
    if (size === "nano") {
      return 10;
    }
    return 17;
  };

  const getWidth = (size: BubbleSize) => {
    switch (size) {
      case "giga":
        return 400;
      case "mega":
        return 300;
      case "kilo":
        return 260;
      case "micro":
        return 160;
      case "nano":
        return 120;
    }
  };

  return (
    <div
      onClick={() => onAction?.(action!)}
      dir={direction}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: getWidth(size),
        borderRadius: getCornerRadius(size),
        overflowX: "hidden",
        backgroundColor: "#FFF",
      }}
    >
      {header && <Box contents={[header]} isHeader onAction={onAction} />}

      {hero && hero.type === "box" && (
        <Box {...hero} isHero onAction={onAction} />
      )}
      {hero && hero.type === "image" && <Image {...hero} onAction={onAction} />}
      {hero && hero.type === "video" && <Video {...hero} onAction={onAction} />}

      {body && (
        <div
          className="body"
          style={{
            display: "inherit",
            flexDirection: "column",
            flex: "1 0 auto",
            backgroundColor: styles?.body?.backgroundColor,
          }}
        >
          <Box {...body} isBody hasFooter={!!footer} onAction={onAction} />
        </div>
      )}
      {footer && (
        <div
          className="footer"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: styles?.footer?.backgroundColor,
          }}
        >
          <Box {...footer} isFooter onAction={onAction} />
        </div>
      )}
    </div>
  );
}
