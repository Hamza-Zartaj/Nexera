# Nexera

The app is split into:

- `frontend/` - React 19 + Vite public site and user dashboard
- `backend/` - Express + MongoDB API

## Prerequisites

- Node.js 20 or newer recommended
- npm
- MongoDB connection string
- OpenAI API key for AI quiz, roadmap, resources, blog, and CV evaluation routes
- SMTP/app-password credentials for email notifications
- Optional Google OAuth client id for Google login

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Set the values in `backend/.env` before using database, auth, email, OpenAI, or Google OAuth routes.

The backend listens on `http://localhost:5000` by default. A health check is available at:

```text
GET /api/health
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend uses `VITE_API_BASE_URL` and defaults to `http://localhost:5000` when the variable is not set.

## Build

```bash
cd frontend
npm run build
```

## Notes

- The original three copy folders were not modified.
- `frontend/.env.example` and `backend/.env.example` contain placeholders only.
- Google login appears only when `VITE_GOOGLE_CLIENT_ID` is configured.
