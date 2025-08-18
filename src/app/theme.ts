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
    50:  '#f2f6f8',
    100: '#d9e3e9',
    200: '#b3c8d4',
    300: '#8daebe',
    400: '#668ea5',
    500: '#406f89',
    600: '#1e4759', // base
    700: '#193a48',
    800: '#122b36',
    900: '#0c1d25',
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
