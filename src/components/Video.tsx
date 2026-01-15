import type { ActionCallback, ActionTypes } from "./actions";
import type { BoxProps } from "./Box";
import type { ImageProps } from "./Image";

export interface VideoProps {
  type?: "video";
  url?: string;
  previewUrl?: string;
  altContent?: BoxProps | ImageProps;
  aspectRatio?: string;
  action?: ActionTypes;

  onAction?: ActionCallback;
}

export function Video({ url }: VideoProps) {
  return (
    <div>
      <video src={url} controls />
    </div>
  );
}
