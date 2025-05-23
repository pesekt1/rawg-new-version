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

interface GameFormProps {
  initialValues: {
    name: string;
    slug: string;
    description_raw: string;
    released: string;
    background_image: string;
    website: string;
    genres: Entity[];
    parent_platforms: Entity[];
    stores: Entity[];
    publishers: Entity[];
    developers: Entity[];
    tags: Entity[];
  };
  genresData: { results: Entity[] } | undefined;
  genresLoading: boolean;
  genresError: any;
  platformsData: { results: Entity[] } | undefined;
  platformsLoading: boolean;
  platformsError: any;
  storesData: { results: Entity[] } | undefined;
  storesLoading: boolean;
  storesError: any;
  publishersData: { results: Entity[] } | undefined;
  publishersLoading: boolean;
  publishersError: any;
  developersData: { results: Entity[] } | undefined;
  developersLoading: boolean;
  developersError: any;
  tagsData: { results: Entity[] } | undefined;
  tagsLoading: boolean;
  tagsError: any;
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
  developersData,
  developersLoading,
  developersError,
  tagsData,
  tagsLoading,
  tagsError,
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
  const [website, setWebsite] = useState(initialValues.website);
  // Add website validation state
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<Entity[]>(
    initialValues.genres
  );
  const [genreToAdd, setGenreToAdd] = useState<number | "">("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Entity[]>(
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
  const [selectedDevelopers, setSelectedDevelopers] = useState<Entity[]>(
    initialValues.developers
  );
  const [developerToAdd, setDeveloperToAdd] = useState<number | "">("");
  const [selectedTags, setSelectedTags] = useState<Entity[]>(initialValues.tags);
  const [tagToAdd, setTagToAdd] = useState<number | "">("" );

  useEffect(() => {
    setName(initialValues.name);
    setSlug(initialValues.slug);
    setDescriptionRaw(initialValues.description_raw);
    setReleased(initialValues.released);
    setBackgroundImage(initialValues.background_image);
    setWebsite(initialValues.website);
    setSelectedGenres(initialValues.genres);
    setSelectedPlatforms(initialValues.parent_platforms);
    setSelectedStores(initialValues.stores);
    setSelectedPublishers(initialValues.publishers);
    setSelectedDevelopers(initialValues.developers);
    setSelectedTags(initialValues.tags);
  }, [initialValues]);

  const handleAdd = (
    toAdd: number | "",
    setToAdd: (v: number | "") => void,
    selected: Entity[],
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
    selected: Entity[],
    setSelected: (v: any[]) => void
  ) => {
    setSelected(selected.filter((g) => g.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate website URL
    if (website && !/^https?:\/\/.+/i.test(website)) {
      setWebsiteError("Website URL must start with http:// or https://");
      return;
    } else {
      setWebsiteError(null);
    }
    onSubmit({
      name,
      slug,
      description_raw,
      released,
      website,
      background_image: backgroundImage,
      genres: selectedGenres,
      parent_platforms: selectedPlatforms,
      stores: selectedStores,
      publishers: selectedPublishers,
      developers: selectedDevelopers,
      tags: selectedTags,
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
    // Website URL
    <FormControl mb={4} key="website" isInvalid={!!websiteError}>
      <FormLabel>Website URL</FormLabel>
      <Input
        value={website}
        onChange={(e) => {
          setWebsite(e.target.value);
          // Live validation
          if (e.target.value && !/^https?:\/\/.+/i.test(e.target.value)) {
            setWebsiteError("Website URL must start with http:// or https://");
          } else {
            setWebsiteError(null);
          }
        }}
        placeholder="https://example.com"
      />
      {websiteError && (
        <Box color="red.500" fontSize="sm" mt={1}>
          {websiteError}
        </Box>
      )}
    </FormControl>,
    // Tags group
    <Box key="tags-group" mb={4}>
      <FormControl mb={2}>
        <FormLabel>Add Tag</FormLabel>
        {tagsLoading ? (
          <Spinner size="sm" />
        ) : tagsError ? (
          <Alert status="error">
            <AlertIcon />
            Failed to load tags
          </Alert>
        ) : (
          <HStack>
            <Select
              placeholder="Select tag"
              value={tagToAdd}
              onChange={(e) =>
                setTagToAdd(e.target.value ? Number(e.target.value) : "")
              }
              maxW="200px"
            >
              {tagsData?.results
                .filter(
                  (t: any) => !selectedTags.some((st) => st.id === t.id)
                )
                .sort((a: Entity, b: Entity) => a.name.localeCompare(b.name))
                .map((tag: any) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
            </Select>
            <Button
              onClick={() =>
                handleAdd(
                  tagToAdd,
                  setTagToAdd,
                  selectedTags,
                  setSelectedTags,
                  tagsData
                )
              }
              isDisabled={!tagToAdd}
              colorScheme="teal"
              size="sm"
            >
              Add
            </Button>
          </HStack>
        )}
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Selected Tags</FormLabel>
        <HStack wrap="wrap">
          {selectedTags.map((tag) => (
            <Tag key={tag.id} m={1} colorScheme="purple">
              <TagLabel>{tag.name}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  handleRemove(tag.id, selectedTags, setSelectedTags)
                }
              />
            </Tag>
          ))}
        </HStack>
      </FormControl>
    </Box>,
    // Genres group
    <Box key="genres-group" mb={4}>
      <FormControl mb={2}>
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
                .filter(
                  (g: any) => !selectedGenres.some((sg) => sg.id === g.id)
                )
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
      </FormControl>
      <FormControl mb={2}>
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
      </FormControl>
    </Box>,
    // Platforms group
    <Box key="platforms-group" mb={4}>
      <FormControl mb={2}>
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
      </FormControl>
      <FormControl mb={2}>
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
      </FormControl>
    </Box>,
    // Stores group
    <Box key="stores-group" mb={4}>
      <FormControl mb={2}>
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
                .filter(
                  (s: any) => !selectedStores.some((ss) => ss.id === s.id)
                )
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
      </FormControl>
      <FormControl mb={2}>
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
      </FormControl>
    </Box>,
    // Publishers group
    <Box key="publishers-group" mb={4}>
      <FormControl mb={2}>
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
      </FormControl>
      <FormControl mb={2}>
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
      </FormControl>
    </Box>,
    // Developers group
    <Box key="developers-group" mb={4}>
      <FormControl mb={2}>
        <FormLabel>Add Developer</FormLabel>
        {developersLoading ? (
          <Spinner size="sm" />
        ) : developersError ? (
          <Alert status="error">
            <AlertIcon />
            Failed to load developers
          </Alert>
        ) : (
          <HStack>
            <Select
              placeholder="Select developer"
              value={developerToAdd}
              onChange={(e) =>
                setDeveloperToAdd(
                  e.target.value ? Number(e.target.value) : ""
                )
              }
              maxW="200px"
            >
              {developersData?.results
                .filter(
                  (d: any) => !selectedDevelopers.some((sd) => sd.id === d.id)
                )
                .map((developer: any) => (
                  <option key={developer.id} value={developer.id}>
                    {developer.name}
                  </option>
                ))}
            </Select>
            <Button
              onClick={() =>
                handleAdd(
                  developerToAdd,
                  setDeveloperToAdd,
                  selectedDevelopers,
                  setSelectedDevelopers,
                  developersData
                )
              }
              isDisabled={!developerToAdd}
              colorScheme="teal"
              size="sm"
            >
              Add
            </Button>
          </HStack>
        )}
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Selected Developers</FormLabel>
        <HStack wrap="wrap">
          {selectedDevelopers.map((developer) => (
            <Tag key={developer.id} m={1} colorScheme="teal">
              <TagLabel>{developer.name}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  handleRemove(
                    developer.id,
                    selectedDevelopers,
                    setSelectedDevelopers
                  )
                }
              />
            </Tag>
          ))}
        </HStack>
      </FormControl>
    </Box>,
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
