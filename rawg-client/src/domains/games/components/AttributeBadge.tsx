import { Badge, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface AttributeBadgeProps {
  items: { id: number; name: string }[];
  colorScheme: string;
  onSetId: (id: number) => void;
}

const DEFAULT_VISIBLE_BADGES = 5;

const AttributeBadge = ({
  items,
  colorScheme,
  onSetId,
}: AttributeBadgeProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded
    ? items
    : items.slice(0, DEFAULT_VISIBLE_BADGES);
  const hasMore = items.length > DEFAULT_VISIBLE_BADGES;

  return (
    <Box display="flex" flexWrap="wrap" gap="8px">
      {visibleItems.map((item) => (
        <Badge
          key={item.id}
          colorScheme={colorScheme}
          variant="subtle"
          px={2}
          py={1}
          borderRadius="md"
          fontSize="sm"
          cursor="pointer"
          _hover={{ opacity: 0.8, textDecoration: "underline" }}
          onClick={() => {
            onSetId(item.id);
            navigate("/");
          }}
        >
          {item.name}
        </Badge>
      ))}
      {hasMore && (
        <Badge
          key="expand"
          colorScheme={colorScheme}
          variant="outline"
          px={2}
          py={1}
          borderRadius="md"
          fontSize="sm"
          cursor="pointer"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "▲" : "..."}
        </Badge>
      )}
    </Box>
  );
};

export default AttributeBadge;
