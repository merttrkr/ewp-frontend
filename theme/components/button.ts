import { useColorModeValue } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { mode } from '@chakra-ui/theme-tools';

const baseStyle = defineStyle({
  borderRadius: 0,
  fontWeight: "normal",
  fontFamily: "mono",
});

const sizes = {
  md: defineStyle({
    fontSize: "sm",
  }),
};

const submitVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    fontFamily: "heading",
    w: ["100%", "15%"],
    bg: mode("#20558B", "#0E3051")(props),
    color: "white",
    borderRadius: 'md',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _hover: {
      bg: '#9C1F23',
      boxShadow: "xl",
      transform: "scale(1.02, 1.02)",
    },
  };
});

const clearVariant = defineStyle(() => {
  return {
    border: "2px",
    fontFamily: "heading",
    w: ["100%", "15%"],
    bg: "white",
    color: mode("#20558B", "#0E3051"),
    borderRadius: 'md',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _hover: {
      color: '#9C1F23',
      boxShadow: "xl",
      transform: "scale(1.02, 1.02)",
    },
    _active: {
      transform: "scale(1, 1)",
    },
  };
});

const conditionVariant = defineStyle(() => {
  return {
    border: "2px",
    fontFamily: "heading",
    w: ["100%", "auto"],
    borderColor: "#20558B",
    color: '#20558B',
    borderRadius: 'md',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _hover: {
      borderColor: '#9C1F23',
      color: '#9C1F23',
      boxShadow: "xl",
      transform: "scale(1.02, 1.02)",
    },
    _active: {
      transform: "scale(1, 1)",
    },

    _dark: {
      color: "white",
    },
  };
});

const autoWidthFullVariant = defineStyle(() => {
  return {
    border: "2px",
    fontFamily: "heading",
    w: ["100%", "auto"],
    bg: mode("#9C1F23", "#0E3051"),
    color: "white",
    borderColor: "#9C1F23",
    borderRadius: 'md',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _hover: {
      borderColor: "#20558B",
      bg: '#20558B',
      boxShadow: "xl",
      transform: "scale(1.02, 1.02)",
    },
  };
});

const whiteVariant = defineStyle(() => {
  return {
    border: "2px",
    fontFamily: "heading",
    w: ["100%", "auto"],
    h: "8",
    fontSize: "sm",
    color: mode("white", "#0E3051"),
    borderColor: mode("white", "#0E3051"),
    borderRadius: 'md',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _hover: {
      boxShadow: "xl",
      transform: "scale(1.02, 1.02)",
    },
  };
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    submit: submitVariant,
    clear: clearVariant,
    condition: conditionVariant,
    autoWidthFull: autoWidthFullVariant,
    white: whiteVariant,
  },
});
