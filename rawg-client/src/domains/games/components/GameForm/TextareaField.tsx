import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <FormControl mb={4}>
      <FormLabel>{label}</FormLabel>
      <Textarea value={value} onChange={onChange} placeholder={placeholder} />
    </FormControl>
  );
};

export default TextareaField;
