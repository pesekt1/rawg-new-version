# Game Database Server

A Node.js/Express REST API for managing games, genres, tags, publishers, developers, stores, wishlists, and libraries.  
Built with TypeScript, [tsoa](https://github.com/lukeautry/tsoa) for OpenAPI docs, and deployed on [Render.com](https://render.com/).

---

## Features

- RESTful API for games, genres, tags, publishers, developers, stores, wishlists, and libraries
- JWT authentication (admin/user roles)
- OpenAPI 3.0 documentation (Swagger UI and ReDoc)
  - .../docs
  - .../redoc
  - .../swagger.json
- TypeScript-first development with tsoa
- Error handling middleware
- Ready for deployment (e.g., Render.com, Azure)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root with your configuration. Example:

```
DATABASE_URL=mysql://root:rootpassword@mysql:3306/rawgDatabase
SERVER_URL=http://localhost:5000
PORT=5000
JWT_SECRET=dev_secret
```

## API Documentation

- **Swagger UI:**  
  [http://localhost:5000/docs](http://localhost:5000/docs) (or `/docs` on your deployed backend)
- **ReDoc:**  
  [http://localhost:5000/redoc](http://localhost:5000/redoc)
- **OpenAPI JSON:**  
  [http://localhost:5000/swagger.json](http://localhost:5000/swagger.json)

---

## Project Structure

## Deployment Notes

- The app is built and run from the `dist` folder (compiled JS).
- Ensure `swagger.json` is present in the deployed folder (copy it to `dist/` if needed).
- The server uses the `PORT` environment variable (set automatically by Render.com).
- Access API docs at `/docs` and `/redoc` on your backend URL.
