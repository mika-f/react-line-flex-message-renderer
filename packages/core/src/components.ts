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
import type { Action } from "./interfaces/index.js";

const registry = new Map<string, (data: any, onClick: ClickHandler) => React.ReactNode>();

export type ClickHandler = (action: Action) => void;

type ComponentRegistrar = {
  box?: (data: BoxComponent, onClick: ClickHandler) => React.ReactNode;
  button?: (data: ButtonComponent, onClick: ClickHandler) => React.ReactNode;
  filler?: (data: FillerComponent, onClick: ClickHandler) => React.ReactNode;
  icon?: (data: IconComponent, onClick: ClickHandler) => React.ReactNode;
  image?: (data: ImageComponent, onClick: ClickHandler) => React.ReactNode;
  separator?: (data: SeparatorComponent, onClick: ClickHandler) => React.ReactNode;
  span?: (data: SpanComponent, onClick: ClickHandler) => React.ReactNode;
  text?: (data: TextComponent, onClick: ClickHandler) => React.ReactNode;
  video?: (data: VideoComponent, onClick: ClickHandler) => React.ReactNode;
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
  onClick?: (action: Action) => void,
) => {
  const componentType = data.type;
  const component = registry.get(componentType);
  if (!component) {
    throw new Error(`Component type "${componentType}" is not registered.`);
  }

  const handleClick = (action: Action) => {
    if (onClick) {
      onClick(action);
    }
  };

  return component(data, handleClick);
};
