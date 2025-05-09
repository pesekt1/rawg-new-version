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
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import React from "react";
import DevelopersGroup from "./DevelopersGroup";
import GenresGroup from "./GenresGroup";
import PlatformsGroup from "./PlatformsGroup";
import PublishersGroup from "./PublishersGroup";
import StoresGroup from "./StoresGroup";
import TagsGroup from "./TagsGroup";

export interface Entity {
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
    <TagsGroup
      key="tags-group"
      tagsData={tagsData}
      tagsLoading={tagsLoading}
      tagsError={tagsError}
      selectedTags={selectedTags}
      setSelectedTags={setSelectedTags}
      tagToAdd={tagToAdd}
      setTagToAdd={setTagToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />,
    // Genres group
    <GenresGroup
      key="genres-group"
      genresData={genresData}
      genresLoading={genresLoading}
      genresError={genresError}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
      genreToAdd={genreToAdd}
      setGenreToAdd={setGenreToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />,
    // Platforms group
    <PlatformsGroup
      key="platforms-group"
      platformsData={platformsData}
      platformsLoading={platformsLoading}
      platformsError={platformsError}
      selectedPlatforms={selectedPlatforms}
      setSelectedPlatforms={setSelectedPlatforms}
      platformToAdd={platformToAdd}
      setPlatformToAdd={setPlatformToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />,
    // Stores group
    <StoresGroup
      key="stores-group"
      storesData={storesData}
      storesLoading={storesLoading}
      storesError={storesError}
      selectedStores={selectedStores}
      setSelectedStores={setSelectedStores}
      storeToAdd={storeToAdd}
      setStoreToAdd={setStoreToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />,
    // Publishers group
    <PublishersGroup
      key="publishers-group"
      publishersData={publishersData}
      publishersLoading={publishersLoading}
      publishersError={publishersError}
      selectedPublishers={selectedPublishers}
      setSelectedPublishers={setSelectedPublishers}
      publisherToAdd={publisherToAdd}
      setPublisherToAdd={setPublisherToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />,
    // Developers group
    <DevelopersGroup
      key="developers-group"
      developersData={developersData}
      developersLoading={developersLoading}
      developersError={developersError}
      selectedDevelopers={selectedDevelopers}
      setSelectedDevelopers={setSelectedDevelopers}
      developerToAdd={developerToAdd}
      setDeveloperToAdd={setDeveloperToAdd}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
    />,
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