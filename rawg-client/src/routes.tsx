import { createBrowserRouter } from "react-router-dom";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import NewGamePage from "./pages/NewGamePage";
import EditGamePage from "./pages/EditGamePage";
import AdminRoute from "./components/AdminRoute";
import EntityPage from "./pages/EntityPage";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "games/:id", element: <GameDetailPage /> },
      {
        path: "new-game",
        element: (
          <AdminRoute>
            <NewGamePage />
          </AdminRoute>
        ),
      },
      {
        path: "games/:id/edit",
        element: (
          <AdminRoute>
            <EditGamePage />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        ),
      },
      {
        path: "users/:id",
        element: <UserDetailPage />,
      },
      { path: "entities/:entityType", element: <EntityPage /> }, // Dynamic route
    ],
  },
]);

export default router;
