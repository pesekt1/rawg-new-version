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
  onSelectedItem: (item: T | null) => void;
  selectedItem: T | null;
  useDataHook: () => UseQueryResult<Response<T>, Error>;
}

interface Item {
  id: number;
  image_background: string;
  name: string;
}

const CustomList = <T extends Item>({
  onSelectedItem,
  selectedItem,
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
    <>
      <Button variant="link" onClick={() => onSelectedItem(null)}>
        <Heading>{title}</Heading>
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
                colorScheme={selectedItem?.id === item.id ? "yellow" : "gray"}
                variant="link"
                fontSize="lg"
                onClick={() => onSelectedItem(item)}
              >
                {item.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
        <Button marginY="4" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      </List>
    </>
  );
};

export default CustomList;
