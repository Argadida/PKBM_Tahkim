# 🚀 Panduan Migrasi ke Turso (Database Production)

Untuk memastikan aplikasi berjalan lancar di Vercel tanpa kehilangan data, kita telah mengubah driver database ke **Turso (LibSQL)**.

## Langkah 1: Setup Akun Turso
1. Pergi ke [turso.tech](https://turso.tech) dan Sign Up.
2. Install Turso CLI (opsional) atau gunakan Dashboard web.
3. Buat database baru.

## Langkah 2: Dapatkan Credentials
Dari Dashboard Turso, dapatkan dua hal penting:
1. **Database URL**: Biasanya berformat `libsql://nama-db-anda.turso.io`
2. **Auth Token**: Klik "Generate Token"

## Langkah 3: Setup di Vercel
1. Buka Dashboard Vercel project Anda.
2. Masuk ke **Settings** > **Environment Variables**.
3. Tambahkan environment variables berikut:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Masukkan URL dari Langkah 2 (cth: `libsql://...`) |
| `DATABASE_AUTH_TOKEN` | Masukkan Token dari Langkah 2 |
| `BETTER_AUTH_SECRET` | String acak panjang (jika belum ada) |

## ✅ Selesai!
Setelah variable diupdate, redeploy aplikasi Anda di Vercel.
- Aplikasi sekarang menggunakan database Cloud yang stabil.
- Data **tidak akan hilang** saat redeploy.
- Anda bisa menggunakan **Drizzle Studio Local** (`npx drizzle-kit studio`) untuk melihat/edit data Production dengan cara mengisi `.env` lokal Anda dengan credential Turso tadi (Hati-hati, ini akan mengubah data live!).

## ⚠️ Mode Development Lokal
Secara default, di komputer lokal (Localhost), aplikasi akan tetap menggunakan file `data/sqlite.db` agar Anda bisa development dengan cepat tanpa internet.

Jika Anda ingin connect ke Turso dari local:
1. Edit `.env`
2. Isi `DATABASE_URL` dengan `libsql://...`
3. Isi `DATABASE_AUTH_TOKEN` dengan token Anda.
