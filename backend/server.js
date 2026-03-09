const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/projects', projectRoutes);

// Basic upload route
app.post('/api/uploads', (req, res) => {
  res.json({ message: 'Upload endpoint - configure multer for actual uploads' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Shubh Construction API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
