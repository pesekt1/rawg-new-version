# Game Database Client

A React frontend for the Game database project.  
Built with Vite, TypeScript, Chakra UI, React Query, and more.

---

## Features

- Browse, search, and filter games from the Game database API backend
- User authentication (login/register)
- Manage wishlists and libraries
- Responsive UI with Chakra UI
- Infinite scroll and advanced filtering
- Error tracking with Sentry
- Error handling
- Custom hooks for API calls
- TypeScript for type safety
- CRUD operations for games, genres, tags, publishers, developers, stores, wishlists, and libraries
- Admin access for editing and deleting the entities

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000) by default.

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Environment Variables

If you need to configure the backend API URL or other settings, create a `.env` file in this directory.  
Example:

```
VITE_API_URL = http://localhost:5000
VITE_SENTRY_DSN = <your_sentry_dsn_here>
```

---

## Project Structure

```
rawg-client/
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── utils/           # Utility/helper functions
│   ├── domains/         # Domain types/interfaces/models
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── ...
```
