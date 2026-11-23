# Mad4Movies

A movie discovery app built on the MERN stack. Browse what's trending, in cinemas, upcoming or top rated, filter by genre, year, rating and runtime, read and write reviews, and keep a watchlist and favorites tied to your account.

Movie data comes from [TMDb](https://www.themoviedb.org/). User accounts, lists and reviews are stored in MongoDB.

**Live:** [mad4movies.vercel.app](https://mad4movies.vercel.app)

## Features

**Browsing**
- Home page with a featured slider and rows for trending, in-cinema and upcoming movies
- Full list pages for each category, plus a page per genre
- Title search with paged results
- Filters for genre, release year, rating, runtime and sort order. They are applied by TMDb, so they search the whole catalogue rather than only the movies on screen, and they are kept in the URL, so a filtered page can be bookmarked or shared.
- A "seen / unseen" filter based on your watched history

**Movie and people pages**
- Overview, runtime, genres, cast and key crew for every movie
- Trailer, where it's available to stream, and similar and recommended titles
- Pages for actors and directors with their biography and filmography

**Accounts**
- Sign up with email and password, or sign in with Google
- Watchlist, favorites and watched history, saved to your account
- Rate movies out of 10
- Write, edit and delete reviews, and like or dislike other people's reviews
- Public profile at `/user/<username>` with editable details
- Light and dark theme, remembered by the browser

## Tech stack

| Part | Tools |
| --- | --- |
| Frontend | React 19, Vite, Redux Toolkit, React Router, TanStack Query |
| Backend | Node.js, Express 5, Mongoose |
| Auth | JWT, Passport (local and Google OAuth 2.0), bcrypt |
| Data | MongoDB, TMDb API |
| Hosting | Vercel (frontend), Render (backend) |

Styling is done with inline styles and a few styled-components; there is no CSS framework.

## Project structure

```
Mad4Movies/
├── Frontend/          React app (Vite)
│   └── src/
│       ├── components/   pages and UI components
│       ├── features/     Redux slices (auth, movies, reviews, theme, FAQ)
│       └── utils/        TMDb helpers, filter logic, URL sync
└── Backend/           Express API
    ├── models/           User and Review schemas
    ├── routes/           auth, user and review endpoints
    ├── jwt.js            token signing and auth middleware
    ├── passport.js       Google OAuth strategy
    └── server.js         app setup and CORS
```

More detail is in [Frontend/README.md](Frontend/README.md) and [Backend/README.md](Backend/README.md).

## Running locally

You need Node.js 18 or newer, a MongoDB database (local or Atlas), and a free [TMDb API key](https://www.themoviedb.org/settings/api).

**1. Backend**

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```
MONGODB_URL=your MongoDB connection string
JWT_SECRET=a long random string
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your Google OAuth client ID
GOOGLE_CLIENT_SECRET=your Google OAuth client secret
```

A good `JWT_SECRET` can be generated with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Then start the server on port 3000:

```bash
npm start
```

**2. Frontend**

```bash
cd Frontend
npm install
```

Create `Frontend/.env` (see `Frontend/.env.example`):

```
VITE_TMDB_API_KEY=your TMDb API key
VITE_API_URL=http://localhost:3000
VITE_FRONTEND_URL=http://localhost:5173
```

Then run the dev server:

```bash
npm run dev
```

The app opens at http://localhost:5173.

## Known limitations

- The Google OAuth callback URL is set to the deployed backend in `Backend/passport.js`, so Google sign-in only works locally if you change it to `http://localhost:3000/auth/google/callback` and add that URL to your Google OAuth client.
- The TMDb key is used from the browser, so it is visible in network requests. TMDb keys are read-only, but a backend proxy would hide it.
- The seen / unseen filter runs in the browser on the movies already loaded, because TMDb doesn't know your watch history.
- There are no automated tests yet.

## Credits

This product uses the TMDb API but is not endorsed or certified by TMDb.
