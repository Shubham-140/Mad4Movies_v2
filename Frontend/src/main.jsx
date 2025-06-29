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
const EmailVerification = lazy(() =>
  import("./components/EmailVerification.jsx")
);
const ResetPassword = lazy(() => import("./components/ResetPassword.jsx"));
const CheckInbox = lazy(() => import("./components/CheckInbox.jsx"));
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
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/recommended-movies",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RecommendedMovies />
          </Suspense>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "/terms",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TermsOfService />
          </Suspense>
        ),
      },
      {
        path: "/movie/:id/:title",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MovieComponent />
          </Suspense>
        ),
      },
      {
        path: "/trending-movies",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TrendingMovies />
          </Suspense>
        ),
      },
      {
        path: "/upcoming-movies",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UpcomingMovies />
          </Suspense>
        ),
      },
      {
        path: "/in-theatres",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <InCinemasMovies />
          </Suspense>
        ),
      },
      {
        path: "/search-results/:query",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MovieSearchResults />
          </Suspense>
        ),
      },
      {
        path: "/top-rated-movies",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TopRated />
          </Suspense>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WatchList />
          </Suspense>
        ),
      },
      {
        path: "/favorites",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FavoriteList />
          </Suspense>
        ),
      },
      {
        path: "/profile/:ID/:name",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PersonProfile />
          </Suspense>
        ),
      },
      {
        path: "/movies/genre/:genreId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GenreFilteredMoviesCards />
          </Suspense>
        ),
      },
      {
        path: "/user/:username",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserProfile />
          </Suspense>
        ),
      },
      {
        path: "/auth-error",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AuthError />
          </Suspense>
        ),
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "/cookie-policy",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cookies />
          </Suspense>
        ),
      },
      {
        path: "/email-verify",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EmailVerification />
          </Suspense>
        ),
      },
      {
        path: "/check-inbox",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CheckInbox />
          </Suspense>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "/my-settings",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
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
