import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

/**
 * Props for the `DefinitionItem` component.
 *
 * @property term - The term to display as the definition title.
 * @property children - The content to display as the definition description.
 */
interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}

/**
 * A component for displaying a term and its corresponding definition.
 *
 * @param props - The props for the component.
 * @returns A styled definition list item with a term and description.
 */
const DefinitionItem = ({ term, children }: Props) => {
  return (
    <Box marginY={2}>
      <Heading as="dt" fontSize="lg" color="gray.600" mb={2}>
        {term}
      </Heading>
      <dd>{children}</dd>
    </Box>
  );
};

export default DefinitionItem;
