import express from 'express';
import multer from 'multer';
import { submitJobApplication } from '../controllers/jobApplicationController.js';

const router = express.Router();

// Configure multer for resume uploads (memory storage for email attachment)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Accept PDF and Word documents
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for resumes
  },
});

// POST job application endpoint
router.post('/', upload.single('resume'), submitJobApplication);

export default router;
