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
  handleIcon,
  placeholder,
  ...props
}: InputCustomProps) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel color={"#333333"} fontSize={"sm"} zIndex="30">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <Input
          placeholder={placeholder}
          {...props}
          color={"#333333"}
          borderColor="#abf8cbff"
          transition="border 0.2s"
          _hover={{ boxShadow: "none", borderColor: "#DEE5EE" }}
          _focus={{ boxShadow: "none", borderColor: "#DEE5EE" }}
        />
        {icon && (
          <InputRightElement onClick={handleIcon}>
            <Icon as={icon} boxSize={5} color="#718096" />
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
