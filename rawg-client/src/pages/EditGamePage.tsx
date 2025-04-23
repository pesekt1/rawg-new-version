import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Alert,
  AlertIcon,
  Select,
  Spinner,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import useGenres from "../hooks/useGenres";
import usePlatforms from "../hooks/usePlatforms";
import useStores from "../hooks/useStores";
import usePublishers from "../hooks/usePublishers";
import ApiClient from "../services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "../entities/Game";
import { useAuth } from "../hooks/useAuth";

const apiClient = new ApiClient<Game>("/games");

const EditGamePage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);
  const [name, setName] = useState("");
  const [slugValue, setSlugValue] = useState("");
  const [description_raw, setDescriptionRaw] = useState("");
  const [released, setReleased] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<any[]>([]);
  const [genreToAdd, setGenreToAdd] = useState<number | "">("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<any[]>([]);
  const [platformToAdd, setPlatformToAdd] = useState<number | "">("");
  const [selectedStores, setSelectedStores] = useState<any[]>([]);
  const [storeToAdd, setStoreToAdd] = useState<number | "">("");
  const [selectedPublishers, setSelectedPublishers] = useState<any[]>([]);
  const [publisherToAdd, setPublisherToAdd] = useState<number | "">("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const queryClient = useQueryClient();

  const {
    data: genres,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();
  const {
    data: platforms,
    isLoading: platformsLoading,
    error: platformsError,
  } = usePlatforms();
  const {
    data: stores,
    isLoading: storesLoading,
    error: storesError,
  } = useStores();
  const {
    data: publishers,
    isLoading: publishersLoading,
    error: publishersError,
  } = usePublishers();

  useEffect(() => {
    if (game) {
      setName(game.name);
      setSlugValue(game.slug);
      setDescriptionRaw(game.description_raw);
      setReleased(game.released);
      setBackgroundImage(game.background_image);
      setSelectedGenres(game.genres || []);
      setSelectedPlatforms(
        game.parent_platforms?.map((pp: any) => pp.platform) || []
      );
      setSelectedStores(game.stores || []);
      setSelectedPublishers(game.publishers || []);
    }
  }, [game]);

  const {
    mutate,
    isLoading: isSaving,
    isSuccess,
    isError,
    error: saveError,
  } = useMutation({
    mutationFn: (data: Partial<Game>) => apiClient.patch(slug!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["game", slug] });
      navigate(`/games/${slugValue}`);
    },
  });

  const handleAddGenre = () => {
    if (
      genreToAdd &&
      !selectedGenres.some((g) => g.id === genreToAdd) &&
      genres?.results
    ) {
      const genreObj = genres.results.find((g: any) => g.id === genreToAdd);
      if (genreObj) {
        setSelectedGenres([...selectedGenres, genreObj]);
        setGenreToAdd("");
      }
    }
  };

  const handleRemoveGenre = (id: number) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== id));
  };

  const handleAddPlatform = () => {
    if (
      platformToAdd &&
      !selectedPlatforms.some((p) => p.id === platformToAdd) &&
      platforms?.results
    ) {
      const platformObj = platforms.results.find(
        (p: any) => p.id === platformToAdd
      );
      if (platformObj) {
        setSelectedPlatforms([...selectedPlatforms, platformObj]);
        setPlatformToAdd("");
      }
    }
  };

  const handleRemovePlatform = (id: number) => {
    setSelectedPlatforms(selectedPlatforms.filter((p) => p.id !== id));
  };

  const handleAddStore = () => {
    if (
      storeToAdd &&
      !selectedStores.some((s) => s.id === storeToAdd) &&
      stores?.results
    ) {
      const storeObj = stores.results.find((s: any) => s.id === storeToAdd);
      if (storeObj) {
        setSelectedStores([...selectedStores, storeObj]);
        setStoreToAdd("");
      }
    }
  };

  const handleRemoveStore = (id: number) => {
    setSelectedStores(selectedStores.filter((s) => s.id !== id));
  };

  const handleAddPublisher = () => {
    if (
      publisherToAdd &&
      !selectedPublishers.some((p) => p.id === publisherToAdd) &&
      publishers?.results
    ) {
      const publisherObj = publishers.results.find(
        (p: any) => p.id === publisherToAdd
      );
      if (publisherObj) {
        setSelectedPublishers([...selectedPublishers, publisherObj]);
        setPublisherToAdd("");
      }
    }
  };

  const handleRemovePublisher = (id: number) => {
    setSelectedPublishers(selectedPublishers.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      name,
      slug: slugValue,
      description_raw,
      released,
      background_image: backgroundImage,
      genres: selectedGenres,
      parent_platforms: selectedPlatforms.map((p) => ({ platform: p })),
      stores: selectedStores,
      publishers: selectedPublishers,
    });
  };

  const columns = useBreakpointValue({ base: 1, md: 2 });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        Failed to load game
      </Alert>
    );

  return (
    <Box maxW="4xl" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading mb={6} size="lg">
        Edit Game
      </Heading>
      {isSuccess && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Game updated successfully!
        </Alert>
      )}
      {isError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {(saveError as any)?.response?.data?.error || "Failed to update game"}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={columns} spacing={6}>
          <Box>
            <FormControl mb={4} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Game name"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Slug</FormLabel>
              <Input
                value={slugValue}
                onChange={(e) => setSlugValue(e.target.value)}
                placeholder="game-slug"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description_raw}
                onChange={(e) => setDescriptionRaw(e.target.value)}
                placeholder="Game description"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Release Date</FormLabel>
              <Input
                type="date"
                value={released}
                onChange={(e) => setReleased(e.target.value)}
                placeholder="YYYY-MM-DD"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                value={backgroundImage}
                onChange={(e) => setBackgroundImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </FormControl>
          </Box>
          <Box>
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
                      setGenreToAdd(
                        e.target.value ? Number(e.target.value) : ""
                      )
                    }
                    maxW="200px"
                  >
                    {genres?.results
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
                    onClick={handleAddGenre}
                    isDisabled={!genreToAdd}
                    colorScheme="teal"
                    size="sm"
                  >
                    Add
                  </Button>
                </HStack>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Selected Genres</FormLabel>
              <HStack wrap="wrap">
                {selectedGenres.map((genre) => (
                  <Tag key={genre.id} m={1} colorScheme="teal">
                    <TagLabel>{genre.name}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemoveGenre(genre.id)}
                    />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
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
                      setPlatformToAdd(
                        e.target.value ? Number(e.target.value) : ""
                      )
                    }
                    maxW="200px"
                  >
                    {platforms?.results
                      .filter(
                        (p: any) =>
                          !selectedPlatforms.some((sp) => sp.id === p.id)
                      )
                      .map((platform: any) => (
                        <option key={platform.id} value={platform.id}>
                          {platform.name}
                        </option>
                      ))}
                  </Select>
                  <Button
                    onClick={handleAddPlatform}
                    isDisabled={!platformToAdd}
                    colorScheme="teal"
                    size="sm"
                  >
                    Add
                  </Button>
                </HStack>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Selected Platforms</FormLabel>
              <HStack wrap="wrap">
                {selectedPlatforms.map((platform) => (
                  <Tag key={platform.id} m={1} colorScheme="teal">
                    <TagLabel>{platform.name}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemovePlatform(platform.id)}
                    />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
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
                      setStoreToAdd(
                        e.target.value ? Number(e.target.value) : ""
                      )
                    }
                    maxW="200px"
                  >
                    {stores?.results
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
                    onClick={handleAddStore}
                    isDisabled={!storeToAdd}
                    colorScheme="teal"
                    size="sm"
                  >
                    Add
                  </Button>
                </HStack>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Selected Stores</FormLabel>
              <HStack wrap="wrap">
                {selectedStores.map((store) => (
                  <Tag key={store.id} m={1} colorScheme="teal">
                    <TagLabel>{store.name}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemoveStore(store.id)}
                    />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
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
                      setPublisherToAdd(
                        e.target.value ? Number(e.target.value) : ""
                      )
                    }
                    maxW="200px"
                  >
                    {publishers?.results
                      .filter(
                        (p: any) =>
                          !selectedPublishers.some((sp) => sp.id === p.id)
                      )
                      .map((publisher: any) => (
                        <option key={publisher.id} value={publisher.id}>
                          {publisher.name}
                        </option>
                      ))}
                  </Select>
                  <Button
                    onClick={handleAddPublisher}
                    isDisabled={!publisherToAdd}
                    colorScheme="teal"
                    size="sm"
                  >
                    Add
                  </Button>
                </HStack>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Selected Publishers</FormLabel>
              <HStack wrap="wrap">
                {selectedPublishers.map((publisher) => (
                  <Tag key={publisher.id} m={1} colorScheme="teal">
                    <TagLabel>{publisher.name}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemovePublisher(publisher.id)}
                    />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
          </Box>
        </SimpleGrid>
        <Button mt={6} type="submit" colorScheme="teal" isLoading={isSaving}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditGamePage;
