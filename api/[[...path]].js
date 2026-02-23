/**
 * Vercel serverless entry: forwards all /api/* requests to the Express app.
 * This lets the same backend run on Vercel with env vars set in the dashboard.
 */
import app from '../server/src/app.js';

export default function handler(req, res) {
  return app(req, res);
}
