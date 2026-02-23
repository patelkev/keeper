import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import passport from '../config/passport.js';
import User from '../models/User.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('username')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Check if user already exists
      const userExists = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (userExists) {
        return res.status(400).json({
          message: 'User with this email or username already exists',
        });
      }

      // Create user
      const user = await User.create({
        username,
        email,
        password,
      });

      // Generate token
      const token = generateToken(user._id);

      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      if (!user) {
        return res.status(401).json({ message: info.message || 'Invalid credentials' });
      }

      const token = generateToken(user._id);

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    })(req, res, next);
  }
);

export default router;
