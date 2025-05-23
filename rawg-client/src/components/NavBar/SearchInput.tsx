import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../../state/state";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const onSearch = useGameQueryStore((s) => s.setSearchText);
  const resetGameQuery = useGameQueryStore((s) => s.reset);
  const resetBrowseListQuery = useGameQueryStore((s) => s.resetBrowseListQuery);
  const navigate = useNavigate();
  const inputGroupBg = useColorModeValue("white", "gray.700");
  const inputGroupBorder = useColorModeValue("1.5px solid #e2e8f0", "none");
  const inputGroupBorderColor = useColorModeValue("gray.300", "gray.600");
  const placeholderColor = useColorModeValue("gray.500", "teal.400");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        //reset cache
        resetGameQuery();
        resetBrowseListQuery();

        onSearch(ref.current?.value || "");
        navigate("/");
        if (ref.current) ref.current.value = ""; // Clear the input field
      }}
    >
      <InputGroup
        sx={{
          transition: "box-shadow 0.2s, border-color 0.2s",
          boxShadow: "sm",
          border: inputGroupBorder,
          borderColor: inputGroupBorderColor,
          _focusWithin: {
            boxShadow: "0 0 0 2px #319795",
            borderColor: "teal.500",
          },
          _hover: {
            borderColor: "teal.400",
            boxShadow: "md",
          },
          borderRadius: "full",
          bg: inputGroupBg,
        }}
      >
        <InputLeftElement
          pointerEvents="none"
          children={<BsSearch color="#319795" />}
        />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
          fontWeight="semibold"
          fontSize="md"
          bg="transparent"
          _focus={{
            bg: inputGroupBg,
            borderColor: "teal.400",
            boxShadow: "0 0 0 2px #319795",
            _dark: { bg: "gray.800" },
          }}
          _placeholder={{
            color: placeholderColor,
            fontStyle: "italic",
            letterSpacing: "0.5px",
          }}
          transition="all 0.2s"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
