# EmailJS Integration - Complete Setup Guide

## 📋 Overview
This guide provides complete setup instructions for the BookingForm EmailJS integration with dual email sending (Admin + User).

---

## 🔧 Environment Variables

Add these to `.env.local` in your Next.js project root:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id
NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID=your_user_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_ADMIN_EMAIL=shubhconstruction@gmail.com
```

### Current Values:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_kzymcvb
NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID=template_gtnftin
NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID=template_oy5t6us
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=QOb_xBt23OVQYCiZS
NEXT_PUBLIC_ADMIN_EMAIL=shubhconstruction@gmail.com
```

---

## 📧 Email Template Setup in EmailJS

### Template Variables (CRITICAL - Must Match Exactly)

The following variables are sent from the form:
```
{{name}}        - Customer's full name
{{email}}       - Customer's email address
{{phone}}       - Customer's phone number
{{date}}        - Booking date (YYYY-MM-DD)
{{time}}        - Booking time (HH:MM)
{{message}}     - Optional message
```

---

## 1️⃣ ADMIN EMAIL TEMPLATE (template_gtnftin)

### Purpose
Notify the business owner of a new booking

### Template Structure

**Email To:** `{{to_email}}` OR `shubhconstruction@gmail.com`

**Subject:**
```
New Booking Request - {{name}}
```

**Body:**
```
Hello Admin,

You have received a new booking request:

---
CUSTOMER DETAILS:
Name: {{name}}
Email: {{email}}
Phone: {{phone}}

BOOKING DETAILS:
Preferred Date: {{date}}
Preferred Time: {{time}}

MESSAGE:
{{message}}

---

Please respond to: {{reply_to}}
or Email: {{email}}

Best regards,
Shubh Construction
```

### Settings:
- **From Email:** Your EmailJS email
- **From Name:** `Shubh Construction`
- **Reply To:** `{{reply_to}}` (set to customer email)

---

## 2️⃣ USER CONFIRMATION EMAIL TEMPLATE (template_oy5t6us)

### Purpose
Send booking confirmation to the customer

### Template Structure

**Email To:** `{{to_email}}`

**Subject:**
```
Booking Confirmation - Shubh Construction
```

**Body:**
```
Dear {{name}},

Thank you for booking a consultation with Shubh Construction!

We have received your booking request with the following details:

---
BOOKING SUMMARY:
Date: {{date}}
Time: {{time}}

YOUR DETAILS:
Phone: {{phone}}

Additional Notes: {{message}}

---

Our team will contact you shortly to confirm your appointment.

If you have any questions, feel free to reach out to us.

Best regards,
Shubh Construction Team
www.shubhconstruction.com
```

### Settings:
- **From Email:** Your EmailJS email
- **From Name:** `Shubh Construction`

---

## ✅ Validation Checklist

### Before Testing:

- [ ] EmailJS Account created at emailjs.com
- [ ] Service connected (Gmail/SMTP)
- [ ] Two templates created with exact variable names
- [ ] Environment variables updated in `.env.local`
- [ ] Application restarted (NextJS requires restart for env changes)

### Testing Steps:

1. **Test Admin Email:**
   - Fill booking form
   - Submit
   - Check admin email inbox for new booking notification

2. **Test User Email:**
   - Check customer's email inbox for confirmation

3. **Verify Field Population:**
   - Ensure all fields (name, email, phone, date, time, message) appear in emails
   - No empty fields

4. **Error Handling:**
   - Try submitting with invalid data
   - Check for proper error messages
   - Verify form doesn't reset on failure

---

## 🐛 Troubleshooting

### Issue: Empty Fields in Emails

**Cause:** Template variables don't match form data

**Solution:**
- Verify template uses: `{{name}}`, `{{email}}`, `{{phone}}`, `{{date}}`, `{{time}}`, `{{message}}`
- Not: `{{user_name}}`, `{{user_email}}`, etc.

### Issue: "From" Name Not Showing

**Cause:** EmailJS template "From Name" setting is wrong

**Solution:**
- Admin Template: Set "From Name" = `Shubh Construction`
- User Template: Set "From Name" = `Shubh Construction`

### Issue: Emails Go to Spam

**Cause:** Sender reputation or SPF/DKIM not configured

**Solution:**
- Add your domain to EmailJS verified senders
- Configure SPF/DKIM records
- Use a consistent business email

### Issue: "Sending..." Button Stuck

**Cause:** Email send failed silently

**Solution:**
- Check browser console for errors (F12 → Console)
- Verify service ID, template IDs in .env.local
- Restart NextJS (changes to .env require restart)
- Check EmailJS quota limits

---

## 🔒 Security Note

✅ **Good:**
- Using environment variables for credentials
- No hardcoded keys in code
- `NEXT_PUBLIC_` prefix only for keys that are safe to expose

❌ **Don't:**
- Hardcode service IDs or keys
- Commit `.env.local` to git
- Use admin password in frontend

---

## 📝 Code Flow

```
User Submits Form
    ↓
Form Validation
    ↓
setLoading(true)
    ↓
Send Admin Email (template_gtnftin)
    ↓
Send User Email (template_oy5t6us)
    ↓
Show Success Message
    ↓
Reset Form after 3 seconds
    ↓
setLoading(false)
```

---

## 🚀 Production Checklist

- [ ] Update SMTP service with production email
- [ ] Change admin email to production email
- [ ] Test with real email addresses
- [ ] Set up email templates in production service
- [ ] Update .env variables for production
- [ ] Monitor email delivery rates
- [ ] Set up error logging/monitoring
- [ ] Add rate limiting if needed

---

## 📞 Support

For issues with EmailJS:
- Official Docs: https://www.emailjs.com/docs/
- Dashboard: https://dashboard.emailjs.com/

For issues with this integration:
- Check `.env.local` values
- Review browser console errors
- Verify template variable names
