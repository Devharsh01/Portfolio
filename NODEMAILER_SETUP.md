# Nodemailer Email Setup Guide

This guide will help you set up email functionality using Nodemailer with Gmail SMTP for your portfolio contact form.

## Prerequisites

1. **Gmail Account**: You'll need a Gmail account to send emails
2. **App Password**: Gmail App Password (not your regular password)
3. **Environment Variables**: Properly configured .env.local file

## Step 1: Enable 2-Factor Authentication on Gmail

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. This is required to generate App Passwords

## Step 2: Generate Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/apppasswords)
2. You may be asked to sign in again.
3. Click **Generate** and choose **Mail** as the app
4. Copy the generated 16-character password (it will look like: `abcd efgh ijkl mnop`)

## Step 3: Configure Environment Variables

Create or update your `.env.local` file in the project root:

```env
# Email Configuration for Nodemailer
# Your Gmail address (the account that will send emails)
EMAIL_USER=your-email@gmail.com

# The App Password you generated (remove spaces)
EMAIL_APP_PASSWORD=abcdefghijklmnop

# Email recipient (where emails will be sent to)
# Can be the same as EMAIL_USER or different
RECIPIENT_EMAIL=recipient@example.com

# Optional: Abstract API for email validation
ABSTRACT_API_KEY=your-abstract-api-key
```

## Step 4: How It Works

### Email Flow:
1. **User fills form** with their name, email, subject, and message
2. **Form validates** all required fields
3. **API sends email** to your specified recipient
4. **Email appears to come from** your Gmail account but shows the user's info
5. **Reply-to is set** to the user's email for easy responses

## Step 5: Testing

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Fill out the contact form** with test data
3. **Check your recipient email** for the message
4. **Test reply functionality** by replying to the email

## Step 6: Troubleshooting

### Common Issues:

**"Email service not configured"**
- Check that `EMAIL_USER` and `EMAIL_APP_PASSWORD` are set in `.env.local`
- Make sure there are no extra spaces in the environment variables

**"Authentication failed"**
- Verify your App Password is correct (16 characters, no spaces)
- Ensure 2-Factor Authentication is enabled on your Gmail account

**"Connection refused"**
- Check your internet connection
- Verify Gmail SMTP settings (should be automatic with current config)

**Emails not received**
- Check spam/junk folder
- Verify `RECIPIENT_EMAIL` is set correctly
- Ensure Gmail account is active and accessible

## Step 7: Production Deployment

### For Vercel/Netlify:
1. Add environment variables in your hosting platform's dashboard
2. Use the same variable names as in `.env.local`
3. Never commit `.env.local` to version control

## Features Included

✅ **Full validation** - All fields required
✅ **Professional emails** - Styled HTML with sender info
✅ **Reply functionality** - Direct replies to sender
✅ **Error handling** - Comprehensive error messages
✅ **Security** - Environment-based configuration
✅ **Responsive design** - Mobile-friendly emails
✅ **AI integration** - Tracks AI-generated vs manual emails