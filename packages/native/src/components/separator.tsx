import { getActualSize, getMarginSize, type SeparatorComponent } from "@ohmyteeth/line-flex-message-renderer-core";
import { View } from "react-native";

export const Separator = ({ margin, color }: SeparatorComponent) => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: color ?? "#d4d6da",
        marginTop: getActualSize(getMarginSize(margin)),
      }}
    />
  );
};
