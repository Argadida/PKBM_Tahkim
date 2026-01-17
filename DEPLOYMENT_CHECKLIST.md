# Checklist Deployment ke cPanel

## Persiapan Sebelum Upload

- [ ] Build project lokal berhasil (`npm run build`)
- [ ] Test aplikasi di lokal (`npm run dev`)
- [ ] Semua fitur berfungsi dengan baik
- [ ] Database sudah siap (sqlite.db)
- [ ] Environment variables sudah disiapkan

## File yang Harus Di-upload

### File Utama
- [ ] `server.js` - Entry point untuk Node.js
- [ ] `.htaccess` - Apache configuration
- [ ] `package.json` - Dependencies list
- [ ] `package-lock.json` - Lock file
- [ ] `next.config.ts` - Next.js configuration
- [ ] `tsconfig.json` - TypeScript configuration
- [ ] `tailwind.config.js` - Tailwind configuration
- [ ] `postcss.config.mjs` - PostCSS configuration

### Folder
- [ ] `src/` - Source code
- [ ] `public/` - Static assets
- [ ] `drizzle/` - Database migrations
- [ ] `scripts/` - Utility scripts

### Configuration Files
- [ ] `.env.production` - Environment variables (rename ke `.env` di server)
- [ ] `ecosystem.config.json` - PM2 configuration (optional)

## Setup di cPanel

### 1. Upload Files
- [ ] Login ke cPanel
- [ ] Buka File Manager
- [ ] Upload semua file ke folder yang ditentukan
- [ ] Extract jika upload dalam bentuk zip

### 2. Setup Node.js Application
- [ ] Buka "Setup Node.js App" di cPanel
- [ ] Create new application
- [ ] Set Node.js version (18.x atau lebih tinggi)
- [ ] Set Application root path
- [ ] Set Application startup file: `server.js`
- [ ] Set Application mode: Production

### 3. Environment Variables
Tambahkan di cPanel Node.js App Settings:
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000` (atau port yang diberikan cPanel)
- [ ] `DATABASE_URL=./data/sqlite.db`
- [ ] `BETTER_AUTH_SECRET=<random-string>`
- [ ] `BETTER_AUTH_URL=https://yourdomain.com`

### 4. Install Dependencies
- [ ] Klik "Run NPM Install" di cPanel
- [ ] Atau via SSH: `npm install --production`
- [ ] Tunggu hingga selesai

### 5. Build Application
Via SSH atau Terminal di cPanel:
```bash
cd ~/public_html/your-folder
npm run build
```
- [ ] Build berhasil tanpa error

### 6. Database Setup
- [ ] Upload file `sqlite.db` atau
- [ ] Buat database baru dengan migration:
  ```bash
  npx drizzle-kit push
  npm run create-admin
  ```
- [ ] Verify database connection

### 7. File Permissions
Via SSH:
```bash
chmod -R 755 ~/public_html/your-folder
chmod 644 .env
chmod 644 sqlite.db
```
- [ ] Permissions sudah benar

### 8. Start Application
- [ ] Klik "Start" atau "Restart" di cPanel Node.js App
- [ ] Check status: Running
- [ ] Check logs untuk error

## Verifikasi

### Testing
- [ ] Buka domain di browser
- [ ] Homepage loading dengan benar
- [ ] Navigation berfungsi
- [ ] Static assets (images, css) loading
- [ ] Login admin berfungsi
- [ ] CRUD operations berfungsi
- [ ] Contact form berfungsi

### Performance
- [ ] Page load time < 3 detik
- [ ] Images teroptimasi
- [ ] CSS/JS ter-minify

### Security
- [ ] HTTPS aktif (SSL certificate)
- [ ] .env file tidak bisa diakses public
- [ ] Admin panel hanya bisa diakses dengan login
- [ ] CORS configured dengan benar

## Troubleshooting

### Jika aplikasi tidak bisa diakses:
- [ ] Check Node.js app status di cPanel
- [ ] Check error logs
- [ ] Verify .htaccess configuration
- [ ] Check port configuration
- [ ] Restart Node.js application

### Jika build error:
- [ ] Check Node.js version
- [ ] Clear cache: `rm -rf .next`
- [ ] Reinstall dependencies: `rm -rf node_modules && npm install`
- [ ] Check TypeScript errors

### Jika database error:
- [ ] Verify DATABASE_URL
- [ ] Check file permissions
- [ ] Run migrations: `npx drizzle-kit push`
- [ ] Check database file exists

## Post-Deployment

### Monitoring
- [ ] Setup monitoring untuk uptime
- [ ] Check logs secara berkala
- [ ] Monitor resource usage (CPU, RAM)

### Backup
- [ ] Backup database: `cp sqlite.db sqlite.db.backup`
- [ ] Backup .env file
- [ ] Backup uploaded files

### Maintenance
- [ ] Update dependencies secara berkala
- [ ] Monitor security updates
- [ ] Check application logs

## Contact Support

Jika mengalami masalah:
1. Check dokumentasi: `DEPLOYMENT_CPANEL.md`
2. Check error logs di cPanel
3. Contact hosting support
4. Check Next.js documentation

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Domain**: _______________
**Server Path**: _______________
**Node.js Version**: _______________
