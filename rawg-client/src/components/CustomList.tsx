import { Box, useColorMode } from "@chakra-ui/react";
import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-url";
import { useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Response } from "../services/api-client";
import { FaEdit } from "react-icons/fa";

interface Props<T> {
  title: string;
  onSelectedItemId: (id?: number) => void;
  selectedItemId?: number;
  useDataHook: () => UseQueryResult<Response<T>, Error>;
}

interface Item {
  id: number;
  image_background: string;
  name: string;
}

// Helper to check admin login (simple version, adapt as needed)
function isAdminLoggedIn() {
  return !!localStorage.getItem("token");
}

const CustomList = <T extends Item>({
  onSelectedItemId,
  selectedItemId,
  title,
  useDataHook,
}: Props<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, isLoading, error } = useDataHook();
  const { colorMode } = useColorMode();

  const items = data?.results;

  const displayedItems = isExpanded ? items : items?.slice(0, 5);

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <Box marginBottom="6">
      <HStack>
        <Button
          variant="link"
          onClick={() => onSelectedItemId(undefined)}
          bg="transparent"
          _hover={{
            textDecoration: "none",
            color: colorMode === "light" ? "accent.600" : "white",
          }}
          fontSize="2xl"
          fontWeight="bold"
          color={colorMode === "light" ? "gray.800" : "white"}
          _active={{
            color: colorMode === "light" ? "accent.700" : "yellow.300",
            bg: colorMode === "light" ? "lightGray.300" : "accent.500",
          }}
        >
          <Heading size="lg">{title}</Heading>
        </Button>
        {/* Show admin update icon only if admin is logged in */}
        {isAdminLoggedIn() && (
          <Box
            as={FaEdit}
            boxSize={5}
            color={colorMode === "light" ? "gray.600" : "yellow.300"}
            cursor="pointer"
            title="Update"
            // onClick handler can be added here for admin update functionality
          />
        )}
      </HStack>
      <List>
        {displayedItems?.map((item) => (
          <ListItem key={item.id} paddingY="5px">
            <HStack>
              <Image
                src={getCroppedImageUrl(item.image_background)}
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
              />
              <Button
                textAlign="left"
                whiteSpace="normal"
                color={
                  selectedItemId === item.id
                    ? colorMode === "light"
                      ? "accent.700"
                      : "yellow.300"
                    : colorMode === "light"
                    ? "gray.800"
                    : "white"
                }
                variant="link"
                fontSize="lg"
                bg="transparent"
                _hover={{
                  textDecoration: "none",
                  color: colorMode === "light" ? "accent.600" : "white",
                  bg: colorMode === "light" ? "lightGray.300" : "accent.500",
                }}
                onClick={() => onSelectedItemId(item.id)}
              >
                {item.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
      <Button
        marginY="4"
        onClick={() => setIsExpanded(!isExpanded)}
        bg="transparent"
        color={colorMode === "light" ? "gray.800" : "white"}
        _hover={{
          bg: colorMode === "light" ? "lightGray.300" : "accent.500",
          color: colorMode === "light" ? "gray.900" : "white",
        }}
      >
        {isExpanded ? "Show less" : "Show more"}
      </Button>
    </Box>
  );
};

export default CustomList;
