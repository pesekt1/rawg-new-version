import { Card, CardBody, Text } from "@chakra-ui/react";
import UserAvatar from "./UserAvatar";
import { User } from "../auth/User";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => (
  <Card>
    <CardBody display="flex" alignItems="center" gap={3}>
      <Text fontWeight="bold" fontSize="2xl">
        {user.username}
      </Text>
      <UserAvatar user={user} size="md" />
    </CardBody>
  </Card>
);

export default UserCard;
