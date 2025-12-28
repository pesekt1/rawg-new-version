import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAuth } from "../domains/auth/useAuth";
import GameGrid from "../domains/games/components/GameGrid";
import ReviewsSection from "../domains/reviews/components/ReviewsSection";
import useReviews from "../domains/reviews/useReviews";
import UserEditModal from "../domains/user/UserEditModal";
import useUser from "../domains/user/useUser";
import useGameQueryStore from "../state/state";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? Number(id) : undefined;

  const setLibraryUserId = useGameQueryStore((s) => s.setLibraryUserId);
  const setWishlistUserId = useGameQueryStore((s) => s.setWishlistUserId);
  const resetGameQueryStore = useGameQueryStore((s) => s.reset);

  const {
    data: reviews,
    isLoading: isLoadingReviews,
    fetchNextPage,
    hasNextPage,
  } = useReviews({ userId });

  const fetchedReviewsCount =
    reviews?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  const { data: user, isLoading, error } = useUser(userId);
  const { user: currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="tomato">{(error as Error).message}</Text>;
  if (!user) return <Text>User not found.</Text>;

  return (
    <Box p={4}>
      <Heading mb={2}>{user.username}</Heading>

      <Tabs
        variant="profileSubnav"
        colorScheme="accent"
        onChange={(index: number) => {
          // 0 = Overview, 1 = Library, 2 = Wishlist, 3 = Reviews
          if (index === 1) setLibraryUserId(user.id);
          else if (index === 2) setWishlistUserId(user.id);
          else resetGameQueryStore(); // Overview + Reviews
        }}
      >
        <TabList>
          <Tab>Overview</Tab>

          <Tab>
            <HStack spacing={2} align="start">
              <Text>Library</Text>
            </HStack>
          </Tab>

          <Tab>
            <HStack spacing={2} align="start">
              <Text>Wishlist</Text>
            </HStack>
          </Tab>

          <Tab>
            <HStack spacing={2} align="start">
              <Text>Reviews</Text>
            </HStack>
          </Tab>
        </TabList>

        <TabPanels pt={3}>
          <TabPanel px={0}>
            <VStack align="start" spacing={2}></VStack>

            {currentUser && currentUser.id === user.id && (
              <>
                <Button mt={4} colorScheme="teal" onClick={onOpen}>
                  Edit Profile
                </Button>
                <UserEditModal user={user} isOpen={isOpen} onClose={onClose} />
              </>
            )}
          </TabPanel>

          <TabPanel px={0}>
            <GameGrid />
          </TabPanel>

          <TabPanel px={0}>
            <GameGrid />
          </TabPanel>

          <TabPanel px={0}>
            <ReviewsSection
              reviews={reviews}
              isLoadingReviews={isLoadingReviews}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              fetchedReviewsCount={fetchedReviewsCount}
              isGameDetail={false}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default UserProfilePage;
