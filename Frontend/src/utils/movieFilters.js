const releaseYear = (movie) => Number((movie.release_date || "").slice(0, 4));

const releaseTime = (movie) =>
  new Date(movie.release_date || "1900-01-01").getTime();

const inRange = (value, [min, max] = []) =>
  (!min || value >= Number(min)) && (!max || value <= Number(max));

export function matchesMovieFilters(movie, { genre, rating, runtime, selectedYear }) {
  return (
    (!genre?.length || (movie.genre_ids || []).some((g) => genre.includes(g))) &&
    inRange(movie.vote_average, rating) &&
    inRange(movie.runtime, runtime) &&
    ((!selectedYear?.[0] && !selectedYear?.[1]) ||
      (!!movie.release_date && inRange(releaseYear(movie), selectedYear)))
  );
}

export function sortMovies(movies, sortBy) {
  const sorted = [...movies];
  if (sortBy === "Release Date (Asc)") {
    sorted.sort((a, b) => releaseTime(a) - releaseTime(b));
  } else if (sortBy === "Release Date (Desc)") {
    sorted.sort((a, b) => releaseTime(b) - releaseTime(a));
  } else if (sortBy === "Rating") {
    sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  }
  return sorted;
}

export function filterBySeen(movies, showMovie, watched = []) {
  if (showMovie === "Seen") return movies.filter((movie) => watched.includes(movie.id));
  if (showMovie === "Unseen") return movies.filter((movie) => !watched.includes(movie.id));
  return movies;
}

export function applyMovieFilters(movies, filters) {
  const matched = (movies || []).filter((movie) => matchesMovieFilters(movie, filters));
  return filterBySeen(sortMovies(matched, filters.sortBy), filters.showMovie, filters.watched);
}
