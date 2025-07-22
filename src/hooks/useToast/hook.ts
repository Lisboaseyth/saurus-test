import { useToast } from "@chakra-ui/react";
import { ToastError, ToastSettings } from "./interface";

export function useToastCustom() {
  const toastChakra = useToast();

  const settingsToast: ToastSettings = {
    position: "top-right",
    duration: 5000,
    isClosable: true,
  };
  function toastWithError(error: ToastError) {
    if (error) {
      const message = error?.message;
      if (message) {
        return toastChakra({
          title: message,
          status: "error",
          ...settingsToast,
        });
      }
      if (!message) {
        return toastChakra({
          title: "Erro interno no servidor!",
          description: "Falha ao se comunicar com o servidor",
          status: "error",
          ...settingsToast,
        });
      }
    }
  }

  return { toastWithError };
}
