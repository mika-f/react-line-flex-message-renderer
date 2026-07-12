import React from "react";
import type {
  BoxComponent,
  ButtonComponent,
  FillerComponent,
  IconComponent,
  ImageComponent,
  SeparatorComponent,
  SpanComponent,
  TextComponent,
  VideoComponent,
} from "./interfaces/components/index.js";

const registry = new Map<string, (data: any) => React.ReactNode>();

type ComponentRegistrar = {
  box?: (data: BoxComponent) => React.ReactNode;
  button?: (data: ButtonComponent) => React.ReactNode;
  filler?: (data: FillerComponent) => React.ReactNode;
  icon?: (data: IconComponent) => React.ReactNode;
  image?: (data: ImageComponent) => React.ReactNode;
  separator?: (data: SeparatorComponent) => React.ReactNode;
  span?: (data: SpanComponent) => React.ReactNode;
  text?: (data: TextComponent) => React.ReactNode;
  video?: (data: VideoComponent) => React.ReactNode;
};

export const registerComponents = (components: ComponentRegistrar) => {
  Object.entries(components).forEach(([key, component]) => {
    if (component) {
      registry.set(key, component);
    }
  });
};

export const renderComponent = (
  data:
    | BoxComponent
    | ButtonComponent
    | FillerComponent
    | IconComponent
    | ImageComponent
    | SeparatorComponent
    | SpanComponent
    | TextComponent
    | VideoComponent,
) => {
  const componentType = data.type;
  const component = registry.get(componentType);
  if (!component) {
    throw new Error(`Component type "${componentType}" is not registered.`);
  }

  return component(data);
};
