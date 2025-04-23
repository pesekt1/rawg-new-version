import { createBrowserRouter } from "react-router-dom";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import NewGamePage from "./pages/NewGamePage"; // add this import

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "games/:slug", element: <GameDetailPage /> },
      { path: "new-game", element: <NewGamePage /> }, // add this line
    ],
  },
]);

export default router;
