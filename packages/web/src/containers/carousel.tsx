import { type CarouselContainer } from "@ohmyteeth/line-flex-message-renderer-core";
import { Bubble } from "./bubble.js";
import styles from "./carousel.module.css";

export const Carousel = ({ contents }: CarouselContainer) => {
  return (
    <div className={styles.carousel}>
      {contents.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
    </div>
  );
};
