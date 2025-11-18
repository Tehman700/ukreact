import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "./Section";

type LayoutVariant = "default" | "narrow" | "wide" | "full";

type LayoutProps = {
  layoutVariant: LayoutVariant;
};

const layoutOptions = [
  { label: "Default", value: "default" },
  { label: "Narrow (768px)", value: "narrow" },
  { label: "Wide (1440px)", value: "wide" },
  { label: "Full Width", value: "full" },
];

const layoutWidths: Record<Exclude<LayoutVariant, "full">, string> = {
  default: "1280px",
  narrow: "768px",
  wide: "1440px",
};

export const withLayout = <Props extends Record<string, any>>(
  component: ComponentConfig<Props>,
): ComponentConfig<Props & LayoutProps> => {
  return {
    ...component,
    fields: {
      ...component.fields,
      layoutVariant: {
        type: "select",
        label: "Layout Width",
        options: layoutOptions,
      },
    },
    defaultProps: {
      layoutVariant: "default",
      ...(component.defaultProps as Record<string, any>),
    } as Props & LayoutProps,
    render: (props) => {
      const { layoutVariant = "default", ...rest } = props as Props & LayoutProps;
      const content = component.render(rest as Props);

      if (layoutVariant === "full") {
        return <Section maxWidth="100%">{content}</Section>;
      }

      const maxWidth = layoutWidths[layoutVariant] ?? layoutWidths.default;
      return <Section maxWidth={maxWidth}>{content}</Section>;
    },
  };
};

