# InterviewFlow

Full-stack interview management platform built with React, Node.js, MongoDB, and AI integrations.

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS + DaisyUI
- Clerk (Authentication)
- Stream (Real-time features)

**Backend:**
- Node.js + Express
- MongoDB Atlas
- Clerk SDK
- Inngest (Background jobs)

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Clerk account
- Stream account
- Inngest account

### Backend Setup

1. Navigate to backend:
```bash
   cd backend
```

2. Install dependencies:
```bash
   npm install
```

3. Create `.env` file:
```bash
   cp .env.example .env
```

4. Update `.env` with your actual credentials

5. Start server:
```bash
   npm start
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend:
```bash
   cd frontend
```

2. Install dependencies:
```bash
   npm install
```

3. Create `.env` file:
```bash
   cp .env.example .env
```

4. Update `.env` with your actual credentials

5. Start dev server:
```bash
   npm run dev
```

Frontend runs on: `http://localhost:5173`

## Project Structure
```
InterviewFlow/
├── backend/
│   ├── src/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── pnpm-lock.yaml
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── pnpm-lock.yaml
├── .gitignore
└── README.md
```

## Environment Variables

See `.env.example` files in backend and frontend folders for required environment variables.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

## License

MIT
