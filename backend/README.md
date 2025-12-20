# 3Netra Backend - Public API

This README describes how to run the backend public API and quick curl commands to exercise the endpoints.

Prerequisites
- Node.js (16+)
- (Optional) MongoDB and `MONGO_URI` env var. If `MONGO_URI` is not set the server will run with an in-memory fallback.

Quick start

```bash
cd backend
npm install
# set PORT and optionally MONGO_URI
# example: export MONGO_URI='mongodb://localhost:27017/3netra'
# on Windows use: set MONGO_URI=...
# start server
npm run dev
```

Public API endpoints (no auth required)

List registered videos

```bash
curl http://localhost:5000/api/public/registered-videos
```

Create a registered video (frontend posts to this when adding content)

```bash
curl -X POST http://localhost:5000/api/public/registered-videos \
  -H "Content-Type: application/json" \
  -d '{"movieName":"My Movie","releaseYear":2023,"language":"Telugu","sourceUrl":"http://example.com/video.mp4","notes":"Test video","duration":120}'
```

Get a single video

```bash
curl http://localhost:5000/api/public/registered-videos/REG-<TIMESTAMP>
```

Add a detected match to a registered video

```bash
curl -X POST http://localhost:5000/api/public/registered-videos/REG-<TIMESTAMP>/matches \
  -H "Content-Type: application/json" \
  -d '{"match":"some match data"}'
```

Migrate existing movies to add externalId (run once after setup)

```bash
curl -X POST http://localhost:5000/api/public/migrate-external-ids
```

Run integration tests

```bash
npm test
```

Notes
- If `MONGO_URI` is set the public API persists to MongoDB using the existing `Movie` model.
- If `MONGO_URI` is not set the API uses an in-memory fallback for quick local testing (process-lifetime only).
- Frontend was updated to POST to `/api/public/registered-videos` but the UI code was not changed.
- Integration tests are included and can be run with `npm test`.
