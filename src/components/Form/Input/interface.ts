import { InputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";

export interface InputCustomProps extends InputProps {
  label: string;
  icon?: IconType;
  error?: FieldError | null | undefined;
}
