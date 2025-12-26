import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import StyledText from "../../../components/StyledText";
import { axiosInstance } from "../../../services/api-client";
import type { Game } from "../../games/Game";

type SummaryResponse = { summary: string };

const SUMMARY_FRESH_FOR_MS = ms("24h");

const ReviewSummarySection = ({ game }: { game: Game }) => {
  const queryClient = useQueryClient();

  const summaryMutation = useMutation({
    mutationFn: async (force: boolean) => {
      const res = await axiosInstance.post<SummaryResponse>(
        `/games/${game.id}/summary`,
        undefined,
        { params: { force } }
      );
      return res.data.summary;
    },
    onSuccess: (summary) => {
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

  const currentSummary = game.summary ?? summaryMutation.data ?? null;

  const updatedAtMsRaw = game.summaryUpdatedAt
    ? new Date(game.summaryUpdatedAt).getTime()
    : summaryMutation.data
    ? Date.now()
    : undefined;

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
            isLoading={summaryMutation.isLoading}
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

      {summaryMutation.isLoading && !currentSummary && (
        <Spinner size="sm" mt={2} />
      )}

      {currentSummary && (
        <StyledText>
          <Box whiteSpace="pre-wrap">{currentSummary}</Box>
        </StyledText>
      )}
    </Box>
  );
};

export default ReviewSummarySection;
