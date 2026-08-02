import {
  getActualNumericSize,
  getActualSize,
  getBorderRadius,
  getBorderWidth,
  getMarginSize,
  getOffset,
  getPaddingSize,
  getSpacingSize,
  renderComponent,
  type BoxComponent,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import React from "react";
import { TouchableOpacity, type ViewStyle } from "react-native";

export const Box = ({
  layout,
  contents,
  backgroundColor,
  borderColor,
  borderWidth,
  cornerRadius,
  width,
  maxWidth,
  height,
  maxHeight,
  flex,
  spacing,
  margin,
  paddingAll,
  paddingTop,
  paddingBottom,
  paddingStart,
  paddingEnd,
  position,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  justifyContent,
  alignItems,
  background,
  action,
  onClick,
}: BoxComponent & { onClick?: ClickHandler | undefined }) => {
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  const containerStyle: ViewStyle = {
    ...(layout === "baseline"
      ? { flexDirection: "row", alignItems: "baseline", columnGap: getActualSize(getSpacingSize(spacing)) }
      : layout === "horizontal"
        ? { flexDirection: "row", columnGap: getActualSize(getSpacingSize(spacing)) }
        : { flexDirection: "column", rowGap: getActualSize(getSpacingSize(spacing)) }),
    ...(flex !== undefined
      ? { flexGrow: flex === 0 ? 0 : flex, flexShrink: 0, flexBasis: flex === 0 ? "auto" : 0 }
      : {}),
    width: getActualSize(width) ?? (layout === "baseline" ? "100%" : undefined),
    maxWidth: getActualSize(maxWidth),
    height: getActualSize(height),
    maxHeight: getActualSize(maxHeight),
    backgroundColor: backgroundColor ?? background?.startColor,
    borderColor,
    borderWidth: getActualNumericSize(getBorderWidth(borderWidth)),
    borderRadius: getActualNumericSize(getBorderRadius(cornerRadius)),
    paddingTop: getActualSize(getPaddingSize(paddingTop)),
    paddingBottom: getActualSize(getPaddingSize(paddingBottom)),
    paddingLeft: getActualSize(getPaddingSize(paddingStart)),
    paddingRight: getActualSize(getPaddingSize(paddingEnd)),
    padding: getActualSize(getPaddingSize(paddingAll)),
    marginTop: getActualSize(getMarginSize(margin)),
    position: position === undefined ? "relative" : position,
    alignItems,
    justifyContent,
    top: getActualSize(getOffset(offsetTop)),
    bottom: getActualSize(getOffset(offsetBottom)),
    left: getActualSize(getOffset(offsetStart)),
    right: getActualSize(getOffset(offsetEnd)),
    ...(width ? { flexShrink: 0 } : {}),
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={handleClick}>
      {contents.map((content, i) => (
        <React.Fragment key={i}>{renderComponent(content)}</React.Fragment>
      ))}
    </TouchableOpacity>
  );
};
