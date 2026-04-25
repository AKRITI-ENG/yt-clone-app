# YouTube Clone App

A responsive YouTube-style React app built for a college/team project. It uses Vite for the frontend and JSON Server for local mock API data.

## Features

- Home feed with a responsive video grid
- Category filters for browsing videos
- Watch page with video player, metadata, like action, comments, and related videos
- Debounced search that navigates to `/search?q=query`
- Channel page with banner, avatar, subscribers, description, and uploads
- Liked videos persisted in `localStorage`
- Watch history persisted in `localStorage`
- Collapsible sidebar with active navigation links
- Dark/light theme toggle persisted in `localStorage`
- Loading, empty, and error states for data-driven screens

## Tech Stack

- React
- Vite
- React Router
- Axios
- JSON Server
- Concurrently
- CSS Modules
- Vitest

## Folder Structure

```text
src/
  components/     Reusable UI components
  context/        App state and theme providers
  data/           db.json mock API data
  hooks/          Custom hooks for fetching and debounced input
  pages/          Route-level pages
  utils/          Formatting helpers
```

## How To Run

Install dependencies:

```bash
npm install
```

Start the Vite frontend:

```bash
npm run dev
```

Start JSON Server on port 3001:

```bash
npm run server
```

Run the frontend and JSON Server together:

```bash
npm run dev:all
```

By default, the app reads API data from `http://localhost:3001`. You can override that with `VITE_API_BASE_URL` in `.env`.

## API Endpoints

JSON Server serves data from `src/data/db.json`.

```text
GET /videos
GET /videos/:id
GET /channels
GET /channels/:id
GET /comments?videoId=:id
```

Useful filtered endpoint:

```text
GET /videos?channelId=:id
```

## Quality Checks

```bash
npm run lint
npm test
npm run build
```

## Contributor Note

Upgraded by paliwalakansha39
