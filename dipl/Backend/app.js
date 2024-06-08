const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { authenticateToken } = require('./middleware');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const userRoutes = require('./src/routes/usersroutes');
const taskRoutes = require('./src/routes/taskroutes');
const companyRoutes = require('./src/routes/companiesroutes');

// Public routes
app.use('/api/users', userRoutes);

// Protected routes
app.use('/api/tasks', authenticateToken, taskRoutes);
app.use('/api/companies', authenticateToken, companyRoutes);

app.use('/api/users',authenticateToken, userRoutes);

// Route to serve uploaded files
app.get('/api/users/files/:fileId', authenticateToken, async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.contentType(file.fileCategory);
    bucket.openDownloadStream(file._id).pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));