# Mad4Movies – Backend

The Express API behind Mad4Movies. It handles sign-up and login (email/password and Google), user profiles and saved lists, and movie reviews. Movie data itself comes from TMDb and is fetched by the frontend, not by this server.

## Getting started

```bash
npm install
npm start
```

The server listens on port 3000.

Create a `.env` file first:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign login tokens. The server won't start without it. |
| `FRONTEND_URL` | Frontend origin allowed by CORS and used as the Google login redirect |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

To generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## API

**Auth**

| Method | Path | |
| --- | --- | --- |
| POST | `/auth/signup` | Create an account |
| POST | `/auth/login` | Log in, returns a token |
| GET | `/auth/me` | Current user (needs `Authorization: Bearer <token>`) |
| GET | `/auth/google` | Start Google sign-in |
| GET | `/auth/google/callback` | Google redirects here, then back to the frontend with a token |
| GET | `/api/verify-auth` | Check that a token is valid (needs a token) |

**Users**

| Method | Path | |
| --- | --- | --- |
| GET | `/user/:username` | Public profile |
| PUT | `/user/update/:id` | Update profile, lists or ratings |

**Reviews**

| Method | Path | |
| --- | --- | --- |
| GET | `/reviews/:movieId` | Reviews for a movie |
| POST | `/reviews/create` | Add a review |
| PUT | `/reviews/update/review/:reviewId` | Edit your review |
| POST | `/reviews/update/like/:reviewId` | Like or dislike a review |
| DELETE | `/reviews/delete/:reviewId` | Delete your review |

## Structure

```
models/
├── user.js       profile, watchlist, favorites, watched, ratings
└── reviews.js    review text, author, likes and dislikes
routes/
├── auth.js
├── userRoute.js
└── reviewsRoute.js
db.js             MongoDB connection
jwt.js            token signing and auth middleware
passport.js       Google OAuth strategy
server.js         app setup, CORS, Google routes
```

## Security

- Passwords are hashed with bcrypt (cost 12).
- Logins return a JWT signed with `JWT_SECRET`, valid for 90 days.
- CORS accepts browser requests from `FRONTEND_URL`, the Vercel site and `localhost:5173`.

## Deployment

Deployed on Render. The Google callback URL in `passport.js` points at the Render service; change it to `http://localhost:3000/auth/google/callback` (and register it with Google) to test Google sign-in locally.
