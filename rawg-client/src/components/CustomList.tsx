import { Box } from "@chakra-ui/react";
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

const CustomList = <T extends Item>({
  onSelectedItemId,
  selectedItemId,
  title,
  useDataHook,
}: Props<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, isLoading, error } = useDataHook();

  const items = data?.results;

  const displayedItems = isExpanded ? items : items?.slice(0, 5);

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <Box marginBottom="6">
      <Button
        variant="link"
        onClick={() => onSelectedItemId(undefined)}
        bg="transparent"
        _hover={{ textDecoration: "none", color: "white" }}
        fontSize="2xl" // Increased font size
        fontWeight="bold"
        color="white"
        _active={{
          color: "yellow.300",
          bg: "accent.500",
        }}
      >
        <Heading size="lg">{title}</Heading> {/* Adjusted heading size */}
      </Button>
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
                color={selectedItemId === item.id ? "yellow.300" : "white"}
                variant="link"
                fontSize="lg"
                bg="transparent"
                _hover={{
                  textDecoration: "none",
                  color: "white",
                  bg: "accent.500",
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
        color="white"
        _hover={{
          bg: "accent.500",
          color: "white",
        }}
      >
        {isExpanded ? "Show less" : "Show more"}
      </Button>
    </Box>
  );
};

export default CustomList;
