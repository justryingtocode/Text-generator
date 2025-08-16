# Deployment Guide

This guide will help you deploy your Spiritual Message Generator to various platforms.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy"

### 2. Netlify
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy site"

### 3. GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Source: Deploy from a branch
4. Branch: `main` (or your default branch)
5. Folder: `/ (root)`
6. Add this GitHub Action workflow:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm install
    - run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🔧 Manual Deployment

### Build Locally
```bash
npm install
npm run build
```

The built files will be in the `dist` folder.

### Upload to Any Static Hosting
- Upload the contents of the `dist` folder to your web server
- Ensure your server is configured for Single Page Applications (SPA)
- All routes should redirect to `index.html`

## 🌐 Server Configuration

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Express.js (Node.js)
```javascript
app.use(express.static('dist'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
```

## 🔒 Environment Variables

For production, you may want to set these environment variables:

- `NODE_ENV=production`
- Any API keys for external services

## 📱 PWA Support

The app is ready for PWA deployment. To enable:

1. Add a web manifest
2. Configure service workers
3. Add offline support

## 🚨 Troubleshooting

### Build Errors
- Ensure Node.js version 16+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run type-check`

### Runtime Errors
- Check browser console for errors
- Ensure all dependencies are properly installed
- Verify API endpoints are accessible

### Deployment Issues
- Check build logs for errors
- Ensure all files are included in the build
- Verify server configuration for SPA routing

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review the build logs
3. Ensure all dependencies are compatible
4. Test locally before deploying
