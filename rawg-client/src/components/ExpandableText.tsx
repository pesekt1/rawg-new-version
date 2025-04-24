import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 300;
  const buttonBg = useColorModeValue("gray.200", "gray.700");
  const buttonColor = useColorModeValue("gray.900", "gray.100");
  const buttonHoverBg = useColorModeValue("gray.300", "gray.600");

  if (!children) return null;

  if (children.length <= LIMIT) return <Text>{children}</Text>;

  return (
    <Text>
      {!expanded ? children.slice(0, LIMIT) + "..." : children}
      <Button
        marginLeft={1}
        size="xs"
        fontWeight="bold"
        bg={buttonBg}
        color={buttonColor}
        _hover={{
          bg: buttonHoverBg,
          color: buttonColor,
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {!expanded ? "Show more" : "Show less"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
