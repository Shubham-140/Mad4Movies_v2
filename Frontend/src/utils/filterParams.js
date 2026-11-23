const SORT_TO_PARAM = {
  "Release Date (Asc)": "release_asc",
  "Release Date (Desc)": "release_desc",
  Rating: "rating",
};

const PARAM_TO_SORT = Object.fromEntries(
  Object.entries(SORT_TO_PARAM).map(([label, param]) => [param, label])
);

const SHOW_TO_PARAM = { Seen: "seen", Unseen: "unseen" };

const PARAM_TO_SHOW = { seen: "Seen", unseen: "Unseen" };

const RANGE_KEYS = [
  ["yearFrom", "selectedYear", 0],
  ["yearTo", "selectedYear", 1],
  ["ratingMin", "rating", 0],
  ["ratingMax", "rating", 1],
  ["runtimeMin", "runtime", 0],
  ["runtimeMax", "runtime", 1],
];

export const FILTER_PARAM_KEYS = ["genre", "sort", "show", ...RANGE_KEYS.map(([key]) => key)];

const cleanNumber = (value) => {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(value);
  return Number.isFinite(num) ? String(num) : "";
};

export function filtersToSearchParams(filters, baseParams) {
  const params = new URLSearchParams(baseParams);
  FILTER_PARAM_KEYS.forEach((key) => params.delete(key));

  if (filters.genre?.length) params.set("genre", filters.genre.join(","));
  RANGE_KEYS.forEach(([key, field, index]) => {
    const value = cleanNumber(filters[field]?.[index]);
    if (value) params.set(key, value);
  });
  if (SORT_TO_PARAM[filters.sortBy]) params.set("sort", SORT_TO_PARAM[filters.sortBy]);
  if (SHOW_TO_PARAM[filters.showMovie]) params.set("show", SHOW_TO_PARAM[filters.showMovie]);

  return params;
}

const DISCOVER_SORT = {
  "Release Date (Asc)": "primary_release_date.asc",
  "Release Date (Desc)": "primary_release_date.desc",
  Rating: "vote_average.desc",
};

const daysFromToday = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const LIST_AS_DISCOVER = {
  popular: () => ({ sort_by: "popularity.desc" }),
  top_rated: () => ({ sort_by: "vote_average.desc", "vote_count.gte": "200" }),
  upcoming: () => ({
    sort_by: "popularity.desc",
    "primary_release_date.gte": daysFromToday(1),
  }),
  now_playing: () => ({
    sort_by: "popularity.desc",
    "primary_release_date.gte": daysFromToday(-42),
    "primary_release_date.lte": daysFromToday(0),
  }),
};

const hasRange = (range) => Boolean(cleanNumber(range?.[0]) || cleanNumber(range?.[1]));

export function hasDiscoverFilters({ genre, rating, runtime, selectedYear, sortBy }) {
  return Boolean(
    genre?.length ||
      DISCOVER_SORT[sortBy] ||
      [rating, runtime, selectedYear].some(hasRange)
  );
}

const yearValue = (value) => (/^\d{4}$/.test(cleanNumber(value)) ? cleanNumber(value) : "");
const laterDate = (a, b) => (!a ? b : !b ? a : a > b ? a : b);
const earlierDate = (a, b) => (!a ? b : !b ? a : a < b ? a : b);

const setOrDelete = (params, key, value) => {
  if (value) params.set(key, value);
  else params.delete(key);
};

export function movieListPath({ type, trending, discover, query }, filters) {
  if (!discover && !hasDiscoverFilters(filters)) {
    return trending ? `/trending/movie/${type}` : `/movie/${type}`;
  }

  const base = discover
    ? query || ""
    : (LIST_AS_DISCOVER[trending ? "popular" : type] || LIST_AS_DISCOVER.popular)();
  const params = new URLSearchParams(base);
  const isUpcoming = !discover && !trending && type === "upcoming";

  if (filters.genre?.length) params.set("with_genres", filters.genre.join("|"));

  const yearFrom = yearValue(filters.selectedYear?.[0]);
  const yearTo = yearValue(filters.selectedYear?.[1]);
  let dateTo = earlierDate(params.get("primary_release_date.lte"), yearTo && `${yearTo}-12-31`);
  if (filters.sortBy === "Release Date (Desc)" && !isUpcoming) {
    dateTo = earlierDate(dateTo, daysFromToday(0));
  }
  setOrDelete(
    params,
    "primary_release_date.gte",
    laterDate(params.get("primary_release_date.gte"), yearFrom && `${yearFrom}-01-01`)
  );
  setOrDelete(params, "primary_release_date.lte", dateTo);

  setOrDelete(params, "vote_average.gte", cleanNumber(filters.rating?.[0]));
  setOrDelete(params, "vote_average.lte", cleanNumber(filters.rating?.[1]));
  setOrDelete(params, "with_runtime.gte", cleanNumber(filters.runtime?.[0]));
  setOrDelete(params, "with_runtime.lte", cleanNumber(filters.runtime?.[1]));

  if (DISCOVER_SORT[filters.sortBy]) params.set("sort_by", DISCOVER_SORT[filters.sortBy]);
  if (
    (filters.sortBy === "Rating" || hasRange(filters.rating)) &&
    !isUpcoming &&
    !params.has("vote_count.gte")
  ) {
    params.set("vote_count.gte", "100");
  }

  return `/discover/movie?${params.toString()}`;
}

export function searchParamsToFilters(params, genreList) {
  if (!FILTER_PARAM_KEYS.some((key) => params.has(key))) return null;

  const genre = (params.get("genre") || "")
    .split(",")
    .map((name) => name.trim())
    .filter((name) => genreList?.[name]);
  const ranges = { selectedYear: ["", ""], rating: ["", ""], runtime: ["", ""] };
  RANGE_KEYS.forEach(([key, field, index]) => {
    ranges[field][index] = cleanNumber(params.get(key));
  });

  return {
    genre,
    runtime: ranges.runtime,
    rating: ranges.rating,
    selectedYear: ranges.selectedYear,
    sort: PARAM_TO_SORT[params.get("sort")] || "",
    showMovie: PARAM_TO_SHOW[params.get("show")] || "Everything",
  };
}
