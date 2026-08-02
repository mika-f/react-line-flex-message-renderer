import {
  getActualSize,
  getIconSize,
  getMarginSize,
  getOffset,
  renderComponent,
  type TextComponent,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import React from "react";
import { Text as RNText, TouchableOpacity, type TextStyle, type ViewStyle } from "react-native";
import { MarginSizeProvider } from "../hooks/useInheritedMarginSize.js";

export const Text = ({
  text,
  contents,
  adjustMode,
  flex,
  margin,
  position,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  size,
  scaling,
  align,
  gravity,
  wrap,
  lineSpacing,
  maxLines,
  weight,
  color,
  style,
  decoration,
  action,
  onClick,
}: TextComponent & { onClick?: ClickHandler | undefined }) => {
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  if (!text && !contents) {
    return null;
  }

  const marginSize = getActualSize(getMarginSize(margin)) as number | undefined;

  const containerStyle: ViewStyle = {
    // Only override flex sizing when `flex` is actually specified — otherwise flexBasis:0 would force
    // this Text to zero height whenever its parent Box has a fixed (non-content-driven) height.
    ...(flex !== undefined
      ? { flexGrow: flex === 0 ? 0 : flex, flexShrink: 0, flexBasis: flex === 0 ? "auto" : 0 }
      : {}),
    top: getActualSize(getOffset(offsetTop)),
    bottom: getActualSize(getOffset(offsetBottom)),
    left: getActualSize(getOffset(offsetStart)),
    right: getActualSize(getOffset(offsetEnd)),
    position: position === undefined ? "relative" : position,
    width: align === "center" || (align === "end" && flex !== 0) ? "100%" : undefined,
    // RN defaults flexShrink to 0 (web defaults to 1), so without this a "100%"-wide row item can't
    // shrink to fit whatever space its siblings left behind and instead overflows past the card edge.
    // Skipped when `flex` is explicitly set, since that case is already fully handled above.
    ...((align === "center" || align === "end") && flex === undefined ? { flexShrink: 1 } : {}),
  };

  const textStyle: TextStyle = {
    color,
    fontSize: getActualSize(getIconSize(size)) as number | undefined,
    fontStyle: style,
    fontWeight: weight === "regular" ? "400" : weight,
    textAlign: align === "center" ? "center" : align === "end" ? "right" : "left",
    textDecorationLine: decoration !== "none" ? decoration : undefined,
  };

  if (text) {
    return (
      <TouchableOpacity style={containerStyle} onPress={handleClick}>
        <MarginSizeProvider marginSize={marginSize}>
          <RNText style={textStyle} numberOfLines={maxLines ?? (wrap ? undefined : 1)} ellipsizeMode="tail">
            {text}
          </RNText>
        </MarginSizeProvider>
      </TouchableOpacity>
    );
  }

  if (contents) {
    return (
      <TouchableOpacity style={containerStyle} onPress={handleClick}>
        <MarginSizeProvider marginSize={marginSize}>
          <RNText style={textStyle} numberOfLines={maxLines ?? (wrap ? undefined : 1)} ellipsizeMode="tail">
            {contents.map((content, index) => (
              <React.Fragment key={index}>{renderComponent(content)}</React.Fragment>
            ))}
          </RNText>
        </MarginSizeProvider>
      </TouchableOpacity>
    );
  }
};
