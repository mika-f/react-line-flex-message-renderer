import {
  type CarouselContainer,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { ScrollView, StyleSheet } from "react-native";
import { Bubble } from "./bubble.js";

export const Carousel = ({ contents, onClick }: CarouselContainer & { onClick?: ClickHandler }) => {
  return (
    // TODO: web uses `scroll-snap-type: x mandatory` to snap between bubbles; ScrollView has no direct
    // equivalent (would need `snapToInterval`/`snapToOffsets`, which assume a fixed bubble width per size).
    <ScrollView horizontal contentContainerStyle={Styles.carousel}>
      {contents.map((bubble, index) => (
        <Bubble key={index} {...bubble} onClick={onClick} />
      ))}
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  carousel: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "stretch",
  },
});
