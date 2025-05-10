import {
  useBreakpointValue,
  Box,
  Heading,
  Alert,
  AlertIcon,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
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
  buttonLabel?: string;
  heading: string;
  successMessage?: string;
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
  buttonLabel = "Submit",
  heading,
  successMessage = "Operation successful!",
}: GameFormProps) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [websiteError, setWebsiteError] = useState<string | null>(null);

  // State for selected entities
  const [selectedEntities, setSelectedEntities] = useState({
    genres: initialValues.genres,
    parent_platforms: initialValues.parent_platforms,
    stores: initialValues.stores,
    publishers: initialValues.publishers,
    developers: initialValues.developers,
    tags: initialValues.tags,
  });

  useEffect(() => {
    setFormValues(initialValues);
    setSelectedEntities({
      genres: initialValues.genres,
      parent_platforms: initialValues.parent_platforms,
      stores: initialValues.stores,
      publishers: initialValues.publishers,
      developers: initialValues.developers,
      tags: initialValues.tags,
    });
  }, [initialValues]);

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (field === "website" && value && !isValidUrl(value)) {
      setWebsiteError("Website URL must start with http:// or https://");
    } else {
      setWebsiteError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValues.website && !isValidUrl(formValues.website)) {
      setWebsiteError("Website URL must start with http:// or https://");
      return;
    }
    onSubmit({
      ...formValues,
      ...selectedEntities,
    });
  };

  // Define fields as an array of React nodes
  const fieldNodes = [
    <TextInputField
      key="name"
      label="Name"
      value={formValues.name}
      onChange={(e) => handleChange("name", e.target.value)}
      placeholder="Game name"
      isRequired
    />,
    <TextInputField
      key="slug"
      label="Slug"
      value={formValues.slug}
      onChange={(e) => handleChange("slug", e.target.value)}
      placeholder="game-slug"
      isRequired
    />,
    <TextareaField
      key="description"
      label="Description"
      value={formValues.description_raw}
      onChange={(e) => handleChange("description_raw", e.target.value)}
      placeholder="Game description"
    />,
    <TextInputField
      key="release-date"
      label="Release Date"
      value={formValues.released}
      onChange={(e) => handleChange("released", e.target.value)}
      placeholder="YYYY-MM-DD"
      type="date"
    />,
    <TextInputField
      key="image-url"
      label="Image URL"
      value={formValues.background_image}
      onChange={(e) => handleChange("background_image", e.target.value)}
      placeholder="https://example.com/image.jpg"
    />,
    <TextInputField
      key="website-url"
      label="Website URL"
      value={formValues.website}
      onChange={(e) => handleChange("website", e.target.value)}
      placeholder="https://example.com"
      isInvalid={!!websiteError}
      errorMessage={websiteError || undefined}
    />,
    <EntityGroup
      key="tags-group"
      label="Tag"
      data={tagsData}
      onChange={(updated) =>
        setSelectedEntities((prev) => ({ ...prev, tags: updated }))
      }
    />,
    <EntityGroup
      key="genres-group"
      label="Genre"
      data={genresData}
      onChange={(updated) =>
        setSelectedEntities((prev) => ({ ...prev, genres: updated }))
      }
    />,
    <EntityGroup
      key="platforms-group"
      label="Platform"
      data={platformsData}
      onChange={(updated) =>
        setSelectedEntities((prev) => ({ ...prev, parent_platforms: updated }))
      }
    />,
    <EntityGroup
      key="stores-group"
      label="Store"
      data={storesData}
      onChange={(updated) =>
        setSelectedEntities((prev) => ({ ...prev, stores: updated }))
      }
    />,
    <EntityGroup
      key="publishers-group"
      label="Publisher"
      data={publishersData}
      onChange={(updated) =>
        setSelectedEntities((prev) => ({ ...prev, publishers: updated }))
      }
    />,
    <EntityGroup
      key="developers-group"
      label="Developer"
      data={developersData}
      onChange={(updated) =>
        setSelectedEntities((prev) => ({ ...prev, developers: updated }))
      }
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