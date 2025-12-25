import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import { User } from "../../interfaces/User";
import UserAvatar from "./UserAvatar";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => (
  <Card overflow="hidden">
    <CardBody
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={3}
    >
      <Box flex="1" minW={0}>
        <Text fontWeight="bold" fontSize="2xl" isTruncated>
          {user.username}
        </Text>
      </Box>

      <Box flexShrink={0}>
        <UserAvatar user={user} size="md" />
      </Box>
    </CardBody>
  </Card>
);

export default UserCard;
