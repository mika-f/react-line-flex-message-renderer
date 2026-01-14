interface BubbleProps {
  size?: "giga" | "mega" | "kilo" | "micro" | "nano";
}

export function Bubble({ size = "mega" }: BubbleProps) {
  return <div>a</div>;
}
