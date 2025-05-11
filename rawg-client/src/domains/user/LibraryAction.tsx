import { FaGamepad } from "react-icons/fa";
import UserPanelAction from "./UserPanelAction";

interface LibraryActionProps {
  selected: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const LibraryAction = ({
  selected,
  onClick,
  onKeyDown,
}: LibraryActionProps) => (
  <UserPanelAction
    icon={FaGamepad}
    label="My Library"
    selected={selected}
    onClick={onClick}
    onKeyDown={onKeyDown}
  />
);

export default LibraryAction;
