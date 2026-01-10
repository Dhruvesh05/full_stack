const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------- CORS ---------- */
app.use(
  cors({
    origin: "https://shubh-construction.vercel.app",
    methods: ["GET", "POST"],
  })
);

/* ---------- TEST ---------- */
app.get("/", (req, res) => {
  res.send("Backend is running properly ✅");
});

/* ---------- MULTER (MEMORY) ---------- */
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
/* ---------- API ---------- */
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

    /* ---------- SMTP ---------- */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    /* ---------- COMPANY MAIL ---------- */
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

    /* ---------- USER CONFIRMATION MAIL ---------- */
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

    return res.status(200).json({
      message: "Job application submitted successfully ✅",
    });
  } catch (error) {
    console.error("MAIL ERROR 👉", error);
    return res.status(500).json({
      message: "Mail sending failed ❌",
    });
  }
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
