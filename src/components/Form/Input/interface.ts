import { InputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";
import { Props } from "react-input-mask";

export interface InputCustomProps extends InputProps {
  label?: string;
  placeholder?: string;
  icon?: IconType;
  error?: FieldError | null | undefined;
  mask?: Props["mask"];
  maskChar?: Props["maskChar"];
  handleIcon?: () => void;
}
