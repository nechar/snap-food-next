import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#319795',
      600: '#2C7A7B',
      700: '#285E61',
      800: '#234E52',
      900: '#1D4044',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : 'gray.600',
          color: 'white',
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : 'gray.700',
          },
        }),
      },
    },
    Heading: {
      baseStyle: {
        color: 'gray.700',
      },
    },
    Container: {
      baseStyle: {
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'lg',
        p: 6,
        mt: 8,
      },
    },
    Accordion: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: 'lg',
          boxShadow: 'md',
          mt: 4,
        },
      },
    },
  },
});

export default theme;
