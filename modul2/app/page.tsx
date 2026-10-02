import Link from "next/link";

const fitur = [
  {
    judul: "Fitur pertama",
    deskripsi: "Manfaat fitur bagi pengguna.",
  },
  {
    judul: "Fitur kedua",
    deskripsi: "Manfaat fitur bagi pengguna.",
  },
  {
    judul: "Fitur ketiga",
    deskripsi: "Manfaat fitur bagi pengguna.",
  },
];

const kolom =
  "rounded border px-3 py-2 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-blue-700";

export default function Beranda() {
  return (
    <>
      {/* Tautan untuk melewati navigasi */}
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:p-2"
      >
        Lewati ke konten utama
      </a>

      {/* Header dan Navigasi */}
      <header className="border-b">
        <nav
          aria-label="Navigasi utama"
          className="mx-auto flex max-w-6xl flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <Link
            href="/"
            className="text-lg font-bold"
          >
            NamaProduk
          </Link>

          <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <li>
              <a href="#fitur">Fitur</a>
            </li>

            <li>
              <a href="#kontak">Kontak</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Konten utama */}
      <main
        id="konten"
        className="mx-auto max-w-6xl p-4"
      >
        {/* Bagian utama */}
        <section aria-labelledby="judul-utama">
          <h1
            id="judul-utama"
            className="text-3xl font-bold"
          >
            Kalimat nilai utama produk
          </h1>

          <p className="mt-3 text-gray-700">
            Penjelasan singkat permasalahan dan solusi produk.
          </p>
        </section>

        {/* Fitur */}
        <section
          id="fitur"
          aria-labelledby="judul-fitur"
          className="py-10"
        >
          <h2
            id="judul-fitur"
            className="text-2xl font-bold"
          >
            Fitur Utama
          </h2>

          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fitur.map((f) => (
              <li key={f.judul}>
                <article className="h-full rounded-lg border p-6">
                  <h3 className="text-lg font-semibold">
                    {f.judul}
                  </h3>

                  <p className="mt-2 text-gray-700">
                    {f.deskripsi}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* Cara Kerja dan Informasi Tambahan */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <section aria-labelledby="judul-cara">
            <h2
              id="judul-cara"
              className="text-2xl font-bold"
            >
              Cara Kerja
            </h2>

            <p className="mt-4 text-gray-700">
              Jelaskan cara kerja produk Anda secara singkat
              pada bagian ini.
            </p>
          </section>

          <aside
            aria-label="Informasi tambahan"
            className="rounded-lg bg-gray-100 p-6"
          >
            <h2 className="text-xl font-bold">
              Informasi Tambahan
            </h2>

            <p className="mt-2 text-gray-700">
              Informasi tambahan mengenai produk.
            </p>
          </aside>
        </div>

        {/* Formulir Kontak */}
        <section
          id="kontak"
          aria-labelledby="judul-kontak"
          className="py-10"
        >
          <h2
            id="judul-kontak"
            className="text-2xl font-bold"
          >
            Hubungi Kami
          </h2>

          <form className="mt-4 grid max-w-xl gap-4">
            {/* Nama */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="nama"
                className="font-medium"
              >
                Nama lengkap
              </label>

              <input
                id="nama"
                name="nama"
                type="text"
                required
                autoComplete="name"
                className={kolom}
              />
            </div>

            {/* Surel */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-medium"
              >
                Surel
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                aria-describedby="email-bantuan"
                className={kolom}
              />

              <p
                id="email-bantuan"
                className="text-sm text-gray-600"
              >
                Gunakan alamat surel yang aktif.
              </p>
            </div>

            {/* Peran */}
            <fieldset className="flex flex-col gap-1">
              <legend className="font-medium">
                Peran
              </legend>

              <label>
                <input
                  type="radio"
                  name="peran"
                  value="pengguna"
                />{" "}
                Pengguna
              </label>

              <label>
                <input
                  type="radio"
                  name="peran"
                  value="mitra"
                />{" "}
                Mitra
              </label>
            </fieldset>

            {/* Pesan */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="pesan"
                className="font-medium"
              >
                Pesan
              </label>

              <textarea
                id="pesan"
                name="pesan"
                rows={4}
                className={kolom}
              />
            </div>

            {/* Tombol */}
            <button
              type="submit"
              className={
                kolom +
                " bg-blue-700 font-semibold text-white"
              }
            >
              Kirim
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl p-4">
          <p>
            © 2026 Nama Produk
          </p>
        </div>
      </footer>
    </>
  );
}