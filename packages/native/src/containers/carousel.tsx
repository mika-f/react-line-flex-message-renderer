import {
  type CarouselContainer,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { StyleSheet, View } from "react-native";
import { Bubble } from "./bubble.js";

export const Carousel = ({ contents, onClick }: CarouselContainer & { onClick?: ClickHandler }) => {
  return (
    <View style={Styles.carousel} >
      {contents.map((bubble, index) => (
        <Bubble key={index} {...bubble} onClick={onClick} />
      ))}
    </View>
  );
};

const Styles = StyleSheet.create({
  carousel: {
    display: "flex",
    flexDirection: "row",
    overflow: "scroll",
    columnGap: "20px",
    alignItems: "stretch"
  },
});
