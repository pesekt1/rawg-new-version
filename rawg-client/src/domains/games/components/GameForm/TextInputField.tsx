import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import React from "react";

interface TextInputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  type?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isRequired = false,
  isInvalid = false,
  errorMessage,
  type = "text",
}) => {
  return (
    <FormControl mb={4} isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Input value={value} onChange={onChange} placeholder={placeholder} type={type} />
      {isInvalid && errorMessage && (
        <Box color="red.500" fontSize="sm" mt={1}>
          {errorMessage}
        </Box>
      )}
    </FormControl>
  );
};

export default TextInputField;
