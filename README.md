# 3Netra - Video Content Management System

A full-stack video content registration and matching system built with Next.js and Node.js.

## 🚀 Features

- **Video Registration**: Register videos with metadata (name, year, language, etc.)
- **Content Matching**: Automatic fingerprint-based video matching
- **Real-time Sync**: Frontend automatically syncs with backend every 5 seconds
- **MongoDB Integration**: Persistent storage with MongoDB Atlas
- **Responsive UI**: Modern React interface with Tailwind CSS
- **API Documentation**: RESTful API with comprehensive endpoints
- **Testing**: Full test coverage with Jest and Supertest
- **Monitoring**: Response time logging and performance monitoring

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 16 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Custom store with optimistic updates
- **Deployment**: GitHub Pages

### Backend (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT-based auth system
- **Testing**: Jest + Supertest + MongoMemoryServer
- **Deployment**: Railway/Render/Heroku

## 📁 Project Structure

```
3netra-monorepo/
├── frontend/           # Next.js application
│   ├── app/           # Next.js app router
│   ├── components/    # Reusable UI components
│   ├── lib/           # Utilities and store
│   └── public/        # Static assets
├── backend/           # Express.js API server
│   ├── controllers/   # Route handlers
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── tests/         # API tests
└── add-test-movies.*  # Test data scripts
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (for production)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pgopinadh2427/3Netra.git
   cd 3Netra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   **Backend (.env)**
   ```env
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   PORT=5000
   NODE_ENV=development
   ```

   **Frontend (.env.local)**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start individually:
   npm run dev --workspace=backend
   npm run dev --workspace=frontend
   ```

5. **Add test data**
   ```bash
   # From backend directory
   node ../add-test-movies.js
   # or
   powershell -ExecutionPolicy Bypass -File ../add-test-movies.ps1
   ```

## 🚀 Deployment

### Frontend (GitHub Pages)
The frontend is automatically deployed to GitHub Pages on push to main branch.

**Domain**: https://www.3netraa.net

### Backend Deployment Options

#### Option 1: Railway (Recommended)
1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

#### Option 2: Render
1. Create a new Web Service
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

#### Option 3: Heroku
1. Create a new app
2. Connect GitHub repository
3. Enable automatic deploys
4. Set environment variables in Heroku dashboard

## 📡 API Endpoints

### Public Routes
- `GET /api/public/registered-videos` - List all registered videos
- `POST /api/public/registered-videos` - Register a new video
- `GET /api/public/registered-videos/:id` - Get specific video
- `POST /api/public/registered-videos/:id/matches` - Add match to video

### Auth Routes (Protected)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## 🧪 Testing

```bash
# Run backend tests
npm run test --workspace=backend

# Run with coverage
npm run test:coverage --workspace=backend
```

## 🔧 Environment Variables

### Backend
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL

## 📊 Monitoring

The application includes response time logging middleware that tracks API performance.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For questions or issues, please open a GitHub issue.