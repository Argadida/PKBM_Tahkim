# 🚀 Quick Deployment Guide - cPanel Node.js

## File Entry Point
**File utama untuk cPanel**: `server.js`

## Quick Start

### 1️⃣ Build Project
```bash
npm run build
```

### 2️⃣ Upload ke cPanel
Upload semua file KECUALI:
- `node_modules/`
- `.next/`
- `.git/`

### 3️⃣ Setup di cPanel
1. Buka **Setup Node.js App**
2. Create Application:
   - **Startup file**: `server.js`
   - **Node version**: 18.x+
   - **Mode**: Production
   - **Port**: 3000

### 4️⃣ Install & Build
```bash
npm install --production
npm run build
```

### 5️⃣ Start Application
Klik tombol **Start** di cPanel Node.js App

## Environment Variables (cPanel)
```
NODE_ENV=production
PORT=3000
DATABASE_URL=./data/sqlite.db
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=https://yourdomain.com
```

## 📚 Dokumentasi Lengkap
- **Panduan Detail**: `DEPLOYMENT_CPANEL.md`
- **Checklist**: `DEPLOYMENT_CHECKLIST.md`

## ⚡ Quick Commands

### Build untuk production
```bash
npm run deploy:build
```

### Test server lokal
```bash
npm run start:prod
```

### Create admin user
```bash
npm run create-admin
```

## 🆘 Troubleshooting

### Aplikasi tidak bisa diakses?
1. Check status di cPanel Node.js App
2. Restart application
3. Check error logs

### Build error?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Database error?
```bash
npx drizzle-kit push
npm run create-admin
```

## 📞 Support
Lihat dokumentasi lengkap di `DEPLOYMENT_CPANEL.md`

---
**Entry File**: `server.js`  
**Port Default**: 3000  
**Node.js**: 18.x atau lebih tinggi
