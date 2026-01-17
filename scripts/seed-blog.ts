import { db } from "../src/db";
import { user, posts } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function seedBlog() {
    try {
        console.log("Finding admin user...");
        const [adminUser] = await db.select().from(user).where(eq(user.email, "admin@pkbmmatsil.com"));

        if (!adminUser) {
            console.error("❌ Admin user not found. Please run 'npm run create-admin' first.");
            return;
        }

        console.log("Seeding a complete blog post...");

        await db.insert(posts).values({
            title: "Penerimaan Santri Baru PKBM Ma'had Tahkimussunnah Al-Islamy",
            slug: "penerimaan-santri-baru-2026",
            coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
            excerpt: "Alhamdulillah, pendaftaran santri baru untuk tahun ajaran 2026/2027 telah resmi dibuka. Temukan informasi lengkap mengenai program dan syarat pendaftaran di sini.",
            content: `
# Penerimaan Santri Baru TA 2026/2027

Segala puji bagi Allah Rabb semesta alam. Sholawat dan salam semoga tercurah kepada junjungan kita Nabi Muhammad Shalallahu 'Alaihi Wasallam.

PKBM Ma'had Tahkimussunnah Al-Islamy dengan gembira mengumumkan pembukaan pendaftaran santri baru untuk tahun ajaran 2026/2027. Kami berkomitmen untuk menyelenggarakan pendidikan non-formal yang berkualitas dengan mengintegrasikan nilai-nilai Islam sesuai Al-Qur'an dan As-Sunnah.

## Program Unggulan Kami:

1. **Paket A (Setara SD)** - Fokus pada pembentukan adab dan dasar-dasar ilmu syar'i.
2. **Paket B (Setara SMP)** - Penguatan hafalan Al-Qur'an dan bahasa Arab.
3. **Paket C (Setara SMA)** - Persiapan kemandirian dan bekal menuju pendidikan tinggi.

## Mengapa Memilih Kami?

- **Lingkungan Islami**: Suasana belajar yang mendukung pembentukan karakter Rabbani.
- **Kurikulum Terintegrasi**: Memadukan kurikulum nasional dan kurikulum pesantren.
- **Pengajar Berkompeten**: Dibimbing oleh asatidzah yang ahli di bidangnya.
- **Fasilitas Memadai**: Ruang kelas nyaman, perpustakaan dakwah, dan area olahraga.

## Syarat Pendaftaran:

1. Mengisi formulir pendaftaran.
2. Fotokopi Akta Kelahiran & Kartu Keluarga.
3. Fotokopi Ijazah terakhir (bagi pendaftar Paket B & C).
4. Pas foto berwarna latar belakang merah.

Jangan lewatkan kesempatan berharga ini untuk memberikan pendidikan terbaik bagi putra-putri Anda.

> "Menuntut ilmu adalah kewajiban bagi setiap muslim." (HR. Ibnu Majah)

Untuk informasi lebih lanjut, silakan hubungi sekretariat kami atau kunjungi langsung Ma'had kami.

**Kontak:** 0812-3456-7890
**Alamat:** Jl. Pendidikan No. 123, Indonesia
            `.trim(),
            published: true,
            authorId: adminUser.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        console.log("✅ Blog post seeded successfully!");
    } catch (error) {
        console.error("❌ Error seeding blog post:", error);
    }
}

seedBlog()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
