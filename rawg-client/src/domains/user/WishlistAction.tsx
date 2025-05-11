import { FaStar } from "react-icons/fa";
import UserPanelAction from "./UserPanelAction";

interface WishlistActionProps {
  selected: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const WishlistAction = ({
  selected,
  onClick,
  onKeyDown,
}: WishlistActionProps) => (
  <UserPanelAction
    icon={FaStar}
    label="My Wishlist"
    selected={selected}
    onClick={onClick}
    onKeyDown={onKeyDown}
  />
);

export default WishlistAction;
