# Cloudflare D1 Web Application

This is a simple web application that displays data from a Cloudflare D1 database using Cloudflare Pages and Workers.

## Setup

1. Copy `.env.example` to `.env` and fill in your Cloudflare credentials:
   - `TOKEN_ID`: Your Cloudflare API token
   - `ACCOUNT_ID`: Your Cloudflare account ID
   - `DATABASE_ID`: Your D1 database ID

2. Deploy to Cloudflare Pages:
   ```bash
   # Install Wrangler if you haven't already
   npm install -g wrangler

   # Login to Cloudflare
   wrangler login

   # Deploy to Cloudflare Pages
   wrangler pages publish .
   ```

3. Configure Environment Variables:
   - Go to your Cloudflare Pages project settings
   - Add the environment variables from your `.env` file
   - Make sure to bind your D1 database in the "Functions" tab

## Development

- The API endpoint is located in `api/index.js`
- The frontend is in `index.html`
- Modify the SQL query in the API endpoint to match your database schema

## Security Note

Make sure to never commit your actual environment variables to version control. The `.env` file should be listed in your `.gitignore`.