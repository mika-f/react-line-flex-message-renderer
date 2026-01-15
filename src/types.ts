export type KeywordSize =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | `${number}px`;

export type TextSize =
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "3xl"
  | "4xl"
  | "5xl"
  | `${number}`;

export type ImageSize = TextSize | "full";

export type PositionType = "relative" | "absolute";

export type AlignType = "start" | "center" | "end";
export type GravityType = "top" | "center" | "bottom";
