# Notes Taking App

A full-stack notes taking application built with Next.js, TypeScript, MongoDB, and NextAuth.js for authentication.

## Features

- 📝 Create, read, update, and delete notes
- 🔐 User authentication with Google OAuth and email/password
- 💾 MongoDB database integration
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure API routes with authentication
- 📱 Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Environment Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd notes-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
# MongoDB Connection String (local or Atlas)
MONGO_URI=mongodb://localhost:27017/myapp
# or
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# NextAuth Configuration
NEXTAUTH_SECRET=<your-secret-key>  # Generate a random string
NEXTAUTH_URL=http://localhost:3000  # For local development

# Google OAuth Credentials (Optional - for Google Sign-in)
AUTH_GOOGLE_ID=<your-google-client-id>
AUTH_GOOGLE_SECRET=<your-google-client-secret>
```

4. For Google Authentication (Optional):
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing project
   - Enable Google+ API
   - Go to Credentials > Create Credentials > OAuth Client ID
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy the Client ID and Client Secret to your `.env.local` file

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
notes-app/
├── src/
│   ├── app/              # Next.js 13 app directory
│   │   ├── api/         # API routes
│   │   ├── auth/        # Authentication pages
│   │   └── page.tsx     # Home page
│   ├── components/      # Reusable components
│   ├── model/          # MongoDB models
│   └── helpers/        # Utility functions
├── public/             # Static files
└── .env.local         # Environment variables
```

## Deployment

1. Create a Vercel account if you haven't already
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory
4. Set up the following environment variables in Vercel:
   - `MONGO_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
   - `AUTH_GOOGLE_ID` (if using Google auth)
   - `AUTH_GOOGLE_SECRET` (if using Google auth)
5. Deploy: `vercel --prod`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details
