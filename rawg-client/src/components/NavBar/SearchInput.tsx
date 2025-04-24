import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../../state";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const onSearch = useGameQueryStore((s) => s.setSearchText);
  const resetGameQuery = useGameQueryStore((s) => s.reset); // add this
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        resetGameQuery(); // reset before searching
        onSearch(ref.current?.value || "");
        navigate("/");
        if (ref.current) ref.current.value = ""; // Clear the input field
      }}
    >
      <InputGroup
        sx={{
          transition: "box-shadow 0.2s, border-color 0.2s",
          boxShadow: "sm",
          _focusWithin: {
            boxShadow: "0 0 0 2px #319795", // teal.500
            borderColor: "teal.500",
          },
          _hover: {
            borderColor: "teal.400",
            boxShadow: "md",
          },
          borderRadius: "full",
          bg: "whiteAlpha.800",
          backdropFilter: "blur(4px)",
          _dark: { bg: "gray.700" },
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
            bg: "white",
            _dark: { bg: "gray.800" },
            borderColor: "teal.400",
            boxShadow: "0 0 0 2px #319795",
          }}
          _placeholder={{
            color: "teal.400",
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
