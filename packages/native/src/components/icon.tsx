import {
  getActualSize,
  getIconSize,
  getMarginSize,
  getOffset,
  type IconComponent,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { Image, View } from "react-native";

export const Icon = ({
  url,
  margin,
  position,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  size,
  scaling,
  aspectRatio,
}: IconComponent) => {
  // getIconSize(undefined) returns undefined; without this fallback an unsized icon renders at its source's native pixel size.
  const width = getActualSize(getIconSize(size ?? "md"));

  return (
    <View style={{ width, flexShrink: 0 }}>
      <Image
        style={{
          aspectRatio: aspectRatio?.split(":").join("/") ?? "1",
          top: getActualSize(getOffset(offsetTop)),
          bottom: getActualSize(getOffset(offsetBottom)),
          left: getActualSize(getOffset(offsetStart)),
          right: getActualSize(getOffset(offsetEnd)),
          marginTop: getActualSize(getMarginSize(margin)),
          position: position === undefined ? "relative" : position,
        }}
        source={{ uri: url }}
      />
    </View>
  );
};
