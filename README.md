# AI Resume & Interview Assistant

A production-ready web application that combines AI-powered resume analysis with an intelligent interview practice system. Built with React, Node.js, Express, MongoDB, and Google Gemini AI.

## ✨ Features

### Resume Analyzer
- Upload PDF resumes via drag & drop
- AI extracts and analyzes resume content
- Get a score out of 100 with detailed feedback
- View strengths, weaknesses, and improvement suggestions

### AI Interview Practice
- Choose from popular job roles or enter a custom one
- AI generates 15 questions (5 Easy, 5 Medium, 5 Hard)
- Answer one question at a time in a chat-like UI
- Get instant AI evaluation with score, feedback, and better answer suggestions

### Additional Features
- 🔐 User authentication (signup/login)
- 🌙 Dark mode toggle
- 📊 History of past analyses and interview attempts
- 📱 Fully responsive design
- ✨ Modern SaaS-inspired UI with glassmorphism

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| AI | Google Gemini Flash API |
| Auth | JWT + bcrypt |

## 📁 Folder Structure

```
Ai_Project/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── context/     # React context (auth, theme)
│   │   ├── services/    # API service layer
│   │   └── index.css    # Global styles
│   └── ...
├── server/              # Express backend
│   ├── controllers/     # Route handlers
│   ├── models/          # Mongoose models
│   ├── middleware/       # Auth & upload middleware
│   ├── routes/          # API routes
│   ├── services/        # Gemini AI service
│   └── server.js        # Entry point
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key

### 1. Clone and configure

```bash
# Navigate to the project
cd Ai_Project

# Set up server environment
cp server/.env.example server/.env
# Edit server/.env with your credentials
```

### 2. Configure environment variables

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-connection-string
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-jwt-secret
```

### 3. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Start the application

```bash
# Terminal 1: Start the server
cd server
npm run dev

# Terminal 2: Start the client
cd client
npm run dev
```

### 5. Open the app

Visit `http://localhost:5173` in your browser.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/profile` | Get user profile |
| POST | `/api/resume/upload` | Upload and parse PDF |
| POST | `/api/resume/analyze` | Analyze resume with AI |
| POST | `/api/interview/generate-questions` | Generate interview questions |
| POST | `/api/interview/evaluate-answer` | Evaluate user's answer |
| GET | `/api/history/resumes` | Get resume analysis history |
| GET | `/api/history/interviews` | Get interview attempt history |

## 🎨 UI Design

- Inspired by Notion and Linear
- Minimal, premium aesthetic
- Glassmorphism accents
- Smooth animations and transitions
- Custom dark mode
- Inter font family
