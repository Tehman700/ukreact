import React from "react";
import { ComponentConfig } from "@measured/puck";
import * as Icons from "lucide-react";
import { withLayout } from "../withLayout";

const popularIcons = [
  "Heart", "Star", "Zap", "Check", "X", "AlertCircle", "Info",
  "Mail", "Phone", "User", "Users", "Home", "Search", "Settings",
  "ShoppingCart", "Clock", "Calendar", "TrendingUp", "Award",
  "Briefcase", "Camera", "Coffee", "CreditCard", "Database",
  "Download", "Upload", "Eye", "FileText", "Gift", "Globe",
  "Lock", "Unlock", "Map", "MessageCircle", "Play", "Plus",
  "Minus", "Save", "Send", "Share2", "Shield", "ThumbsUp",
  "Trash2", "Video", "Wifi", "Bookmark", "Edit", "Filter",
];

const iconOptions = popularIcons.map((iconName) => ({
  label: iconName,
  value: iconName,
}));

export type CardGridProps = {
  columns: number;
  gap: number;
  mode: "array" | "dropzone";
  cards: Array<{
    title: string;
    content: string;
    icon?: string;
    image?: string;
    imagePosition?: "top" | "background";
    backgroundColor?: string;
  }>;  imageHeight?: number;
  showImages: boolean;
  cardMode: "flat" | "card" | "bordered" | "elevated";
  cardAlign: "left" | "center" | "right";
  showIcons: boolean;
  iconSize: number;
  iconColor: string;
  titleColor?: string;
  contentColor?: string;
  cardBackgroundColor?: string;
  responsive: boolean;
  minColumnWidth: string;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

const CardGridInternal: ComponentConfig<CardGridProps> = {
  fields: {
    mode: {
      type: "radio",
      label: "Content Mode",
      options: [
        { label: "Array (Edit List)", value: "array" },
        { label: "Drop Zone (Drag & Drop)", value: "dropzone" },
      ],
    },
    columns: {
      type: "number",
      label: "Number of Columns",
      min: 1,
      max: 6,
    },
    gap: {
      type: "number",
      label: "Gap (px)",
      min: 0,
      max: 100,
    },
    cards: {
      type: "array",
      label: "Cards",
      arrayFields: {
        title: { type: "text", label: "Title" },
        content: { type: "textarea", label: "Content" },
        image: { type: "text", label: "Image URL (optional)" },
        imagePosition: {
          type: "radio",
          label: "Image Position",
          options: [
            { label: "Top", value: "top" },
            { label: "Background", value: "background" },
          ],
        },
        icon: {
          type: "select",
          label: "Icon (if no image)",
          options: iconOptions,
        },
        backgroundColor: {
          type: "text",
          label: "Background Color (optional)",
        },
      },
      defaultItemProps: {
        title: "Card Title",
        content: "Card content goes here.",
        image: "",
        imagePosition: "top",
        icon: "Heart",
        backgroundColor: "white",
      },
      getItemSummary: (item) => item.title || "Card",
    },
    cardMode: {
      type: "radio",
      label: "Card Style",
      options: [
        { label: "Flat", value: "flat" },
        { label: "Card", value: "card" },
        { label: "Bordered", value: "bordered" },
        { label: "Elevated", value: "elevated" },
      ],
    },
    cardAlign: {
      type: "radio",
      label: "Text Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    showImages: {
      type: "radio",
      label: "Show Images",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    imageHeight: {
      type: "number",
      label: "Image Height (px)",
      min: 100,
      max: 500,
    },
    showIcons: {
      type: "radio",
      label: "Show Icons (if no image)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    iconSize: {
      type: "number",
      label: "Icon Size (px)",
      min: 16,
      max: 64,
    },
    iconColor: {
      type: "text",
      label: "Icon Color",
    },
    titleColor: {
      type: "text",
      label: "Title Color (e.g., #1f2937)",
    },
    contentColor: {
      type: "text",
      label: "Content Color (e.g., #6b7280)",
    },
    cardBackgroundColor: {
      type: "text",
      label: "Card Background Color (e.g., white)",
    },
    responsive: {
      type: "radio",
      label: "Responsive Grid",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    minColumnWidth: {
      type: "text",
      label: "Min Column Width (e.g., 250px)",
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
  },
  defaultProps: {
    mode: "array",
    columns: 3,
    gap: 24,
    cards: [
      {
        title: "Feature One",
        content: "Description of the first feature goes here.",
        icon: "Heart",
        backgroundColor: "white",
      },
      {
        title: "Feature Two",
        content: "Description of the second feature goes here.",
        icon: "Star",
        backgroundColor: "white",
      },
      {
        title: "Feature Three",
        content: "Description of the third feature goes here.",
        icon: "Zap",
        backgroundColor: "white",
      },
    ],
    cardMode: "card",
    cardAlign: "center",
    showImages: true,
    imageHeight: 200,
    showIcons: true,
    iconSize: 32,
    iconColor: "#3b82f6",
    titleColor: "#1f2937",
    contentColor: "#6b7280",
    cardBackgroundColor: "white",
    responsive: true,
    minColumnWidth: "280px",
    paddingTop: 64,
    paddingRight: 0,
    paddingBottom: 64,
    paddingLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  render: ({
    mode = "array",
    columns = 3,
    gap = 24,
    cards,
    cardMode,
    cardAlign,
    showImages = true,
    imageHeight = 200,
    showIcons,
    iconSize,
    iconColor,
    titleColor = "#1f2937",
    contentColor = "#6b7280",
    cardBackgroundColor = "white",
    responsive = true,
    minColumnWidth = "280px",
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    puck,
  }) => {
    const containerStyles: React.CSSProperties = {
      width: "100%",
      paddingTop: `${paddingTop}px`,
      paddingRight: `${paddingRight}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      marginTop: `${marginTop}px`,
      marginRight: `${marginRight}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
    };

    const gridStyles: React.CSSProperties = {
      display: "grid",
      gap: `${gap}px`,
      gridTemplateColumns: responsive
        ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`
        : `repeat(${columns}, 1fr)`,
      width: "100%",
    };

    // Drop zone mode - for drag and drop components
    if (mode === "dropzone") {
      return (
        <div style={containerStyles}>
          <div style={gridStyles}>
            {puck?.renderDropZone("card-items")}
          </div>
        </div>
      );
    }

    // Array mode - for editing cards in a list

    const getCardStyles = (card: any): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        backgroundColor: cardBackgroundColor || card.backgroundColor || "white",
        borderRadius: "0.75rem",
        textAlign: cardAlign,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        ...(cardMode === "card" && {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        }),
        ...(cardMode === "bordered" && {
          border: "1px solid #e5e7eb",
        }),
        ...(cardMode === "elevated" && {
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }),
      };

      // If background image mode
      if (card.image && card.imagePosition === "background") {
        return {
          ...baseStyles,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "1.5rem",
        };
      }

      return {
        ...baseStyles,
        padding: card.image && card.imagePosition === "top" ? "0" : "1.5rem",
      };
    };

    const imageStyles: React.CSSProperties = {
      width: "100%",
      height: `${imageHeight}px`,
      objectFit: "cover",
      display: "block",
    };

    const contentContainerStyles: React.CSSProperties = {
      padding: "1.5rem",
      flex: 1,
      display: "flex",
      flexDirection: "column",
    };

    const iconContainerStyles: React.CSSProperties = {
      display: "flex",
      justifyContent:
        cardAlign === "center" ? "center" : cardAlign === "right" ? "flex-end" : "flex-start",
      marginBottom: "1rem",
      color: iconColor,
    };

    const titleStyles: React.CSSProperties = {
      fontSize: "1.25rem",
      fontWeight: 600,
      marginBottom: "0.75rem",
      color: titleColor,
    };

    const contentStyles: React.CSSProperties = {
      fontSize: "1rem",
      color: contentColor,
      lineHeight: 1.6,
    };

    return (
      <div style={containerStyles}>
        <div style={gridStyles}>
          {cards.map((card, index) => {
            const IconComponent = card.icon ? Icons[card.icon as keyof typeof Icons] : null;
            const hasImage = showImages && card.image;
            const showIcon = !hasImage && showIcons && IconComponent;
            const isBackgroundImage = hasImage && card.imagePosition === "background";
            
            return (
              <div key={index} style={getCardStyles(card)}>
                {hasImage && card.imagePosition === "top" && (
                  <img src={card.image} alt={card.title} style={imageStyles} />
                )}
                <div style={hasImage && card.imagePosition === "top" ? contentContainerStyles : {}}>
                  {showIcon && (
                    <div style={iconContainerStyles}>
                      <IconComponent size={iconSize} />
                    </div>
                  )}
                  <div style={titleStyles}>{card.title}</div>
                  <div style={contentStyles}>{card.content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  zones: {
    "card-items": {
      title: "Card Items",
    },
  },
};

export const CardGrid = withLayout(CardGridInternal);
