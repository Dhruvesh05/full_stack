const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://shubh-construction.vercel.app",
    methods: ["GET", "POST"],
  })
);

app.get("/", (req, res) => {
  res.send("Backend is running properly ✅");
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = file.originalname.toLowerCase();
    if (
      ext.endsWith(".pdf") ||
      ext.endsWith(".doc") ||
      ext.endsWith(".docx")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX files allowed"));
    }
  },
});

app.post("/api/job-application", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file missing" });
    }

    const {
      fullname,
      email,
      mobile,
      total_experience,
      current_employer,
      position,
    } = req.body;

    // Check for missing required fields
    if (!fullname || !email || !mobile || !total_experience || !current_employer || !position) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email format (basic)
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    // Validate mobile (basic, 10+ digits)
    if (!/^\+?\d{10,}$/.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.verify();
    } catch (smtpErr) {
      console.error("SMTP connection error:", smtpErr);
      return res.status(500).json({ message: "SMTP connection failed. Check mail server credentials." });
    }

    try {
      await transporter.sendMail({
        from: `"Careers - Shubh Construction" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: email,
        subject: `New Job Application - ${fullname}`,
        html: `
          <h2>New Job Application</h2>
          <p><b>Name:</b> ${fullname}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Mobile:</b> ${mobile}</p>
          <p><b>Total Experience:</b> ${total_experience} years</p>
          <p><b>Current Employer:</b> ${current_employer}</p>
          <p><b>Position:</b> ${position}</p>
        `,
        attachments: [
          {
            filename: req.file.originalname,
            content: req.file.buffer,
          },
        ],
      });
    } catch (mailErr) {
      console.error("Error sending company mail:", mailErr);
      return res.status(500).json({ message: "Failed to send application to company." });
    }

    try {
      await transporter.sendMail({
        from: `"Shubh Construction" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Application Received ✅",
        html: `
          <p>Hi ${fullname},</p>
          <p>Thank you for applying at <b>Shubh Construction</b>.</p>
          <p>Our HR team will contact you if shortlisted.</p>
          <br />
          <p>Regards,<br/>Shubh Construction</p>
        `,
      });
    } catch (mailErr) {
      console.error("Error sending confirmation mail:", mailErr);
      // Don't fail the whole request if user mail fails
    }

    return res.status(200).json({
      message: "Job application submitted successfully ✅",
    });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return res.status(500).json({
      message: error && error.message ? error.message : "Mail sending failed ❌",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
