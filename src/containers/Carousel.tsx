import type { ActionTypes } from "../components/actions";
import { Bubble, type BubbleProps } from "./Bubble";

interface CarouselProps {
  type?: "carousel";
  contents: BubbleProps[];

  onAction?: (action: ActionTypes) => void;
}

export function Carousel({ contents, onAction }: CarouselProps) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {contents.map((content, index) => (
        <Bubble key={index} {...content} onAction={onAction} />
      ))}
    </div>
  );
}
