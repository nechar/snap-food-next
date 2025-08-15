"use client";

import { ChakraProvider } from "@chakra-ui/react";// Correct import for extendTheme
import { ReactNode } from "react";


export function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider >{children}</ChakraProvider>;
}