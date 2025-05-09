import {
  Box,
  Heading,
  Alert,
  AlertIcon,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import React from "react";
import EntityGroup from "./EntityGroup";
import { isValidUrl } from "../../utils/validation";
import TextareaField from "./TextareaField";
import TextInputField from "./TextInputField";
import { Entity } from "./Entity";

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
  platformsData: { results: Entity[] } | undefined;
  storesData: { results: Entity[] } | undefined;
  publishersData: { results: Entity[] } | undefined;
  developersData: { results: Entity[] } | undefined;
  tagsData: { results: Entity[] } | undefined;
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

  useEffect(() => {
    setName(initialValues.name);
    setSlug(initialValues.slug);
    setDescriptionRaw(initialValues.description_raw);
    setReleased(initialValues.released);
    setBackgroundImage(initialValues.background_image);
    setWebsite(initialValues.website);
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
    });
  };

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
        <SimpleGrid columns={1} spacing={6}>
          <TextInputField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Game name"
            isRequired
          />
          <TextInputField
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="game-slug"
            isRequired
          />
          <TextareaField
            label="Description"
            value={description_raw}
            onChange={(e) => setDescriptionRaw(e.target.value)}
            placeholder="Game description"
          />
          <TextInputField
            label="Release Date"
            value={released}
            onChange={(e) => setReleased(e.target.value)}
            placeholder="YYYY-MM-DD"
            type="date"
          />
          <TextInputField
            label="Image URL"
            value={backgroundImage}
            onChange={(e) => setBackgroundImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <TextInputField
            label="Website URL"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
              if (e.target.value && !isValidUrl(e.target.value)) {
                setWebsiteError("Website URL must start with http:// or https://");
              } else {
                setWebsiteError(null);
              }
            }}
            placeholder="https://example.com"
            isInvalid={!!websiteError}
            errorMessage={websiteError || undefined}
          />
          <EntityGroup key="tags-group" label="Tag" data={tagsData} />
          <EntityGroup key="genres-group" label="Genre" data={genresData} />
          <EntityGroup key="platforms-group" label="Platform" data={platformsData} />
          <EntityGroup key="stores-group" label="Store" data={storesData} />
          <EntityGroup key="publishers-group" label="Publisher" data={publishersData} />
          <EntityGroup key="developers-group" label="Developer" data={developersData} />
        </SimpleGrid>
        <Button mt={6} type="submit" colorScheme="teal" isLoading={isLoading}>
          {buttonLabel}
        </Button>
      </form>
    </Box>
  );
};

export default GameForm;