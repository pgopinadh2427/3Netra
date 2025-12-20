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

### Automated Deployment

The application uses GitHub Actions for automated deployment:

#### Frontend (GitHub Pages)
- **URL**: https://www.3netraa.net
- **Trigger**: Push to `master` branch with changes to `frontend/` directory
- **Workflow**: `.github/workflows/deploy.yml` (in frontend directory)

#### Backend Deployment Options

Choose one of the following services:

##### Option 1: Railway (Recommended)
1. Create a [Railway](https://railway.app) account
2. Connect your GitHub repository
3. Set environment variables in Railway dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. The workflow `.github/workflows/backend-deploy.yml` will handle deployment

##### Option 2: Render
1. Create a [Render](https://render.com) account
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure build settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables
6. Copy the **Deploy Hook URL** for the workflow
7. Use workflow `.github/workflows/backend-render.yml`

##### Option 3: Heroku
1. Create a [Heroku](https://heroku.com) account
2. Install Heroku CLI
3. Create a new app: `heroku create your-app-name`
4. Set environment variables: `heroku config:set KEY=VALUE`
5. Enable automatic deploys in Heroku dashboard

### Manual Deployment

#### Backend
```bash
cd backend
npm install
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm run build
npm start
```

### Environment Setup

1. **MongoDB Atlas**:
   - Create a free cluster
   - Get connection string
   - Add your IP address to whitelist

2. **GitHub Secrets**:
   - Go to repository Settings → Secrets and variables → Actions
   - Add required secrets (see `.env.example`)

3. **Domain Configuration**:
   - Frontend is configured for `www.3netraa.net`
   - Update `NEXT_PUBLIC_API_URL` when backend is deployed

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