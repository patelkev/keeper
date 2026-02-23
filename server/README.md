# Keeper Backend Server

Backend API server for the Keeper note-taking application.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/keeper
# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/keeper

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Or run directly
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "username": "string", "email": "string", "password": "string" }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`

### Notes (Protected - requires authentication)

- `GET /api/notes` - Get all notes for authenticated user
  - Headers: `Authorization: Bearer <token>`

- `POST /api/notes` - Create a new note
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "title": "string (optional)", "content": "string" }`

- `DELETE /api/notes/:id` - Delete a note
  - Headers: `Authorization: Bearer <token>`

- `PUT /api/notes/:id` - Update a note
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "title": "string (optional)", "content": "string (optional)" }`

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── passport.js      # Passport.js strategies
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── models/
│   │   ├── User.js          # User model
│   │   └── Note.js          # Note model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── notes.js         # Notes routes
│   └── server.js            # Express server setup
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment variables template
├── package.json
└── README.md
```

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Protected routes require valid JWT token
- Input validation using express-validator
- CORS configured for frontend origin
