import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'; // import utility to set light and dark mode props
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define a custom variant
const colorfulVariant = definePartsStyle((props) => {
  const { colorScheme: c } = props; // extract colorScheme from component props

  return {
    tab: {
      fontWeight: 'small',
      fontSize: 'sm',
      m: '1',
      justifyContent: 'left',
      borderRight: '1px',
      borderColor: mode(`${c}.100`, `${c}.400`)(props),
      pl: '5',
      borderTopRadius: 'xl',
      _hover: {
        bg: mode(`${c}.200`, `${c}.400`)(props),
      },
      _selected: {
        bg: mode(`${c}.100`, `${c}.400`)(props),
        color: '#9C1F23',
        borderColor: 'inherit',
        borderBottom: 'none',
        mb: '-2px',
        fontWeight: 'medium',
        fontSize: 'sm',
      },
    },
    tablist: {
      shadow: 'md',
      borderTop: 'aliceblue',
      mb: '1em',
      bg: mode(`${c}.50`, `${c}.700`)(props),
      px: '12',
      pt: '1',
    },
    tabpanel: {
      px: '10',
    },
  };
});

const variants = {
  colorful: colorfulVariant,
};

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ variants });

// now we can use the `colorful` variant with a different color Scheme
