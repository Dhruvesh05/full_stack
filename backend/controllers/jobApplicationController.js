import mailjet from '../config/mailjet.js';
import dotenv from 'dotenv';

dotenv.config();

// Send email to HR with PDF attachment via Mailjet
const sendHRNotificationEmail = async (formData, fileBuffer, fileName) => {
  try {
    // Convert file buffer to base64
    const base64File = fileBuffer.toString('base64');

    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: 'Shubh Construction',
          },
          To: [
            {
              Email: process.env.RECEIVER_EMAIL,
              Name: 'HR Team',
            },
          ],
          ReplyTo: {
            Email: formData.email,
            Name: formData.fullname,
          },
          Subject: `New Job Application from ${formData.fullname} - ${formData.position}`,
          TextPart: `
New Job Application Received

Applicant Details:
- Full Name: ${formData.fullname}
- Email: ${formData.email}
- Mobile: ${formData.mobile}
- Position Applied: ${formData.position}
- Years of Experience: ${formData.total_experience}
- Current Employer: ${formData.current_employer}

Resume: ${fileName}

Please review the attached resume for more details.
          `,
          HTMLPart: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
    .header { background: #c41e3a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #c41e3a; }
    .value { margin-left: 10px; }
    .attachment { margin-top: 15px; padding: 10px; background: #f0f0f0; border-left: 4px solid #c41e3a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Job Application</h2>
    </div>
    <div class="content">
      <p><strong>A new job application has been received. Here are the details:</strong></p>
      
      <div class="field">
        <span class="label">Applicant Name:</span>
        <span class="value">${formData.fullname}</span>
      </div>
      
      <div class="field">
        <span class="label">Email:</span>
        <span class="value">${formData.email}</span>
      </div>
      
      <div class="field">
        <span class="label">Mobile Number:</span>
        <span class="value">${formData.mobile}</span>
      </div>
      
      <div class="field">
        <span class="label">Position Applied For:</span>
        <span class="value">${formData.position}</span>
      </div>
      
      <div class="field">
        <span class="label">Years of Experience:</span>
        <span class="value">${formData.total_experience}</span>
      </div>
      
      <div class="field">
        <span class="label">Currently Working At:</span>
        <span class="value">${formData.current_employer}</span>
      </div>
      
      <div class="attachment">
        <strong>📎 Resume Attached:</strong> ${fileName}
      </div>
      
      <p style="margin-top: 20px; font-style: italic; color: #666;">
        Please review the attached resume and contact the applicant at your earliest convenience.
      </p>
    </div>
  </div>
</body>
</html>
          `,
          Attachments: [
            {
              ContentType: 'application/pdf',
              Filename: fileName,
              Base64Content: base64File,
            },
          ],
        },
      ],
    });

    const response = await request;
    console.log('✅ HR notification email sent successfully');
    return response;
  } catch (error) {
    console.error('❌ Error sending HR notification email:', error);
    throw error;
  }
};

// Send thank you email to applicant via Mailjet
const sendApplicantThankYouEmail = async (formData) => {
  try {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: 'Shubh Construction - HR Team',
          },
          To: [
            {
              Email: formData.email,
              Name: formData.fullname,
            },
          ],
          Subject: 'Thank You for Your Job Application - Shubh Construction',
          TextPart: `
Dear ${formData.fullname},

Thank you for applying to Shubh Construction for the position of ${formData.position}.

We have successfully received your job application and resume. Our HR team will review your qualifications and get back to you shortly.

Application Details:
- Position Applied: ${formData.position}
- Application Date: ${new Date().toLocaleDateString('en-IN')}
- Contact Us: dhruveshpatil7777@gmail.com

We appreciate your interest in joining Shubh Construction. If you have any questions in the meantime, please feel free to reach out to us.

Best Regards,
Shubh Construction
HR Team
Bharuch, Gujarat, India
          `,
          HTMLPart: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background: linear-gradient(135deg, #c41e3a 0%, #a01829 100%); color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px 20px; }
    .greeting { font-size: 16px; margin-bottom: 15px; }
    .message { margin: 20px 0; color: #555; line-height: 1.8; }
    .details-box { background-color: #f9f9f9; border-left: 4px solid #c41e3a; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .detail-item { margin: 10px 0; }
    .detail-label { font-weight: bold; color: #c41e3a; }
    .detail-value { margin-left: 5px; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #eee; margin-top: 20px; font-size: 14px; color: #777; }
    .footer-links { margin-top: 15px; }
    .footer-links a { color: #c41e3a; text-decoration: none; margin: 0 10px; }
    .signature { margin-top: 25px; }
    .company-info { text-align: center; margin-top: 15px; color: #666; font-size: 13px; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Application Received!</h1>
      <p>Thank you for your interest in Shubh Construction</p>
    </div>
    
    <div class="content">
      <div class="greeting">
        <p>Dear <strong>${formData.fullname}</strong>,</p>
      </div>
      
      <div class="message">
        <p>Thank you for applying to <strong>Shubh Construction</strong> for the position of <strong>${formData.position}</strong>.</p>
        
        <p>We have successfully received your job application and resume. Our HR team will carefully review your qualifications and experience.</p>
        
        <p style="font-weight: 500; color: #c41e3a;">We will be in touch with you shortly regarding the next steps in our recruitment process.</p>
      </div>
      
      <div class="details-box">
        <div class="detail-item">
          <span class="detail-label">📋 Position Applied:</span>
          <span class="detail-value">${formData.position}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">📅 Application Date:</span>
          <span class="detail-value">${new Date().toLocaleDateString('en-IN')}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">📧 Contact Email:</span>
          <span class="detail-value">dhruveshpatil7777@gmail.com</span>
        </div>
      </div>
      
      <div class="message" style="margin-top: 25px;">
        <p><strong>Why Join Shubh Construction?</strong></p>
        <ul style="color: #555;">
          <li>Work on large-scale industrial and commercial projects</li>
          <li>Grow your career with an experienced leadership team</li>
          <li>Competitive compensation and benefits</li>
          <li>Safe and professional work environment</li>
        </ul>
      </div>
      
      <div class="message">
        <p>If you have any questions or need to provide additional information, please don't hesitate to contact us.</p>
      </div>
      
      <div class="signature">
        <p>Best Regards,</p>
        <p><strong>Shubh Construction</strong><br>HR Team</p>
      </div>
      
      <div class="company-info">
        <p>📍 Bharuch, Gujarat, India</p>
        <p>Building Excellence, One Project at a Time</p>
      </div>
      
      <div class="footer">
        <p style="margin: 0;">© 2026 Shubh Construction. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
          `,
        },
      ],
    });

    const response = await request;
    console.log('✅ Thank you email sent to applicant successfully');
    return response;
  } catch (error) {
    console.error('❌ Error sending thank you email to applicant:', error);
    throw error;
  }
};

// Create job application and send emails
export const submitJobApplication = async (req, res) => {
  try {
    console.log('📮 Job application received');
    console.log('Form data:', req.body);
    console.log('File info:', req.file);

    // Validate required fields
    const requiredFields = ['fullname', 'email', 'mobile', 'position', 'total_experience', 'current_employer'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required',
      });
    }

    // Validate file type (PDF, DOC, DOCX)
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Only PDF, DOC, and DOCX files are allowed',
      });
    }

    // Send HR notification email with resume attachment
    console.log('📧 Sending HR notification email...');
    await sendHRNotificationEmail(req.body, req.file.buffer, req.file.originalname);

    // Send thank you email to applicant
    console.log('📧 Sending thank you email to applicant...');
    await sendApplicantThankYouEmail(req.body);

    console.log('✅ Job application processed successfully - Both emails sent');
    res.status(200).json({
      success: true,
      message: 'Application submitted successfully! We will review your resume and contact you soon. A confirmation email has been sent to your email address.',
    });
  } catch (error) {
    console.error('❌ Error processing job application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
