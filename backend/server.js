const express = require("express");
const multer = require("multer");
const cors = require("cors");
const Mailjet = require("node-mailjet");
require("dotenv").config();

const app = express();


app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://shubh-construction.vercel.app",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running properly");
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX files allowed"));
    }
  },
});

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

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

    if (!fullname || !email || !mobile || !total_experience || !current_employer || !position) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const attachmentBase64 = req.file.buffer.toString("base64");

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: "Shubh Construction",
          },
          To: [
            {
              Email: process.env.RECEIVER_EMAIL,
              Name: "HR Team",
            },
          ],
          Subject: `New Job Application - ${fullname}`,
          HTMLPart: `
            <h3>New Job Application</h3>
            <p><b>Name:</b> ${fullname}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Mobile:</b> ${mobile}</p>
            <p><b>Total Experience:</b> ${total_experience} years</p>
            <p><b>Current Employer:</b> ${current_employer}</p>
            <p><b>Position:</b> ${position}</p>
          `,
          Attachments: [
            {
              ContentType: req.file.mimetype,
              Filename: req.file.originalname,
              Base64Content: attachmentBase64,
            },
          ],
        },
      ],
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: "Shubh Construction",
          },
          To: [
            {
              Email: email,
              Name: fullname,
            },
          ],
          Subject: "Application Received",
          HTMLPart: `
            <p>Hi ${fullname},</p>
            <p>Thank you for applying at <b>Shubh Construction</b>.</p>
            <p>Our HR team will contact you if shortlisted.</p>
            <br/>
            <p>Regards,<br/>Shubh Construction</p>
          `,
        },
      ],
    });

    return res.status(200).json({
      message: "Job application submitted successfully",
    });

  } catch (error) {
    console.error("MAILJET ERROR 👉", error);
    return res.status(500).json({
      message: "Failed to send job application",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
