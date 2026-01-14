import { Bubble } from "./containers/Bubble";
import { Carousel } from "./containers/Carousel";

interface FlexMessageRendererProps {
  /**
   * A JSON string representing the Flex Message to be rendered.
   */
  json: string;
}

/**
 * Renders a Flex Message based on the provided JSON string.
 */
export function FlexMessageRenderer({ json }: FlexMessageRendererProps) {
  const data = JSON.parse(json);

  return (
    <>
      {data.type === "carousel" && <Carousel contents={data.contents} />}
      {data.type === "bubble" && <Bubble></Bubble>}
    </>
  );
}
