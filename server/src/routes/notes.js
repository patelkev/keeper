import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import Note from '../models/Note.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/notes
// @desc    Get all notes for authenticated user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post(
  '/',
  [
    body('content')
      .trim()
      .notEmpty()
      .withMessage('Note content is required'),
    body('title')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, content } = req.body;

      const note = await Note.create({
        title: title || '',
        content,
        user: req.user._id,
      });

      res.status(201).json(note);
    } catch (error) {
      console.error('Create note error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put(
  '/:id',
  [
    body('content')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Note content cannot be empty'),
    body('title')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

      // Check if note belongs to user
      if (note.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      const { title, content } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {
          ...(title !== undefined && { title }),
          ...(content !== undefined && { content }),
        },
        { new: true, runValidators: true }
      );

      res.json(updatedNote);
    } catch (error) {
      console.error('Update note error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
