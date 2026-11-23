# Mad4Movies – Frontend

The React client for Mad4Movies. It talks to TMDb directly for movie data and to the Mad4Movies backend for accounts, lists and reviews.

Built with React 19 and Vite, with Redux Toolkit for app state, React Router for pages and TanStack Query for some of the movie requests.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The dev server runs at http://localhost:5173.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_TMDB_API_KEY` | TMDb API key, used for all movie and people data |
| `VITE_API_URL` | Base URL of the backend, e.g. `http://localhost:3000` |
| `VITE_FRONTEND_URL` | Public URL of the site, used when building share links |

## How it's organised

```
src/
├── components/   pages and UI, one file per component
├── features/     Redux slices
│   ├── AuthSlice.js          login, signup, current user
│   ├── MovieDetailsSlice.js  lists, filters, recently viewed
│   ├── ReviewSlice.js        reviews, likes and dislikes
│   ├── ColorSlice.js         light / dark theme
│   └── FAQSlice.js
├── utils/
│   ├── tmdb.js               TMDb URL helper and batch movie lookup
│   ├── filterParams.js       filters <-> URL query and TMDb discover params
│   ├── useFilterUrlSync.js   keeps the filter panel and the URL in step
│   └── movieFilters.js       browser-side filtering (seen / unseen, saved lists)
└── main.jsx      routes
```

## Notes

**Filters.** On the category and genre pages, the selected genre, year, rating, runtime and sort are sent to TMDb's `/discover/movie` endpoint, so results come from the whole catalogue. Pages like Top Rated or Upcoming are recreated on discover with matching settings (for example, Top Rated sorts by rating with a minimum vote count). The current filters are written to the query string, e.g. `/top-rated-movies?genre=Crime&sort=release_desc`, and read back on load.

**Saved lists and search.** The watchlist, favorites and search results are filtered in the browser, since TMDb can't filter a custom list or a title search by these fields.

**Reviews.** Likes and dislikes update the screen immediately and roll back if the request to the backend fails.

**Deployment.** The app is deployed on Vercel. `vercel.json` rewrites every path to `index.html` so client-side routes work on refresh.
