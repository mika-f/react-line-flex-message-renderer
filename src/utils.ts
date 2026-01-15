import type { ImageSize, KeywordSize, TextSize } from "./types";

export const getKeywordSizeValue = (size?: KeywordSize) => {
  if (!size) {
    return undefined;
  }
  switch (size) {
    case "none":
      return 0;
    case "xs":
      return 2;
    case "sm":
      return 4;
    case "md":
      return 8;
    case "lg":
      return 12;
    case "xl":
      return 16;
    case "xxl":
      return 20;
    default:
      return size.substring(0, size.length - 2) as unknown as number;
  }
};

export const getKeywordSize = (size?: KeywordSize) => {
  const value = getKeywordSizeValue(size);
  return value !== undefined ? `${value}px` : undefined;
};

export const getTextSizeValue = (size: TextSize) => {
  switch (size) {
    case "xxs":
      return 11;
    case "xs":
      return 13;
    case "sm":
      return 14;
    case "md":
      return 16;
    case "lg":
      return 19;
    case "xl":
      return 22;
    case "xxl":
      return 29;
    case "3xl":
      return 35;
    case "4xl":
      return 48;
    case "5xl":
      return 74;
    default:
      return size.substring(0, size.length - 2) as unknown as number;
  }
};

export const getTextSize = (size: TextSize) => {
  return `${getTextSizeValue(size)}px`;
};

export const getImageSizeValue = (size: ImageSize) => {
  switch (size) {
    case "xxs":
      return 40;
    case "xs":
      return 60;
    case "sm":
      return 80;
    case "md":
      return 100;
    case "lg":
      return 120;
    case "xl":
      return 140;
    case "xxl":
      return 160;
    case "3xl":
      return 180;
    case "4xl":
      return 200;
    case "5xl":
      return 220;
    default:
      return size.substring(0, size.length - 2) as unknown as number;
  }
};

export const getImageSize = (size: ImageSize) => {
  if (size === "full") {
    return "100%";
  }
  return `${getImageSizeValue(size)}px`;
};
