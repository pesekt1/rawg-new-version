import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { Entity } from "./GameForm";

interface GenresGroupProps {
  genresData: { results: Entity[] } | undefined;
  genresLoading: boolean;
  genresError: any;
  selectedGenres: Entity[];
  setSelectedGenres: (genres: Entity[]) => void;
  genreToAdd: number | "";
  setGenreToAdd: (genre: number | "") => void;
  handleAdd: (
    toAdd: number | "",
    setToAdd: (v: number | "") => void,
    selected: Entity[],
    setSelected: (v: Entity[]) => void,
    data: { results: Entity[] } | undefined
  ) => void;
  handleRemove: (
    id: number,
    selected: Entity[],
    setSelected: (v: Entity[]) => void
  ) => void;
}

const GenresGroup: React.FC<GenresGroupProps> = ({
  genresData,
  genresLoading,
  genresError,
  selectedGenres,
  setSelectedGenres,
  genreToAdd,
  setGenreToAdd,
  handleAdd,
  handleRemove,
}) => {
  return (
    <Box mb={4}>
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
                .filter((g) => !selectedGenres.some((sg) => sg.id === g.id))
                .map((genre) => (
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
    </Box>
  );
};

export default GenresGroup;
