"use client";

import { Box, Container } from "@chakra-ui/react";
import { NavContainerProps } from "./interface";

export function NavContent({
  children,
  maxW = "container.sm",
  h = "100vh",
  ...rest
}: NavContainerProps) {
  return (
    <Box w="full" transition="0.3s ease-in-out">
      <Container h={h} maxW={maxW} {...rest}>
        {children}
      </Container>
    </Box>
  );
}
