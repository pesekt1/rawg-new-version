import {
  useBreakpointValue,
  Box,
  Heading,
  Alert,
  AlertIcon,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Spinner,
  HStack,
  Select,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import React from "react";

interface Entity {
  id: number;
  name: string;
}
interface Platform {
  id: number;
  name: string;
}
interface GameFormProps {
  initialValues: {
    name: string;
    slug: string;
    description_raw: string;
    released: string;
    background_image: string;
    genres: Entity[];
    parent_platforms: Platform[];
    stores: Entity[];
    publishers: Entity[];
  };
  genresData: { results: Entity[] } | undefined;
  genresLoading: boolean;
  genresError: any;
  platformsData: { results: Platform[] } | undefined;
  platformsLoading: boolean;
  platformsError: any;
  storesData: { results: Entity[] } | undefined;
  storesLoading: boolean;
  storesError: any;
  publishersData: { results: Entity[] } | undefined;
  publishersLoading: boolean;
  publishersError: any;
  onSubmit: (values: any) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  buttonLabel: string;
  heading: string;
  successMessage: string;
}

const GameForm = ({
  initialValues,
  genresData,
  genresLoading,
  genresError,
  platformsData,
  platformsLoading,
  platformsError,
  storesData,
  storesLoading,
  storesError,
  publishersData,
  publishersLoading,
  publishersError,
  onSubmit,
  isLoading,
  isSuccess,
  isError,
  error,
  buttonLabel,
  heading,
  successMessage,
}: GameFormProps) => {
  const [name, setName] = useState(initialValues.name);
  const [slug, setSlug] = useState(initialValues.slug);
  const [description_raw, setDescriptionRaw] = useState(
    initialValues.description_raw
  );
  const [released, setReleased] = useState(initialValues.released);
  const [backgroundImage, setBackgroundImage] = useState(
    initialValues.background_image
  );
  const [selectedGenres, setSelectedGenres] = useState<Entity[]>(
    initialValues.genres
  );
  const [genreToAdd, setGenreToAdd] = useState<number | "">("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(
    initialValues.parent_platforms
  );
  const [platformToAdd, setPlatformToAdd] = useState<number | "">("");
  const [selectedStores, setSelectedStores] = useState<Entity[]>(
    initialValues.stores
  );
  const [storeToAdd, setStoreToAdd] = useState<number | "">("");
  const [selectedPublishers, setSelectedPublishers] = useState<Entity[]>(
    initialValues.publishers
  );
  const [publisherToAdd, setPublisherToAdd] = useState<number | "">("");

  useEffect(() => {
    setName(initialValues.name);
    setSlug(initialValues.slug);
    setDescriptionRaw(initialValues.description_raw);
    setReleased(initialValues.released);
    setBackgroundImage(initialValues.background_image);
    setSelectedGenres(initialValues.genres);
    setSelectedPlatforms(initialValues.parent_platforms);
    setSelectedStores(initialValues.stores);
    setSelectedPublishers(initialValues.publishers);
  }, [initialValues]);

  const handleAdd = (
    toAdd: number | "",
    setToAdd: (v: number | "") => void,
    selected: Entity[] | Platform[],
    setSelected: (v: any[]) => void,
    data: { results: any[] } | undefined
  ) => {
    if (toAdd && !selected.some((g) => g.id === toAdd) && data?.results) {
      const obj = data.results.find((g: any) => g.id === toAdd);
      if (obj) {
        setSelected([...selected, obj]);
        setToAdd("");
      }
    }
  };

  const handleRemove = (
    id: number,
    selected: Entity[] | Platform[],
    setSelected: (v: any[]) => void
  ) => {
    setSelected(selected.filter((g) => g.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      slug,
      description_raw,
      released,
      background_image: backgroundImage,
      genres: selectedGenres,
      parent_platforms: selectedPlatforms.map((p) => ({ platform: p })),
      stores: selectedStores,
      publishers: selectedPublishers,
    });
  };

  // Define your fields as an array of React nodes
  const fieldNodes = [
    // Name
    <FormControl mb={4} isRequired key="name">
      <FormLabel>Name</FormLabel>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Game name"
      />
    </FormControl>,
    // Slug
    <FormControl mb={4} isRequired key="slug">
      <FormLabel>Slug</FormLabel>
      <Input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="game-slug"
      />
    </FormControl>,
    // Description
    <FormControl mb={4} key="desc">
      <FormLabel>Description</FormLabel>
      <Textarea
        value={description_raw}
        onChange={(e) => setDescriptionRaw(e.target.value)}
        placeholder="Game description"
      />
    </FormControl>,
    // Release Date
    <FormControl mb={4} key="release">
      <FormLabel>Release Date</FormLabel>
      <Input
        type="date"
        value={released}
        onChange={(e) => setReleased(e.target.value)}
        placeholder="YYYY-MM-DD"
      />
    </FormControl>,
    // Image URL
    <FormControl mb={4} key="img">
      <FormLabel>Image URL</FormLabel>
      <Input
        value={backgroundImage}
        onChange={(e) => setBackgroundImage(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />
    </FormControl>,
    // Genres
    <FormControl mb={2} key="add-genre">
      <FormLabel>Add Genre</FormLabel>
      {genresLoading ? (
        <Spinner size="sm" />
      ) : genresError ? (
        <Alert status="error">
          <AlertIcon />
          Failed to load genres
        </Alert>
      ) : (
        <HStack>
          <Select
            placeholder="Select genre"
            value={genreToAdd}
            onChange={(e) =>
              setGenreToAdd(e.target.value ? Number(e.target.value) : "")
            }
            maxW="200px"
          >
            {genresData?.results
              .filter((g: any) => !selectedGenres.some((sg) => sg.id === g.id))
              .map((genre: any) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
          </Select>
          <Button
            onClick={() =>
              handleAdd(
                genreToAdd,
                setGenreToAdd,
                selectedGenres,
                setSelectedGenres,
                genresData
              )
            }
            isDisabled={!genreToAdd}
            colorScheme="teal"
            size="sm"
          >
            Add
          </Button>
        </HStack>
      )}
    </FormControl>,
    <FormControl mb={4} key="selected-genres">
      <FormLabel>Selected Genres</FormLabel>
      <HStack wrap="wrap">
        {selectedGenres.map((genre) => (
          <Tag key={genre.id} m={1} colorScheme="teal">
            <TagLabel>{genre.name}</TagLabel>
            <TagCloseButton
              onClick={() =>
                handleRemove(genre.id, selectedGenres, setSelectedGenres)
              }
            />
          </Tag>
        ))}
      </HStack>
    </FormControl>,
    // Platforms
    <FormControl mb={2} key="add-platform">
      <FormLabel>Add Platform</FormLabel>
      {platformsLoading ? (
        <Spinner size="sm" />
      ) : platformsError ? (
        <Alert status="error">
          <AlertIcon />
          Failed to load platforms
        </Alert>
      ) : (
        <HStack>
          <Select
            placeholder="Select platform"
            value={platformToAdd}
            onChange={(e) =>
              setPlatformToAdd(e.target.value ? Number(e.target.value) : "")
            }
            maxW="200px"
          >
            {platformsData?.results
              .filter(
                (p: any) => !selectedPlatforms.some((sp) => sp.id === p.id)
              )
              .map((platform: any) => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
          </Select>
          <Button
            onClick={() =>
              handleAdd(
                platformToAdd,
                setPlatformToAdd,
                selectedPlatforms,
                setSelectedPlatforms,
                platformsData
              )
            }
            isDisabled={!platformToAdd}
            colorScheme="teal"
            size="sm"
          >
            Add
          </Button>
        </HStack>
      )}
    </FormControl>,
    <FormControl mb={4} key="selected-platforms">
      <FormLabel>Selected Platforms</FormLabel>
      <HStack wrap="wrap">
        {selectedPlatforms.map((platform) => (
          <Tag key={platform.id} m={1} colorScheme="teal">
            <TagLabel>{platform.name}</TagLabel>
            <TagCloseButton
              onClick={() =>
                handleRemove(
                  platform.id,
                  selectedPlatforms,
                  setSelectedPlatforms
                )
              }
            />
          </Tag>
        ))}
      </HStack>
    </FormControl>,
    // Stores
    <FormControl mb={2} key="add-store">
      <FormLabel>Add Store</FormLabel>
      {storesLoading ? (
        <Spinner size="sm" />
      ) : storesError ? (
        <Alert status="error">
          <AlertIcon />
          Failed to load stores
        </Alert>
      ) : (
        <HStack>
          <Select
            placeholder="Select store"
            value={storeToAdd}
            onChange={(e) =>
              setStoreToAdd(e.target.value ? Number(e.target.value) : "")
            }
            maxW="200px"
          >
            {storesData?.results
              .filter((s: any) => !selectedStores.some((ss) => ss.id === s.id))
              .map((store: any) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
          </Select>
          <Button
            onClick={() =>
              handleAdd(
                storeToAdd,
                setStoreToAdd,
                selectedStores,
                setSelectedStores,
                storesData
              )
            }
            isDisabled={!storeToAdd}
            colorScheme="teal"
            size="sm"
          >
            Add
          </Button>
        </HStack>
      )}
    </FormControl>,
    <FormControl mb={4} key="selected-stores">
      <FormLabel>Selected Stores</FormLabel>
      <HStack wrap="wrap">
        {selectedStores.map((store) => (
          <Tag key={store.id} m={1} colorScheme="teal">
            <TagLabel>{store.name}</TagLabel>
            <TagCloseButton
              onClick={() =>
                handleRemove(store.id, selectedStores, setSelectedStores)
              }
            />
          </Tag>
        ))}
      </HStack>
    </FormControl>,
    // Publishers
    <FormControl mb={2} key="add-publisher">
      <FormLabel>Add Publisher</FormLabel>
      {publishersLoading ? (
        <Spinner size="sm" />
      ) : publishersError ? (
        <Alert status="error">
          <AlertIcon />
          Failed to load publishers
        </Alert>
      ) : (
        <HStack>
          <Select
            placeholder="Select publisher"
            value={publisherToAdd}
            onChange={(e) =>
              setPublisherToAdd(e.target.value ? Number(e.target.value) : "")
            }
            maxW="200px"
          >
            {publishersData?.results
              .filter(
                (p: any) => !selectedPublishers.some((sp) => sp.id === p.id)
              )
              .map((publisher: any) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
          </Select>
          <Button
            onClick={() =>
              handleAdd(
                publisherToAdd,
                setPublisherToAdd,
                selectedPublishers,
                setSelectedPublishers,
                publishersData
              )
            }
            isDisabled={!publisherToAdd}
            colorScheme="teal"
            size="sm"
          >
            Add
          </Button>
        </HStack>
      )}
    </FormControl>,
    <FormControl mb={4} key="selected-publishers">
      <FormLabel>Selected Publishers</FormLabel>
      <HStack wrap="wrap">
        {selectedPublishers.map((publisher) => (
          <Tag key={publisher.id} m={1} colorScheme="teal">
            <TagLabel>{publisher.name}</TagLabel>
            <TagCloseButton
              onClick={() =>
                handleRemove(
                  publisher.id,
                  selectedPublishers,
                  setSelectedPublishers
                )
              }
            />
          </Tag>
        ))}
      </HStack>
    </FormControl>,
  ];

  // Determine number of columns dynamically
  const columnsCount = useBreakpointValue({ base: 1, md: 2, lg: 3 }) ?? 1;
  // Chunk fields into columns
  const chunkedFields = Array.from({ length: columnsCount }, (_, i) =>
    fieldNodes.filter((_, idx) => idx % columnsCount === i)
  );

  return (
    <Box w="100%" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading mb={6} size="lg">
        {heading}
      </Heading>
      {isSuccess && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      {isError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {(error as any)?.response?.data?.error || "Failed"}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={columnsCount} spacing={6}>
          {chunkedFields.map((fields, idx) => (
            <Box key={idx}>{fields}</Box>
          ))}
        </SimpleGrid>
        <Button mt={6} type="submit" colorScheme="teal" isLoading={isLoading}>
          {buttonLabel}
        </Button>
      </form>
    </Box>
  );
};

export default GameForm;
