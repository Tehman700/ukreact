import { initPlasmicLoader } from "@plasmicapp/loader-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./components/ui/accordion";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "uybcoC3uYbMZD87Kkt3K78",
      token: "OjQJ6TweklDskFBWpdyeHoWWwWECbQjyFrhIDY8uQteO6y7uyUuhUPV5pNEPpRdKH3q7beI1Kjr3fqaig"
    }
  ],
  preview: true,
});

// Register Button component
PLASMIC.registerComponent(Button, {
  name: 'Button',
  props: {
    children: 'slot',
    size: {
      type: 'choice',
      options: ['default', 'sm', 'lg', 'icon'],
      defaultValue: 'default',
    },
    variant: {
      type: 'choice',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      defaultValue: 'default',
    },
    className: 'string',
    onClick: 'eventHandler',
  },
  importPath: './components/ui/button',
});

// Register Card components
PLASMIC.registerComponent(Card, {
  name: 'Card',
  props: {
    children: 'slot',
    className: 'string',
  },
  importPath: './components/ui/card',
});

PLASMIC.registerComponent(CardContent, {
  name: 'CardContent',
  props: {
    children: 'slot',
    className: 'string',
  },
  importPath: './components/ui/card',
});

// Register Accordion components
PLASMIC.registerComponent(Accordion, {
  name: 'Accordion',
  props: {
    children: 'slot',
    type: {
      type: 'choice',
      options: ['single', 'multiple'],
      defaultValue: 'single',
    },
    collapsible: 'boolean',
    className: 'string',
  },
  importPath: './components/ui/accordion',
});

PLASMIC.registerComponent(AccordionItem, {
  name: 'AccordionItem',
  props: {
    children: 'slot',
    value: 'string',
    className: 'string',
  },
  importPath: './components/ui/accordion',
});

PLASMIC.registerComponent(AccordionTrigger, {
  name: 'AccordionTrigger',
  props: {
    children: 'slot',
    className: 'string',
  },
  importPath: './components/ui/accordion',
});

PLASMIC.registerComponent(AccordionContent, {
  name: 'AccordionContent',
  props: {
    children: 'slot',
    className: 'string',
  },
  importPath: './components/ui/accordion',
});