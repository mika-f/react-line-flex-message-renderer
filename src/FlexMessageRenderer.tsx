import type { ActionCallback } from "./components/actions";
import { Bubble } from "./containers/Bubble";
import { Carousel } from "./containers/Carousel";

export interface FlexMessageRendererProps {
  /**
   * A JSON string representing the Flex Message to be rendered.
   */
  json: string;

  onAction?: ActionCallback;
}

/**
 * Renders a Flex Message based on the provided JSON string.
 */
export function FlexMessageRenderer({
  json,
  onAction,
}: FlexMessageRendererProps) {
  const data = JSON.parse(json);

  return (
    <>
      {data.type === "carousel" && <Carousel {...data} onAction={onAction} />}
      {data.type === "bubble" && <Bubble {...data} onAction={onAction} />}
    </>
  );
}
