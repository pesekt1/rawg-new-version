import { Router } from "express";
import { Genre } from "../entities/Genre";
import { getAllGenres } from "../services/genreService";

//interface for response object
interface Response {
  count: number;
  results: Genre[];
}

const genreRouter = Router();

//GET all genres
genreRouter.get("/", async (req, res) => {
  const genres = await getAllGenres();
  const response: Response = {
    count: genres.length,
    results: genres,
  };
  res.send(response);
});

export default genreRouter;
