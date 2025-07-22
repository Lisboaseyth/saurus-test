import { ToastProps, UseToastOptions } from "@chakra-ui/react";

export interface ToastSettings extends UseToastOptions {
  position: UseToastOptions["position"];
  duration: UseToastOptions["duration"];
  isClosable: UseToastOptions["isClosable"];
}

export interface ToastError extends ToastProps {
  errors?: {
    [key: string]: Array<string>;
  };
  message?: string;
}
