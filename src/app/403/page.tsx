import Link from "next/link";

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-6xl font-bold text-emerald-600 mb-4">403</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Akses Dibatasi</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
                Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Halaman pendaftaran hanya dapat diakses oleh Administrator.
            </p>
            <Link
                href="/"
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
}
