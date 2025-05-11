import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

/**
 * Props for the `ExpandableText` component.
 *
 * @property children - The text content to display, which can be expanded or collapsed.
 */
interface Props {
  children: string;
}

/**
 * A component that displays a text snippet with the ability to expand or collapse it.
 *
 * @param props - The props for the component.
 * @returns A `Text` component with a "Show more" or "Show less" button if the text exceeds the character limit.
 */
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
