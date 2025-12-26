import type { UseMutationOptions } from "@tanstack/react-query";
import useMutationWithInvalidation from "../../hooks/useMutationWithInvalidation";
import gameSummaryService from "./gameSummaryService";

const useGenerateGameSummary = (
  gameId: number,
  options?: UseMutationOptions<string, Error, boolean>
) =>
  useMutationWithInvalidation<string, boolean>(
    (force) => gameSummaryService.generate(gameId, force),
    ["game", gameId],
    options
  );

export default useGenerateGameSummary;
