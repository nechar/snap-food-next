"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/theme-tools"; // Correct import for extendTheme
import { ReactNode } from "react";

const theme = extendTheme({
  // Your custom theme configuration
});

export function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}