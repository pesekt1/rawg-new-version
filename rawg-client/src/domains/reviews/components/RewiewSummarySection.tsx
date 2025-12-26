import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { useState } from "react";
import StyledText from "../../../components/StyledText";
import type { Game } from "../../games/Game";
import useGenerateGameSummary from "../../games/useGenerateGameSummary";
const SUMMARY_FRESH_FOR_MS = ms("24h");

const ReviewSummarySection = ({ game }: { game: Game }) => {
  const queryClient = useQueryClient();
  const [localUpdatedAtMs, setLocalUpdatedAtMs] = useState<number | null>(null);

  const summaryMutation = useGenerateGameSummary(game.id, {
    onSuccess: (summary) => {
      setLocalUpdatedAtMs(Date.now());
      queryClient.setQueryData<Game>(["game", game.id], (old) => {
        const base = old ?? game;
        return {
          ...base,
          summary,
          summaryUpdatedAt: new Date().toISOString(),
        };
      });
    },
  });

  const isMutating =
    (summaryMutation as any).isPending ?? (summaryMutation as any).isLoading;

  const currentSummary = summaryMutation.data ?? game.summary ?? null;

  const updatedAtMsRaw =
    localUpdatedAtMs ??
    (game.summaryUpdatedAt
      ? new Date(game.summaryUpdatedAt).getTime()
      : undefined);

  const updatedAtMs = Number.isFinite(updatedAtMsRaw)
    ? updatedAtMsRaw
    : undefined;

  const hasFreshSummary =
    !!currentSummary &&
    updatedAtMs !== undefined &&
    Date.now() - updatedAtMs < SUMMARY_FRESH_FOR_MS;

  return (
    <Box mt={4}>
      <HStack justify="space-between" mb={2}>
        <Heading size="md">AI Summary</Heading>

        {!hasFreshSummary && (
          <Button
            size="sm"
            onClick={
              () =>
                currentSummary
                  ? summaryMutation.mutate(true) // old summary -> refresh via regenerate
                  : summaryMutation.mutate(false) // no summary -> generate
            }
            isLoading={isMutating}
          >
            {currentSummary ? "Refresh" : "Generate"}
          </Button>
        )}
      </HStack>

      {summaryMutation.isError && (
        <Alert status="error" mt={2}>
          <AlertIcon />
          {(summaryMutation.error as any)?.response?.data?.error ||
            (summaryMutation.error as any)?.message ||
            "Failed to generate summary"}
        </Alert>
      )}

      {isMutating && !currentSummary && <Spinner size="sm" mt={2} />}

      {currentSummary && (
        <StyledText>
          <Box whiteSpace="pre-wrap">{currentSummary}</Box>
        </StyledText>
      )}
    </Box>
  );
};

export default ReviewSummarySection;
