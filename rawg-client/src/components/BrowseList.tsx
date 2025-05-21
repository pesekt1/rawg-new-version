import {
  HStack,
  Text,
  Box,
  List,
  ListItem,
  useColorModeValue,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGamepad,
  FaDownload,
  FaCommentDots,
  FaGhost,
  FaUser,
  FaHashtag,
  FaCode,
  FaBookOpen,
} from "react-icons/fa";
import { useState } from "react";
import ExpandCollapseButton from "./ExpandCollapseButton";
import { useAuth } from "../domains/auth/useAuth";
import useGameQueryStore from "../state";
import ClearSelectionButton from "./CustomList/ClearSelectionButton";

const allItems = [
  { label: "Users", icon: FaUser, to: "/users", adminOnly: true },
  { label: "Reviews", icon: FaCommentDots, to: "/reviews" },
  //{ label: "Collections", icon: FaFolder, to: "/entities/collections" },
  { label: "Platforms", icon: FaGamepad, to: "/entities/platforms" },
  { label: "Stores", icon: FaDownload, to: "/entities/stores" },
  { label: "Genres", icon: FaGhost, to: "/entities/genres" },
  { label: "Developers", icon: FaCode, to: "/entities/developers" },
  { label: "Publishers", icon: FaBookOpen, to: "/entities/publishers" },
  //{ label: "Creators", icon: FaUser, to: "/entities/creators" },
  { label: "Tags", icon: FaHashtag, to: "/entities/tags" },
];

const DEFAULT_VISIBLE_ITEMS = 3;
const iconBoxSize = "26px";

const BrowseList = () => {
  const { role } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const iconColor = useColorModeValue("gray.500", "gray.400");
  const { colorMode } = useColorMode();
  const colorSelected = colorMode === "light" ? "accent.700" : "yellow.300";

  // Zustand browseListQuery state
  const browseListKey = useGameQueryStore((s) => s.browseListQuery.selectedKey);
  const setBrowseListKey = useGameQueryStore((s) => s.setBrowseListKey);
  const resetGameQuery = useGameQueryStore((s) => s.reset);
  const navigate = useNavigate();

  // Filter items based on admin role - dont show users to non-admins
  const items = allItems.filter((item) => !item.adminOnly || role === "admin");

  const displayedItems = isExpanded
    ? items
    : items.slice(0, DEFAULT_VISIBLE_ITEMS);

  return (
    <Box mb={4} pl={2}>
      <HStack>
        <Text fontWeight="bold" mb={2} fontSize="lg">
          Browse
        </Text>
      </HStack>
      <List spacing={1}>
        {displayedItems.map(({ label, icon: Icon, to }) => {
          const isActive = browseListKey === to;
          return (
            <ListItem key={label} px={0} py={0}>
              <Link to={to} style={{ textDecoration: "none" }}>
                <HStack
                  spacing={3}
                  px={2}
                  borderRadius={8}
                  cursor="pointer"
                  alignItems="center"
                  onClick={() => {
                    setBrowseListKey(to);
                    resetGameQuery();
                  }}
                >
                  <Box
                    as={Icon}
                    boxSize="26px"
                    color={iconColor}
                    borderRadius={8}
                  />
                  <Button
                    variant="customButton"
                    color={isActive ? colorSelected : undefined}
                    fontSize="sm"
                    p={1}
                    textAlign="left"
                    whiteSpace="normal"
                    _focus={{ boxShadow: "none" }}
                    onClick={(e) => {
                      e.currentTarget.blur();
                    }}
                  >
                    {label}
                  </Button>
                  {isActive && (
                    <ClearSelectionButton
                      onClear={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setBrowseListKey(undefined);
                        navigate("/"); // Go to HomePage to clear selection visually
                      }}
                    />
                  )}
                </HStack>
              </Link>
            </ListItem>
          );
        })}
        {items.length > DEFAULT_VISIBLE_ITEMS && (
          <ListItem px={0} py={0}>
            <HStack pl={2}>
              <ExpandCollapseButton
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded((v) => !v)}
                iconSize={iconBoxSize}
              />
            </HStack>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default BrowseList;
