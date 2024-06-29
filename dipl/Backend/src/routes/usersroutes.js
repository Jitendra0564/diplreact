const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Grid = require('gridfs-stream');
const { authenticateToken } = require('../middleware');
const User = require('../models/UsersModels');
const File = require('../models/fileupload');
const {
  registerUser,
  loginUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
  getAllUsers,
} = require('../controllers/usercontoller');

// Multer storage configuration
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Public routes
router.post('/register', upload.fields([{ name: 'pancard' }, { name: 'resume' }, { name: 'photo' }, { name: 'idProof' }]), registerUser);
router.post('/login', loginUser);

// Middleware to check for admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ msg: 'Access denied. Admin role required.' });
  }
};

// Protected routes
router.use(authenticateToken);

// Route to get users with only 3 fields
router.get('/users', authenticateToken, getUsers);

// Create a new user (requires admin role)
router.post('/', isAdmin, upload.fields([
  { name: 'pancard', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'idProof', maxCount: 1 }]), createUser);

// Get a user by ID (requires admin role)
router.get('/:id', authenticateToken, getUserById);

router.get('/:id/files',authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('files');
    res.json({ files: user.files });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id/files/:fileId', authenticateToken, async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    const db = mongoose.connection.db;
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'uploads',
    });

    const file = await bucket.find({ _id: fileId }).next();

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.set('Content-Type', file.metadata.fileType);
    res.set('Content-Disposition', `attachment; filename="${file.filename}"`);

    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);
  } catch (err) {
    console.error('Error fetching file:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Route to get all users with all fields
router.get('/', authenticateToken, getAllUsers);

// Update a user (requires admin role)
router.put('/:id', isAdmin, updateUser);

// Delete a user (requires admin role)
router.delete('/:id', isAdmin, deleteUser);

module.exports = router;
