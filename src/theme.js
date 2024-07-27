import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    blue: {
      500: '#2388FF',
    },
    black: {
      500: '#19213D',
    },
    white: {
      500: '#FFFFFF',
    },
    background: {
      500: '#F6FAFF',
    },
    gray: {
      500: '#8C909E',
    },
    whiteGray: {
      500: '#E3E6EA',
    },
    darkBlue: {
      500: '#666F8D',
    },
    lightGray: {
      500: '#BAC0CC',
    },
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#F6FAFF',
        color: '#19213D',
      },
    },
  },
});

export default theme;
