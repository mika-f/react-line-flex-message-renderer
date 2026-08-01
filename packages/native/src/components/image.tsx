import {
  getImageSize,
  getMarginSize,
  getOffset,
  type ImageComponent,
  type ClickHandler,
  getActualSize,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { Image as RNImage, TouchableOpacity, View } from "react-native";

export const Image = ({
  url,
  flex,
  position,
  margin,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  align,
  gravity,
  size,
  aspectRatio,
  aspectMode,
  backgroundColor,
  animated,
  action,
  onClick,
}: ImageComponent & { onClick?: ClickHandler | undefined }) => {
  const rawWidth = getImageSize(size);
  const width = rawWidth === "unset" ? undefined : getActualSize(rawWidth);
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        flex: flex === 0 ? 0 : flex,
        // Same rule as below: only force a % height when width can't drive sizing on its own — otherwise
        // this resolves against whatever definite height it finds further up and stretches the whole card.
        ...(width === undefined ? { height: "100%" } : {}),
        ...(margin ? { margin: getActualSize(getMarginSize(margin)) } : { marginTop: 0, marginBottom: 0, marginRight: "auto", marginLeft: "auto" }),
      }}
    >
      {/* Only one of width/height may be definite — the other must stay unset so aspectRatio can derive it. */}
      <TouchableOpacity onPress={handleClick} style={width !== undefined ? { width } : { height: "100%" }}>
        <RNImage
          style={{
            aspectRatio: aspectRatio?.split(":").join("/") ?? "1",
            objectFit: aspectMode === "cover" ? "cover" : "contain",
            backgroundColor,
            position: position === undefined ? "relative" : position,
            top: getActualSize(getOffset(offsetTop)),
            bottom: getActualSize(getOffset(offsetBottom)),
            left: getActualSize(getOffset(offsetStart)),
            right: getActualSize(getOffset(offsetEnd)),
            ...(width !== undefined ? { width } : { height: "100%" }),
          }}
          source={{ uri: url }}
        />
      </TouchableOpacity>
    </View>
  );
};
