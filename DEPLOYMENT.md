# GitHub Pages Deployment Setup

This document provides a quick reference for the GitHub Pages deployment configuration.

## ✅ Files Created/Modified

### 1. GitHub Action Workflow

- **File**: `.github/workflows/deploy.yml`
- **Purpose**: Automatically builds and deploys to GitHub Pages on push to main
- **Triggers**: Push to main branch or manual dispatch

### 2. Vite Configuration

- **File**: `vite.config.ts`
- **Changes**: Added base path configuration for GitHub Pages
- **Purpose**: Ensures assets load correctly when deployed to a subdirectory

### 3. Dependencies

- **Added**: `@types/node` for TypeScript support of `process.env`

## 🚀 Deployment Process

1. **Push to main branch** → Triggers GitHub Action
2. **GitHub Action runs**:
   - Installs dependencies (`npm ci`)
   - Builds project (`npm run build`)
   - Uploads `dist/` folder to GitHub Pages
3. **Site goes live** at `https://[username].github.io/[repo-name]/`

## ⚙️ Configuration Notes

### Base Path

The `base` configuration in `vite.config.ts` is set to `/fluentui-blocks/`.
**Update this if your repository name is different**:

```typescript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

### URL Routing

The app uses hash-based routing (`#analytics`, `#charts`, etc.) which works perfectly with GitHub Pages and allows for shareable direct links.

## 🔧 Manual Deployment

You can also deploy manually:

1. Run `npm run build` locally
2. Go to GitHub Actions tab
3. Click "Deploy to GitHub Pages" workflow
4. Click "Run workflow"

## 📊 Features Included

- **Automatic deployment** on push to main
- **Manual deployment** option
- **Shareable URLs** for each tab/page
- **Optimized builds** with sourcemaps
- **Asset optimization** by Vite
- **TypeScript compilation** before build

## 🌐 Live URLs

After deployment, these URLs will work:

- `https://[username].github.io/[repo-name]/` - Main dashboard
- `https://[username].github.io/[repo-name]/#charts` - Charts dashboard
- `https://[username].github.io/[repo-name]/#analytics` - Analytics dashboard
- `https://[username].github.io/[repo-name]/#checkout` - Checkout page
- And so on for each tab...

## 🛠️ Troubleshooting

### Build Fails

- Check GitHub Actions logs
- Verify all dependencies are in `package.json`
- Ensure TypeScript compiles without errors locally

### Assets Don't Load

- Verify `base` path in `vite.config.ts` matches your repo name
- Check browser console for 404 errors

### Page Not Found

- Ensure GitHub Pages is enabled in repository settings
- Verify source is set to "GitHub Actions"
- Check deployment status in Actions tab
