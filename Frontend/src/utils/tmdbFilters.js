import { getTmdbApiKey } from "./tmdb";

export function getTmdbSortBy(sortBy, fallback = "popularity.desc") {
  switch (sortBy) {
    case "Release Date (Asc)":
      return "primary_release_date.asc";
    case "Release Date (Desc)":
      return "primary_release_date.desc";
    case "Rating":
      return "vote_average.desc";
    default:
      return fallback;
  }
}

export function hasDiscoverFilters({
  genreIds = [],
  rating = ["", ""],
  runtime = ["", ""],
  selectedYear = ["", ""],
  sortBy = "",
  textQuery = "",
}) {
  return Boolean(
    genreIds.length ||
      rating[0] ||
      rating[1] ||
      runtime[0] ||
      runtime[1] ||
      selectedYear[0] ||
      selectedYear[1] ||
      sortBy ||
      textQuery
  );
}

export function buildDiscoverSearchParams({
  genreIds = [],
  rating = ["", ""],
  runtime = ["", ""],
  selectedYear = ["", ""],
  sortBy = "",
  textQuery = "",
  defaultSort = "popularity.desc",
  page = 1,
}) {
  const params = new URLSearchParams();
  const apiKey = getTmdbApiKey();
  if (apiKey) {
    params.set("api_key", apiKey);
  }
  params.set("page", String(page));

  if (genreIds.length) {
    params.set("with_genres", genreIds.join("|"));
  }
  if (rating[0]) params.set("vote_average.gte", String(rating[0]));
  if (rating[1]) params.set("vote_average.lte", String(rating[1]));
  if (runtime[0]) params.set("with_runtime.gte", String(runtime[0]));
  if (runtime[1]) params.set("with_runtime.lte", String(runtime[1]));
  if (selectedYear[0]) {
    params.set("primary_release_date.gte", `${selectedYear[0]}-01-01`);
  }
  if (selectedYear[1]) {
    params.set("primary_release_date.lte", `${selectedYear[1]}-12-31`);
  }
  if (textQuery) params.set("with_text_query", textQuery);

  params.set("sort_by", getTmdbSortBy(sortBy, defaultSort));

  return params;
}

export function filterSavedMovies(
  movies,
  {
    genreIds = [],
    rating = ["", ""],
    runtime = ["", ""],
    selectedYear = ["", ""],
    sortBy = "",
    showMovie = "Everything",
    watched = [],
  }
) {
  let filtered = movies.filter((movie) => {
    const releaseYear = movie.release_date?.slice(0, 4);
    return (
      (!genreIds.length ||
        movie.genre_ids?.some((g) => genreIds.includes(g))) &&
      (!rating[0] || movie.vote_average >= Number(rating[0])) &&
      (!rating[1] || movie.vote_average <= Number(rating[1])) &&
      (!runtime[0] || (movie.runtime ?? 0) >= Number(runtime[0])) &&
      (!runtime[1] || (movie.runtime ?? 0) <= Number(runtime[1])) &&
      (!selectedYear[0] ||
        (releaseYear && Number(releaseYear) >= Number(selectedYear[0]))) &&
      (!selectedYear[1] ||
        (releaseYear && Number(releaseYear) <= Number(selectedYear[1])))
    );
  });

  if (sortBy === "Release Date (Asc)") {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(a.release_date || 0) - new Date(b.release_date || 0)
    );
  } else if (sortBy === "Release Date (Desc)") {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(b.release_date || 0) - new Date(a.release_date || 0)
    );
  } else if (sortBy === "Rating") {
    filtered = [...filtered].sort(
      (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
    );
  }

  return applySeenUnseenFilter(filtered, showMovie, watched);
}

export function applySeenUnseenFilter(movies, showMovie, watched) {
  if (showMovie === "Seen") {
    return movies.filter((movie) => watched.includes(movie.id));
  }
  if (showMovie === "Unseen") {
    return movies.filter((movie) => !watched.includes(movie.id));
  }
  return movies;
}

export function parseSortFromDiscoverProp(sort) {
  if (!sort) return null;
  const match = sort.match(/sort_by=([^&]+)/);
  return match ? match[1] : null;
}
