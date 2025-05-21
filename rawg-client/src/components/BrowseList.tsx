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
import { Link, useLocation } from "react-router-dom";
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

const allItems = [
  { label: "Users", icon: FaUser, to: "/users", adminOnly: true },
  { label: "Reviews", icon: FaCommentDots, to: "/entities/reviews" },
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
  const location = useLocation();
  const { role } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const iconColor = useColorModeValue("gray.500", "gray.400");
  const { colorMode } = useColorMode();
  const colorSelected = colorMode === "light" ? "accent.700" : "yellow.300";

  // Filter items based on admin role - dont show users to non-admins
  const items = allItems.filter((item) => !item.adminOnly || role === "admin");

  const displayedItems = isExpanded
    ? items
    : items.slice(0, DEFAULT_VISIBLE_ITEMS);

  return (
    <Box mb={4} pl={2}>
      <Text fontWeight="bold" mb={2} fontSize="lg">
        Browse
      </Text>
      <List spacing={1}>
        {displayedItems.map(({ label, icon: Icon, to }) => {
          const isActive = location.pathname === to;
          return (
            <ListItem key={label} px={0} py={0}>
              <Link to={to} style={{ textDecoration: "none" }}>
                <HStack
                  spacing={3}
                  px={2}
                  borderRadius={8}
                  cursor="pointer"
                  alignItems="center"
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
                      // Let Link handle navigation, but trigger :active styles
                      e.currentTarget.blur();
                    }}
                  >
                    {label}
                  </Button>
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
