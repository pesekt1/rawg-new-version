import {
  Box,
  Card,
  CardBody,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { User } from "./User";
import UserAvatar from "./UserAvatar";

interface UserCardProps {
  user: User;
  to?: string;
}

const UserCard = ({ user, to }: UserCardProps) => (
  <LinkBox as={Card} overflow="hidden">
    <CardBody display="flex" flexDirection="column" alignItems="center" gap={3}>
      <VStack w="100%" align="stretch" spacing={2}>
        <Box display="flex" justifyContent="center">
          <UserAvatar user={user} size="2xl" />
        </Box>

        <Box w="100%" minW={0}>
          {to ? (
            <LinkOverlay as={RouterLink} to={to} display="block">
              <Text
                w="100%"
                display="block"
                textAlign="center"
                fontWeight="bold"
                fontSize="2xl"
                isTruncated
              >
                {user.username}
              </Text>
            </LinkOverlay>
          ) : (
            <Text
              w="100%"
              display="block"
              textAlign="center"
              fontWeight="bold"
              fontSize="2xl"
              isTruncated
            >
              {user.username}
            </Text>
          )}
        </Box>
      </VStack>
    </CardBody>
  </LinkBox>
);

export default UserCard;
