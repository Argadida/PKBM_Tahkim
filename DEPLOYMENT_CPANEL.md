# Panduan Deployment Next.js ke cPanel

## Persiapan

### 1. Persyaratan cPanel
- cPanel dengan fitur **Node.js Selector** atau **Setup Node.js App**
- Akses SSH (opsional tapi sangat direkomendasikan)
- Node.js versi 18.x atau lebih tinggi

### 2. Persiapan Project Lokal

Sebelum upload, pastikan project sudah di-build:

```bash
npm run build
```

## Langkah-langkah Deployment

### Metode 1: Menggunakan cPanel Node.js Selector (Recommended)

#### Step 1: Upload Files
1. Login ke cPanel
2. Buka **File Manager**
3. Navigasi ke direktori public_html atau subdomain folder
4. Upload semua file project KECUALI:
   - `node_modules/` (akan di-install di server)
   - `.next/` (akan di-generate ulang)
   - `.git/` (opsional)
   - `sqlite.db` (upload terpisah atau buat baru)

#### Step 2: Setup Node.js Application
1. Di cPanel, cari menu **Setup Node.js App** atau **Node.js Selector**
2. Klik **Create Application**
3. Isi form dengan:
   - **Node.js version**: Pilih versi 18.x atau lebih tinggi
   - **Application mode**: Production
   - **Application root**: Path ke folder project Anda (misal: `public_html/pkbm`)
   - **Application URL**: Domain atau subdomain Anda
   - **Application startup file**: `server.js`
   - **Environment variables**: Tambahkan variabel berikut:
     ```
     NODE_ENV=production
     PORT=3000
     DATABASE_URL=./data/sqlite.db
     ```

4. Klik **Create**

#### Step 3: Install Dependencies
1. Setelah aplikasi dibuat, cPanel akan menampilkan command untuk install dependencies
2. Klik tombol **Run NPM Install** atau jalankan via SSH:
   ```bash
   cd ~/public_html/pkbm  # sesuaikan path
   npm install --production
   ```

#### Step 4: Setup Database
1. Upload file `sqlite.db` atau buat database baru
2. Pastikan file `.env` sudah ada dengan konfigurasi yang benar:
   ```env
   DATABASE_URL=./data/sqlite.db
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=https://yourdomain.com
   ```

#### Step 5: Build Next.js
Jalankan build command via SSH atau cPanel Terminal:
```bash
cd ~/public_html/pkbm  # sesuaikan path
npm run build
```

#### Step 6: Start Application
1. Kembali ke **Setup Node.js App** di cPanel
2. Klik tombol **Start** atau **Restart** pada aplikasi Anda
3. Aplikasi akan berjalan di port yang ditentukan (biasanya 3000)

#### Step 7: Verifikasi
- Buka domain/subdomain Anda di browser
- Pastikan aplikasi berjalan dengan baik

### Metode 2: Menggunakan SSH (Advanced)

#### Step 1: Connect via SSH
```bash
ssh username@yourdomain.com
```

#### Step 2: Clone atau Upload Project
```bash
cd ~/public_html
git clone <repository-url> pkbm
# atau upload via FTP/File Manager
```

#### Step 3: Install Dependencies
```bash
cd pkbm
npm install --production
```

#### Step 4: Setup Environment
```bash
nano .env
# Tambahkan konfigurasi environment
```

#### Step 5: Build Application
```bash
npm run build
```

#### Step 6: Setup Node.js App di cPanel
- Ikuti Step 2 dari Metode 1
- Pastikan path dan startup file sudah benar

#### Step 7: Start Application
```bash
# Via cPanel Node.js Selector atau
node server.js
# atau gunakan PM2 untuk production
npm install -g pm2
pm2 start server.js --name pkbm-app
pm2 save
pm2 startup
```

## Konfigurasi Tambahan

### 1. Custom Port
Jika cPanel assign port khusus, update di `.env`:
```env
PORT=<port-yang-diberikan-cpanel>
```

### 2. Domain/Subdomain Setup
1. Di cPanel, buka **Domains** atau **Subdomains**
2. Arahkan domain/subdomain ke folder aplikasi
3. Pastikan .htaccess sudah di-upload dan dikonfigurasi dengan benar

### 3. SSL Certificate
1. Di cPanel, buka **SSL/TLS**
2. Install SSL certificate (Let's Encrypt gratis)
3. Update `BETTER_AUTH_URL` di `.env` dengan https://

### 4. Database Migration
Jika menggunakan database baru:
```bash
cd ~/public_html/pkbm
npx drizzle-kit push
npm run create-admin  # Buat admin user
```

## Troubleshooting

### Error: "Cannot find module"
```bash
npm install
npm run build
```

### Error: "Port already in use"
- Ubah PORT di environment variables
- Atau stop aplikasi lain yang menggunakan port tersebut

### Error: "Permission denied"
```bash
chmod -R 755 ~/public_html/pkbm
chmod 644 ~/public_html/pkbm/.env
```

### Aplikasi tidak bisa diakses
1. Cek status aplikasi di cPanel Node.js Selector
2. Cek log error di cPanel atau via SSH:
   ```bash
   tail -f ~/public_html/pkbm/logs/error.log
   ```
3. Pastikan .htaccess sudah benar
4. Pastikan port di .htaccess sama dengan PORT di environment

### Database error
1. Pastikan path DATABASE_URL benar
2. Pastikan file sqlite.db memiliki permission yang benar:
   ```bash
   chmod 644 sqlite.db
   ```

## Maintenance

### Update Aplikasi
```bash
cd ~/public_html/pkbm
git pull  # jika menggunakan git
npm install
npm run build
# Restart via cPanel Node.js Selector
```

### Backup Database
```bash
cp sqlite.db sqlite.db.backup-$(date +%Y%m%d)
```

### Monitor Logs
```bash
# Via cPanel atau SSH
tail -f logs/error.log
tail -f logs/access.log
```

## Tips Performa

1. **Gunakan Production Mode**: Pastikan `NODE_ENV=production`
2. **Enable Caching**: .htaccess sudah include cache headers
3. **Compress Assets**: Gzip compression sudah enabled di .htaccess
4. **Use CDN**: Untuk static assets (images, css, js)
5. **Monitor Resources**: Cek penggunaan CPU dan RAM di cPanel

## Keamanan

1. **Protect .env file**:
   ```apache
   # Tambahkan di .htaccess
   <Files .env>
       Order allow,deny
       Deny from all
   </Files>
   ```

2. **Update Dependencies**:
   ```bash
   npm audit
   npm audit fix
   ```

3. **Firewall**: Pastikan hanya port yang diperlukan yang terbuka

## Support

Jika mengalami masalah:
1. Cek dokumentasi cPanel hosting provider Anda
2. Hubungi support hosting untuk bantuan Node.js setup
3. Periksa log error untuk detail masalah

---

**Catatan**: Setiap hosting provider mungkin memiliki interface cPanel yang sedikit berbeda. Sesuaikan langkah-langkah di atas dengan interface yang Anda miliki.
