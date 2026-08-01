import {
  getActualSize,
  getButtonHeight,
  getMarginSize,
  getOffset,
  type ButtonComponent,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { TouchableOpacity as Touchable, View } from "react-native";

export const Button = ({
  action,
  adjustMode,
  color,
  flex,
  gravity,
  height,
  margin,
  offsetBottom,
  offsetEnd,
  offsetStart,
  offsetTop,
  position,
  scaling,
  style,
  onClick,
}: ButtonComponent & { onClick?: ClickHandler | undefined }) => {
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  return (
    <Touchable onPress={handleClick}>
      <View
        style={{
          ...(style === "primary" ? {
            color: "#fff",
            backgroundColor: "#17c950",
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 16,
            paddingRight: 16,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          } : {}),
          ...(style === "link" ? {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            color: "#42659a",
          } : {}),
          display: "flex",
          flex: flex === 0 ? 0 : flex,
          flexShrink: 0,
          flexGrow: flex === 0 ? 0 : 1,
          top: getActualSize(getOffset(offsetTop)),
          bottom: getActualSize(getOffset(offsetBottom)),
          left: getActualSize(getOffset(offsetStart)),
          right: getActualSize(getOffset(offsetEnd)),
          marginTop: getActualSize(getMarginSize(margin)),
          position: position === undefined ? "relative" : position,
          height: getActualSize(getButtonHeight(height)),
          backgroundColor: color,
        }}
      >
        {action.type === "uri" && action.label}
      </View>
    </Touchable>
  );
};
