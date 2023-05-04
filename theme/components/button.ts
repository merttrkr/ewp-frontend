import { useColorModeValue } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { mode } from '@chakra-ui/theme-tools'; // import utility to set light and dark mode props

const baseStyle = defineStyle({
  borderRadius: 0, // disable the border radius
  fontWeight: "normal", // change the font weight to normal
  fontFamily: "mono", // change the font family to monospaced
})

const sizes = {
  md: defineStyle({
    fontSize: "sm", // Change font size to sm (14px)
  }),
}

// Defining a custom variant
const submitVariant = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    fontFamily: "heading",
    w: "15%",
    bg: mode("#20558B", "#0E3051"),
    color: "white",
    borderRadius: 'md',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _hover: {
      bg: '#9C1F23',
      boxShadow: "xl",
      transform: "scale(1.02, 1.02)",
    },
  }
})

// Defining a custom variant
const clearVariant = defineStyle(() => {
  return {
    border: "2px",
    fontFamily: "heading",
    w: "15%",
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
  }
})

// Defining a custom variant
const conditionVariant = defineStyle(() => {
  return {
    border: "2px",
    fontFamily: "heading",
    w: "auto",
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
  }
})

// Defining a custom variant
const previewOrSaveVariant = defineStyle(() => {
  return {
    border: "2px",
    fontFamily: "heading",
    w: "auto",
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
    }
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    submit: submitVariant,
    clear: clearVariant,
    condition: conditionVariant,
    previewOrSave: previewOrSaveVariant,
  },
})