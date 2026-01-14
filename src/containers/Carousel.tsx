import { Bubble } from "./Bubble";

interface CarouselProps {
  contents: string[];
}

export function Carousel({ contents }: CarouselProps) {
  return (
    <div>
      {contents.map((content, index) => (
        <Bubble key={index} size="mega" />
      ))}
    </div>
  );
}
