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
import { useParentFlexDirection } from "../hooks/useParentFlexDirection.js";

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
  const parentDirection = useParentFlexDirection();
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
    // Only override flex sizing when `flex` is actually specified. flexBasis:0 only makes sense along a
    // "row" parent's main axis (bubble width is always fixed) — a "column" parent's height is always
    // auto/content-driven, and flexBasis:0 there makes this Text contribute nothing to that calculation,
    // collapsing the whole auto-height ancestor chain. See box.tsx for the fuller explanation.
    // No flexShrink default when `flex` is undefined (unlike box.tsx): a plain label Text (e.g. "ITEMS"
    // next to a right-aligned price) needs to hold its natural width so its "align:end" sibling below is
    // the one that shrinks to fit — making this Text shrinkable too would let both compete for the same
    // space and truncate the label.
    ...(flex !== undefined
      ? {
          flexGrow: flex === 0 ? 0 : flex,
          flexShrink: 0,
          flexBasis: flex === 0 || parentDirection === "column" ? "auto" : 0,
        }
      : {}),
    // The space `margin` describes is this Text's own gap before its previous sibling — it must be
    // applied here too, not just forwarded to children via MarginSizeProvider below.
    marginTop: marginSize,
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
