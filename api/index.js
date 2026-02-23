/**
 * Vercel serverless entry: handles all /api/* (via vercel.json rewrite).
 * Rewrite sends /api?path=... so we restore req.url for Express.
 */
import app from '../server/src/app.js';

export default function handler(req, res) {
  const pathSegment = req.query?.path;
  if (pathSegment) {
    req.url = '/api/' + (Array.isArray(pathSegment) ? pathSegment.join('/') : pathSegment);
  }
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + (req.url || ''));
  }
  return app(req, res);
}
