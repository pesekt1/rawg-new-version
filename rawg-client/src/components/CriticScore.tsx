import { Badge } from "@chakra-ui/react";
import React from "react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  const getColor = (score: number) => {
    if (score >= 75) return "green";
    if (score >= 50) return "yellow";
    return "red";
  };

  return (
    <Badge
      border="1px solid"
      fontSize="14px"
      paddingX={2}
      borderRadius="4px"
      colorScheme={getColor(score)}
    >
      {score}
    </Badge>
  );
};

export default CriticScore;
