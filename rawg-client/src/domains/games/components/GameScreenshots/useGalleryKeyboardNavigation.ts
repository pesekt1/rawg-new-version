import { useEffect } from "react";

const useGalleryKeyboardNavigation = (
  isOpen: boolean,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  maxIndex: number
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      setIndex((prevIndex) => {
        if (event.key === "ArrowLeft") {
          return Math.max(prevIndex - 1, 0);
        } else if (event.key === "ArrowRight") {
          return Math.min(prevIndex + 1, maxIndex);
        }
        return prevIndex;
      });
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIndex, maxIndex]);
};

export default useGalleryKeyboardNavigation;
