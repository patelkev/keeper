# Keeper Full-Stack Setup Guide

This guide will help you set up the Keeper application with its backend server and frontend.

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local MongoDB installation ([Download](https://www.mongodb.com/try/download/community))
  - MongoDB Atlas account ([Sign up](https://www.mongodb.com/cloud/atlas)) for cloud database

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/patelkev/keeper.git
cd keeper

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**

```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Or run directly
mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/keeper`)

### 3. Configure Environment Variables

**Backend Configuration:**

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
NODE_ENV=development

# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/keeper

# For MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/keeper

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Frontend Configuration (Optional):**

```bash
# In the root directory
cp .env.example .env
```

Edit `.env` (only if your backend runs on a different URL):

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Application

**Terminal 1 - Start Backend:**

```bash
cd server
npm run dev
```

Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**

```bash
# In the root directory
npm run dev
```

Frontend will run on `http://localhost:5173`

### 5. Use the Application

1. Open `http://localhost:5173` in your browser
2. Click "Register here" to create an account
3. Fill in username, email, and password
4. Start creating notes!

## Project Structure

```
keeper/
├── server/                 # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/         # Database & Passport config
│   │   ├── models/         # MongoDB models (User, Note)
│   │   ├── routes/         # API routes (auth, notes)
│   │   ├── middleware/     # Auth middleware
│   │   └── server.js       # Express server
│   ├── .env                # Backend environment variables
│   └── package.json
├── src/                    # Frontend (React + Vite)
│   ├── components/         # React components
│   ├── context/           # Auth context
│   ├── utils/             # API utilities
│   └── styles/            # CSS styles
├── .env                   # Frontend environment variables
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Notes (Protected)
- `GET /api/notes` - Get all user's notes
- `POST /api/notes` - Create a new note
- `DELETE /api/notes/:id` - Delete a note
- `PUT /api/notes/:id` - Update a note

## Troubleshooting

### MongoDB Connection Issues

**Local MongoDB:**
- Ensure MongoDB is running: `brew services list` (macOS) or check service status
- Check if port 27017 is available
- Verify connection string in `.env`

**MongoDB Atlas:**
- Ensure your IP is whitelisted in Atlas Network Access
- Check username/password in connection string
- Verify cluster is running

### CORS Errors

- Ensure `FRONTEND_URL` in `server/.env` matches your frontend URL
- Check that backend is running on the correct port

### Authentication Issues

- Verify JWT_SECRET is set in `server/.env`
- Check browser console for API errors
- Ensure token is being stored in localStorage

## Production Deployment

### Backend
- Set `NODE_ENV=production`
- Use a strong, random `JWT_SECRET`
- Use MongoDB Atlas or managed MongoDB service
- Deploy to services like Heroku, Railway, or Render

### Frontend
- Build: `npm run build`
- Deploy `dist/` folder to Vercel, Netlify, or similar
- Update `VITE_API_URL` to production backend URL

## Need Help?

Check the individual README files:
- Backend: `server/README.md`
- Frontend: `README.md`
