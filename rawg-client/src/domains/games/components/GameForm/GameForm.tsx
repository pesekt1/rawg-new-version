import {
  useBreakpointValue,
  Box,
  Heading,
  Alert,
  AlertIcon,
  SimpleGrid,
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
import { Entity } from "./Entity";
import { isValidUrl } from "../../utils/validation";
import TextareaField from "./TextareaField";
import TextInputField from "./TextInputField";

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
  platformsData,
  storesData,
  publishersData,
  developersData,
  tagsData,
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
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<Entity[]>(
    initialValues.genres
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<Entity[]>(
    initialValues.parent_platforms
  );
  const [selectedStores, setSelectedStores] = useState<Entity[]>(
    initialValues.stores
  );
  const [selectedPublishers, setSelectedPublishers] = useState<Entity[]>(
    initialValues.publishers
  );
  const [selectedDevelopers, setSelectedDevelopers] = useState<Entity[]>(
    initialValues.developers
  );
  const [selectedTags, setSelectedTags] = useState<Entity[]>(initialValues.tags);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (website && !isValidUrl(website)) {
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
    <TextInputField
      key="name"
      label="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Game name"
      isRequired
    />,
    <TextInputField
      key="slug"
      label="Slug"
      value={slug}
      onChange={(e) => setSlug(e.target.value)}
      placeholder="game-slug"
      isRequired
    />,
    <TextareaField
      key="desc"
      label="Description"
      value={description_raw}
      onChange={(e) => setDescriptionRaw(e.target.value)}
      placeholder="Game description"
    />,
    <TextInputField
      key="release"
      label="Release Date"
      value={released}
      onChange={(e) => setReleased(e.target.value)}
      placeholder="YYYY-MM-DD"
      type="date"
    />,
    <TextInputField
      key="img"
      label="Image URL"
      value={backgroundImage}
      onChange={(e) => setBackgroundImage(e.target.value)}
      placeholder="https://example.com/image.jpg"
    />,
    <TextInputField
      key="website"
      label="Website URL"
      value={website}
      onChange={(e) => {
        setWebsite(e.target.value);
        // Live validation
        if (e.target.value && !isValidUrl(e.target.value)) {
          setWebsiteError("Website URL must start with http:// or https://");
        } else {
          setWebsiteError(null);
        }
      }}
      placeholder="https://example.com"
      isInvalid={!!websiteError}
      errorMessage={websiteError || undefined} // Convert null to undefined
    />,
    // Tags group
    <TagsGroup
      key="tags-group"
      tagsData={tagsData}
      selectedTags={selectedTags}
      setSelectedTags={setSelectedTags}
    />,
    // Genres group
    <GenresGroup
      key="genres-group"
      genresData={genresData}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
    />,
    // Platforms group
    <PlatformsGroup
      key="platforms-group"
      platformsData={platformsData}
      selectedPlatforms={selectedPlatforms}
      setSelectedPlatforms={setSelectedPlatforms}
    />,
    // Stores group
    <StoresGroup
      key="stores-group"
      storesData={storesData}
      selectedStores={selectedStores}
      setSelectedStores={setSelectedStores}
    />,
    // Publishers group
    <PublishersGroup
      key="publishers-group"
      publishersData={publishersData}
      selectedPublishers={selectedPublishers}
      setSelectedPublishers={setSelectedPublishers}
    />,
    // Developers group
    <DevelopersGroup
      key="developers-group"
      developersData={developersData}
      selectedDevelopers={selectedDevelopers}
      setSelectedDevelopers={setSelectedDevelopers}
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