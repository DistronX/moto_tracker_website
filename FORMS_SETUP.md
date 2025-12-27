# Form Setup Instructions for GitHub Pages

Since GitHub Pages only serves static files, you need a third-party service to handle form submissions. Here are the best options:

## Option 1: Formspree (Recommended - Easiest)

### Setup Steps:

1. **Create a Formspree account:**
   - Go to https://formspree.io
   - Sign up for a free account (50 submissions/month free)

2. **Create a new form:**
   - Click "New Form"
   - Give it a name like "Throtl Launch Notifications"
   - Copy your form endpoint URL (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

3. **Update the form in `index.html`:**
   - Find the form with `id="notifyForm"`
   - Replace `YOUR_FORM_ID` in the action attribute with your actual Formspree form ID
   - Example: `action="https://formspree.io/f/xpzgkqyz"`

4. **Configure email notifications:**
   - In Formspree dashboard, go to Settings
   - Add your email address to receive notifications
   - Customize the email template if desired

5. **Test it:**
   - Deploy to GitHub Pages
   - Submit a test email
   - Check your email inbox for the notification

### Formspree Features:
- ✅ Free tier: 50 submissions/month
- ✅ Email notifications
- ✅ Spam protection
- ✅ No backend code needed
- ✅ Works perfectly with GitHub Pages

---

## Option 2: EmailJS (Alternative)

If you prefer EmailJS, here's how to set it up:

1. **Sign up at https://www.emailjs.com**
2. **Create an email service** (Gmail, Outlook, etc.)
3. **Create an email template**
4. **Get your Public Key and Service ID**
5. **Update the code:**

Replace the form submission in `script.js` with:

```javascript
// Add EmailJS script to HTML head:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

emailjs.init("YOUR_PUBLIC_KEY");

notifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', notifyForm);
        // Success handling...
    } catch (error) {
        // Error handling...
    }
});
```

---

## Option 3: Netlify Forms (If you switch to Netlify)

If you deploy to Netlify instead of GitHub Pages:

1. Add `netlify` attribute to form: `<form netlify>`
2. That's it! Netlify automatically handles it.
3. View submissions in Netlify dashboard

---

## Option 4: Google Sheets + Google Apps Script

For a free solution that stores data in Google Sheets:

1. Create a Google Sheet
2. Use Google Apps Script to create a web app endpoint
3. Update form action to point to your Apps Script URL

---

## Current Implementation

The form is currently set up for **Formspree**. You just need to:

1. Sign up at formspree.io
2. Create a form
3. Replace `YOUR_FORM_ID` in `index.html` with your actual form ID

The form will automatically:
- ✅ Validate email format
- ✅ Show loading state
- ✅ Show success/error messages
- ✅ Send emails to your configured address

---

## Testing Locally

To test the form locally before deploying:

1. Use the Formspree form ID (it works on localhost too)
2. Or use a service like ngrok to expose localhost
3. Or just test directly on GitHub Pages after deployment

---

## Security Notes

- Formspree includes built-in spam protection
- Consider adding reCAPTCHA for additional protection (optional)
- Never expose API keys in client-side code (Formspree handles this securely)

