# Quick Test Guide - Dual Email Job Application

## 🚀 Quick Start (5 minutes)

### Terminal 1: Start Backend
```bash
cd c:\Users\dhruv\shubh_construction\backend
node server.js
```
**Expected Output:**
```
✅ Server running on http://localhost:5000
📝 API Documentation:
   - POST /api/job-application → Submit job application with resume
✅ Database connected successfully
```

### Terminal 2: Start Frontend  
```bash
cd c:\Users\dhruv\shubh_construction\frontend
npm run dev
```
**Expected Output:**
```
  ▲ Next.js [version]
  - localhost:3000
```

---

## 📋 Test Form Data

Use this data to test the application:

```
Full Name:              John Doe
Email Address:          john.doe@example.com  ← Will receive thank you email
Mobile No.:             +919876543210
Total Years of Exp:     5
Currently Working At:   ABC Construction Ltd
Position:               Senior Engineer
Resume:                 (Any PDF/DOC/DOCX file)
```

---

## 🎯 Test Steps

### Step 1: Open Browser
Navigate to: **http://localhost:3000/careers**

### Step 2: Fill Form
- Full Name: **John Doe**
- Email: **john.doe@example.com**
- Mobile: **+919876543210**
- Years of Experience: **5**
- Current Employer: **ABC Construction Ltd**
- Position: **Senior Engineer** (select from dropdown)
- Resume: **Click file input → Select any PDF/DOC file**

### Step 3: Submit
Click **"Submit Your Application"** button

### Step 4: Check Success
You should see:
```
✅ "Application submitted successfully! We will review your resume 
   and contact you soon. A confirmation email has been sent to 
   your email address."
```

---

## 📧 What You'll Receive

### Email 1: HR Notification (Immediate)
**Inbox:** dhruveshpatil7777@gmail.com
**Subject:** "New Job Application from John Doe - Senior Engineer"

**Contains:**
- ✅ All applicant details
- ✅ Resume file attached (PDF)
- ✅ Can reply to John Doe directly

---

### Email 2: Thank You Email (Immediate)
**Inbox:** john.doe@example.com
**Subject:** "Thank You for Your Job Application - Shubh Construction"

**Contains:**
- ✅ Personalized thank you message
- ✅ Position name and application date
- ✅ Company benefits overview
- ✅ Next steps timeline
- ✅ Contact information

---

## 🔍 Backend Console Output

You should see in Terminal 1:
```
📮 Job application received
Form data: {
  fullname: 'John Doe',
  email: 'john.doe@example.com',
  mobile: '+919876543210',
  position: 'Senior Engineer',
  total_experience: '5',
  current_employer: 'ABC Construction Ltd'
}
📧 Sending HR notification email...
✅ HR notification email sent successfully
📧 Sending thank you email to applicant...
✅ Thank you email sent to applicant successfully
✅ Job application processed successfully - Both emails sent
📬 [RESPONSE] POST /api/job-application - Status: 200
```

---

## ❌ Troubleshooting

### Issue: Form won't submit
**Solution:**
- Ensure all fields are filled
- Check that resume file is selected
- File must be PDF/DOC/DOCX
- File must be under 10MB

### Issue: 404 error on submit
**Solution:**
- Check backend is running on http://localhost:5000
- Verify server shows "✅ Server running on http://localhost:5000"

### Issue: Form submits but no success message
**Solution:**
- Check browser console (F12 → Console tab)
- Check network tab for API response
- Verify backend is still running

### Issue: Emails not received
**Solution:**
- Check spam/junk folder
- Wait 2-3 minutes (sometimes delayed)
- Check server logs for email errors
- Verify Mailjet credentials in .env are correct

---

## 📊 Verification Checklist

After submitting the form:

- [ ] Frontend shows success message
- [ ] Browser console shows no errors
- [ ] Backend console shows both emails sent
- [ ] Email received in dhruveshpatil7777@gmail.com inbox
- [ ] Email received in applicant's inbox (john.doe@example.com)
- [ ] Resume attachment in HR email
- [ ] Thank you message in applicant email

✅ If all boxes checked → System is working perfectly!

---

## 💡 Key Features Verified

✅ Form validation (all fields required)
✅ File upload (resume accepted)
✅ HR notification with attachment
✅ Applicant thank you email
✅ Email formatting (HTML)
✅ Error handling
✅ Success response

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ Form accepts submission without errors
2. ✅ Success message appears on screen
3. ✅ Backend logs show "Both emails sent"
4. ✅ HR receives email with resume
5. ✅ Applicant receives thank you email
6. ✅ Both emails have professional formatting

---

**Ready to Test?** Start from "🚀 Quick Start" section above!
