import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 300;

  if (!children) return null;

  if (children.length <= LIMIT) return <Text>{children}</Text>;

  return (
    <Text>
      {!expanded ? children.slice(0, LIMIT) + "..." : children}
      <Button
        marginLeft={1}
        size="xs"
        fontWeight="bold"
        colorScheme="yellow"
        onClick={() => setExpanded(!expanded)}
      >
        {!expanded ? "Show more" : "Show less"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
