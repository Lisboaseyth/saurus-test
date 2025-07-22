import { SelectProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

export interface SelectCustomProps extends SelectProps {
  label: string;
  error?: FieldError | null | undefined;
}
