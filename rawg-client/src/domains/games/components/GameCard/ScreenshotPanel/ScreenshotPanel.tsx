import { HStack } from "@chakra-ui/react";
import DotButton from "./DotButton";

interface Screenshot {
  id: number;
  image: string;
}

interface ScreenshotPanelProps {
  screenshots: Screenshot[];
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
}

const ScreenshotPanel = ({
  screenshots,
  currentIndex,
  setCurrentIndex,
}: ScreenshotPanelProps) => (
  <HStack
    position="absolute"
    left="50%"
    bottom="12px"
    transform="translateX(-50%)"
    spacing={2}
    zIndex={2}
    bg="rgba(0,0,0,0.35)"
    px={3}
    py={1}
    borderRadius="md"
  >
    <DotButton
      active={currentIndex === 0}
      onMouseEnter={() => setCurrentIndex(0)}
      ariaLabel="Main image"
    />
    {screenshots.map((s, idx) => (
      <DotButton
        key={s.id}
        active={currentIndex === idx + 1}
        onMouseEnter={() => setCurrentIndex(idx + 1)}
        ariaLabel={`Screenshot ${idx + 1}`}
      />
    ))}
  </HStack>
);

export default ScreenshotPanel;
