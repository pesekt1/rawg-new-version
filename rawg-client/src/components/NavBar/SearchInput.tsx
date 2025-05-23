import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../../state/state";
import useBrowseListStore from "../../state/useBrowseListStore";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const onSearch = useGameQueryStore((s) => s.setSearchText);
  const resetGameQuery = useGameQueryStore((s) => s.reset);
  const resetBrowseListKey = useBrowseListStore((s) => s.reset);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        //reset state
        resetGameQuery();
        resetBrowseListKey();

        onSearch(ref.current?.value || "");
        navigate("/");
        if (ref.current) ref.current.value = ""; // Clear the input field
      }}
    >
      <InputGroup variant="searchInputGroup">
        <InputLeftElement
          pointerEvents="none"
          children={<BsSearch color="#319795" />}
        />
        <Input ref={ref} placeholder="Search games..." variant="searchInput" />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
