# 3Netra Deployment Setup Script
# This script helps set up deployment for the 3Netra application

Write-Host "🚀 3Netra Deployment Setup" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan

# Check if we're in the right directory
if (!(Test-Path "package.json") -or !(Test-Path "frontend") -or !(Test-Path "backend")) {
    Write-Host "❌ Error: Please run this script from the root directory of the 3Netra project" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project structure verified" -ForegroundColor Green

# Check if git is initialized and connected to GitHub
try {
    $remoteUrl = git remote get-url origin 2>$null
    if (!$remoteUrl) {
        throw "No remote"
    }
} catch {
    Write-Host "❌ Error: Git repository not connected to GitHub" -ForegroundColor Red
    Write-Host "Please run: git remote add origin https://github.com/YOUR_USERNAME/3Netra.git" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git repository connected to GitHub" -ForegroundColor Green

Write-Host ""
Write-Host "📋 Deployment Checklist:" -ForegroundColor Magenta
Write-Host "========================" -ForegroundColor Magenta
Write-Host ""
Write-Host "1. 🌐 Frontend (GitHub Pages)" -ForegroundColor Blue
Write-Host "   - Domain: https://www.3netraa.net"
Write-Host "   - Workflow: Automatic on push to master"
Write-Host "   - Status: ✅ Ready"
Write-Host ""
Write-Host "2. 🗄️ Database (MongoDB Atlas)" -ForegroundColor Blue
Write-Host "   - Create free cluster at https://cloud.mongodb.com"
Write-Host "   - Get connection string"
Write-Host "   - Add your IP to network access"
Write-Host ""
Write-Host "3. 🚀 Backend Deployment (Choose one):" -ForegroundColor Blue
Write-Host ""
Write-Host "   Option A: Railway (Recommended)" -ForegroundColor Green
Write-Host "   - Sign up: https://railway.app"
Write-Host "   - Connect GitHub repo"
Write-Host "   - Add environment variables:"
Write-Host "     * MONGODB_URI"
Write-Host "     * JWT_SECRET"
Write-Host "     * NODE_ENV=production"
Write-Host "   - Workflow: .github/workflows/backend-deploy.yml"
Write-Host ""
Write-Host "   Option B: Render" -ForegroundColor Green
Write-Host "   - Sign up: https://render.com"
Write-Host "   - Create Web Service"
Write-Host "   - Connect GitHub repo"
Write-Host "   - Build Command: npm install"
Write-Host "   - Start Command: npm start"
Write-Host "   - Add environment variables"
Write-Host "   - Copy Deploy Hook URL"
Write-Host "   - Workflow: .github/workflows/backend-render.yml"
Write-Host ""
Write-Host "4. 🔑 GitHub Secrets Setup" -ForegroundColor Blue
Write-Host "   Go to: https://github.com/YOUR_REPO/settings/secrets/actions"
Write-Host "   Add these secrets based on your chosen backend service"
Write-Host ""
Write-Host "5. 🌍 Update Frontend API URL" -ForegroundColor Blue
Write-Host "   After backend deployment, update NEXT_PUBLIC_API_URL in:"
Write-Host "   - GitHub Secrets (for production builds)"
Write-Host "   - frontend/.env.local (for local development)"
Write-Host ""
Write-Host "📚 Additional Resources:" -ForegroundColor Magenta
Write-Host "========================" -ForegroundColor Magenta
Write-Host "• MongoDB Atlas Setup: https://docs.mongodb.com/atlas/getting-started/"
Write-Host "• Railway Docs: https://docs.railway.app/"
Write-Host "• Render Docs: https://docs.render.com/"
Write-Host "• GitHub Actions: https://docs.github.com/en/actions"
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "==============" -ForegroundColor Yellow
Write-Host "1. Set up MongoDB Atlas database"
Write-Host "2. Choose and set up backend deployment service"
Write-Host "3. Add GitHub Secrets"
Write-Host "4. Push changes to trigger deployment"
Write-Host "5. Update frontend API URL after backend is deployed"
Write-Host ""
Write-Host "Happy deploying! 🎉" -ForegroundColor Green