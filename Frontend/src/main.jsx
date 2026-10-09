import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";
import Hero from "./components/Hero.jsx";
import Trending from "./components/Trending.jsx";
import Theatres from "./components/Theatres.jsx";
import Upcoming from "./components/Upcoming.jsx";
import FAQ from "./components/FAQ.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FullScreenLoader from "./components/FullScreenLoader.jsx";
const Contact = lazy(() => import("./components/Contact.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const RecommendedMovies = lazy(() =>
  import("./components/RecommendedMovies.jsx")
);
const PrivacyPolicy = lazy(() => import("./components/PrivactPolicy.jsx"));
const TermsOfService = lazy(() => import("./components/TermsOfService.jsx"));
const MovieComponent = lazy(() => import("./components/MovieComponent.jsx"));
const TrendingMovies = lazy(() => import("./components/TrendingMovies.jsx"));
const UpcomingMovies = lazy(() => import("./components/UpcomingMovies.jsx"));
const InCinemasMovies = lazy(() => import("./components/InCinemasMovies.jsx"));
const MovieSearchResults = lazy(() =>
  import("./components/MovieSearchResults.jsx")
);
const TopRated = lazy(() => import("./components/TopRated.jsx"));
const WatchList = lazy(() => import("./components/Watchlist.jsx"));
const FavoriteList = lazy(() => import("./components/FavoriteList.jsx"));
const PersonProfile = lazy(() => import("./components/PersonProfile.jsx"));
const GenreFilteredMoviesCards = lazy(() =>
  import("./components/GenreFilteredMoviesCards.jsx")
);
const UserProfile = lazy(() => import("./components/UserProfile.jsx"));
const AuthError = lazy(() => import("./components/AuthError.jsx"));
const Blog = lazy(() => import("./components/Blog.jsx"));
const Cookies = lazy(() => import("./components/Cookies.jsx"));
const Settings = lazy(() => import("./components/Settings.jsx"));
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <>
            <Hero />
            <Trending />
            <Theatres />
            <Upcoming />
            <FAQ />
          </>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/recommended-movies",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <RecommendedMovies />
          </Suspense>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "/terms",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <TermsOfService />
          </Suspense>
        ),
      },
      {
        path: "/movie/:id/:title",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <MovieComponent />
          </Suspense>
        ),
      },
      {
        path: "/trending-movies",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <TrendingMovies />
          </Suspense>
        ),
      },
      {
        path: "/upcoming-movies",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <UpcomingMovies />
          </Suspense>
        ),
      },
      {
        path: "/in-theatres",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <InCinemasMovies />
          </Suspense>
        ),
      },
      {
        path: "/search-results/:query",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <MovieSearchResults />
          </Suspense>
        ),
      },
      {
        path: "/top-rated-movies",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <TopRated />
          </Suspense>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <WatchList />
          </Suspense>
        ),
      },
      {
        path: "/favorites",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <FavoriteList />
          </Suspense>
        ),
      },
      {
        path: "/profile/:ID/:name",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <PersonProfile />
          </Suspense>
        ),
      },
      {
        path: "/movies/genre/:genreId",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <GenreFilteredMoviesCards />
          </Suspense>
        ),
      },
      {
        path: "/user/:username",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <UserProfile />
          </Suspense>
        ),
      },
      {
        path: "/auth-error",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <AuthError />
          </Suspense>
        ),
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "/cookie-policy",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <Cookies />
          </Suspense>
        ),
      },
      {
        path: "/my-settings",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/home",
    element: <Navigate to="/" />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
