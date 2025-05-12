import { Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface TitleButtonProps {
  title: string;
  onReset: () => void;
}

const TitleButton = ({ title, onReset }: TitleButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="customButton"
      onClick={() => {
        onReset();
        navigate(`/entities/${title.toLowerCase()}`);
      }}
      fontSize="2xl"
      fontWeight="bold"
    >
      <Heading size="md">{title}</Heading>
    </Button>
  );
};

export default TitleButton;
