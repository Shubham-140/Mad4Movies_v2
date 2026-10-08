export function getTmdbApiKey() {
  return import.meta.env.VITE_TMDB_API_KEY;
}

export function tmdbApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const separator = normalizedPath.includes("?") ? "&" : "?";
  return `https://api.themoviedb.org/3${normalizedPath}${separator}api_key=${getTmdbApiKey()}`;
}

export async function fetchTmdbMoviesByIds(ids) {
  const uniqueIds = [...new Set((ids || []).filter(Boolean))];
  if (!uniqueIds.length) return [];

  const results = await Promise.all(
    uniqueIds.map(async (id) => {
      try {
        const response = await fetch(tmdbApiUrl(`/movie/${id}`));
        if (!response.ok) return null;
        const movie = await response.json();
        if (!movie?.id) return null;
        return {
          ...movie,
          genre_ids: movie.genres?.map((genre) => genre.id) || [],
        };
      } catch {
        return null;
      }
    })
  );

  return results.filter(Boolean);
}
