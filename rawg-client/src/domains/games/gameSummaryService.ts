import { axiosInstance } from "../../services/api-client";

type SummaryResponse = { summary: string };

const gameSummaryService = {
  generate: (gameId: number, force: boolean) =>
    axiosInstance
      .post<SummaryResponse>(`/games/${gameId}/summary`, undefined, {
        params: { force },
      })
      .then((res) => res.data.summary),
};

export default gameSummaryService;