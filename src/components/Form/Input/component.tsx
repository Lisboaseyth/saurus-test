"use client";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { InputCustomProps } from "./interface";

export const InputCustom = ({
  label,
  error = null,
  icon,
  ...props
}: InputCustomProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel color={"#333333"} fontSize={"sm"} zIndex="30">
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          {...props}
          color={"#333333"}
          borderColor="#DEE5EE"
          transition="border 0.2s"
          _hover={{ boxShadow: "none", borderColor: "#DEE5EE" }}
          _focus={{ boxShadow: "none", borderColor: "#DEE5EE" }}
        />
        {icon && (
          <InputRightElement pointerEvents="none">
            <Icon as={icon} size={20} color="#718096" />
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && (
        <FormErrorMessage color={"rgba(220, 38, 42, 1)"}>
          {typeof error === "string" ? error : error?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
