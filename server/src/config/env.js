import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from server directory
const result = dotenv.config({ path: join(__dirname, '..', '..', '.env') });

if (result.error) {
  console.error('⚠️  Warning: Could not load .env file:', result.error.message);
  console.error('Make sure .env file exists in the server directory');
}

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error('\n❌ ERROR: JWT_SECRET is not set in environment variables');
  console.error('Please create a .env file in the server directory with JWT_SECRET');
  console.error('Example: JWT_SECRET=your-secret-key-here\n');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('\n❌ ERROR: MONGODB_URI is not set in environment variables');
  console.error('Please create a .env file in the server directory with MONGODB_URI');
  console.error('Example: MONGODB_URI=mongodb://localhost:27017/keeper\n');
  process.exit(1);
}

export default {};
