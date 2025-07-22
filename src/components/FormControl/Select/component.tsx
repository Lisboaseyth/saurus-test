"use client";

import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { SelectCustomProps } from "./interface";

export const SelectCustom = ({
  label,
  error = null,
  children,
  ...props
}: SelectCustomProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel color={"#333333"} fontSize={"sm"} zIndex="30">
        {label}
      </FormLabel>
      <Select
        {...props}
        color={"#333333"}
        borderColor="#DEE5EE"
        transition="border 0.2s"
        _hover={{ boxShadow: "none", borderColor: "#DEE5EE" }}
        _focus={{ boxShadow: "none", borderColor: "#DEE5EE" }}
      >
        {children}
      </Select>
    </FormControl>
  );
};
