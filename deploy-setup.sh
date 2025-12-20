#!/bin/bash

# 3Netra Deployment Setup Script
# This script helps set up deployment for the 3Netra application

echo "🚀 3Netra Deployment Setup"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the root directory of the 3Netra project"
    exit 1
fi

echo "✅ Project structure verified"

# Check if git is initialized and connected to GitHub
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "❌ Error: Git repository not connected to GitHub"
    echo "Please run: git remote add origin https://github.com/YOUR_USERNAME/3Netra.git"
    exit 1
fi

echo "✅ Git repository connected to GitHub"

echo ""
echo "📋 Deployment Checklist:"
echo "========================"
echo ""
echo "1. 🌐 Frontend (GitHub Pages)"
echo "   - Domain: https://www.3netraa.net"
echo "   - Workflow: Automatic on push to master"
echo "   - Status: ✅ Ready"
echo ""
echo "2. 🗄️ Database (MongoDB Atlas)"
echo "   - Create free cluster at https://cloud.mongodb.com"
echo "   - Get connection string"
echo "   - Add your IP to network access"
echo ""
echo "3. 🚀 Backend Deployment (Choose one):"
echo ""
echo "   Option A: Railway (Recommended)"
echo "   - Sign up: https://railway.app"
echo "   - Connect GitHub repo"
echo "   - Add environment variables:"
echo "     * MONGODB_URI"
echo "     * JWT_SECRET"
echo "     * NODE_ENV=production"
echo "   - Workflow: .github/workflows/backend-deploy.yml"
echo ""
echo "   Option B: Render"
echo "   - Sign up: https://render.com"
echo "   - Create Web Service"
echo "   - Connect GitHub repo"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "   - Add environment variables"
echo "   - Copy Deploy Hook URL"
echo "   - Workflow: .github/workflows/backend-render.yml"
echo ""
echo "4. 🔑 GitHub Secrets Setup"
echo "   Go to: https://github.com/YOUR_REPO/settings/secrets/actions"
echo "   Add these secrets based on your chosen backend service"
echo ""
echo "5. 🌍 Update Frontend API URL"
echo "   After backend deployment, update NEXT_PUBLIC_API_URL in:"
echo "   - GitHub Secrets (for production builds)"
echo "   - frontend/.env.local (for local development)"
echo ""
echo "📚 Additional Resources:"
echo "========================"
echo "• MongoDB Atlas Setup: https://docs.mongodb.com/atlas/getting-started/"
echo "• Railway Docs: https://docs.railway.app/"
echo "• Render Docs: https://docs.render.com/"
echo "• GitHub Actions: https://docs.github.com/en/actions"
echo ""
echo "🎯 Next Steps:"
echo "=============="
echo "1. Set up MongoDB Atlas database"
echo "2. Choose and set up backend deployment service"
echo "3. Add GitHub secrets"
echo "4. Push changes to trigger deployment"
echo "5. Update frontend API URL after backend is deployed"
echo ""
echo "Happy deploying! 🎉"