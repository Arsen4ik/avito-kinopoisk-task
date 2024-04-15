import { FC } from "react";
import Root from "./Root";
import ErrorPage from "./pages/ErrorPage";
import AllMoviesPage from "./pages/AllMoviesPage";
import SpecialMoviePage from "./pages/SpecialMoviePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/movie',
        children: [
          {
            path: 'search',
            element: <AllMoviesPage />
          },
          {
            path: ':id',
            element: <SpecialMoviePage />
          },
          {
            path: '',
            element: <AllMoviesPage />
          }
        ]
      }
    ]
  }
]);

const App: FC = () => <RouterProvider router={router} />

export default App;