# Dokumen Teknis Modul 2 — HTML Semantik, Tailwind CSS, dan Aksesibilitas

- **Nama**: Sultan Zulvi Risda
- **NIM**: 105224034
- **Repositori**: https://github.com/sultanzulvi/105224034-PMWeb-Modul2
- **Branch Kerja**: `praktikum/modul-02` (Merged to `main`)

---

## 1. Struktur Semantik

### 1.1 Kerangka Landmark dan Hierarki Judul
Penyusunan dokumen web mengikuti prinsip HTML semantik untuk memberikan arti struktural bagi mesin peramban, mesin pencari, dan teknologi bantu (*screen reader*). Struktur halaman utama memetakan elemen HTML5 ke dalam peran landmark ARIA secara tepat tanpa redundansi peran implisit:

1. **Header (`<header>` $\rightarrow$ Landmark `banner`)**: 
   - Berfungsi sebagai kepala halaman yang memuat identitas merek produk (`<Link href="/">NamaProduk</Link>`) serta wadah navigasi global.
   - Tidak diletakkan di dalam `<article>` atau `<section>` agar perannya valid sebagai `banner`.

2. **Navigasi (`<nav aria-label="Navigasi utama">` $\rightarrow$ Landmark `navigation`)**:
   - Diberi label aksesibel eksplisit (`aria-label`) untuk membedakan navigasi primer dari potensi navigasi tambahan di masa mendatang.
   - Mengelompokkan tautan menu internal (`#fitur`, `#kontak`) menggunakan struktur semantik daftar tak berurut (`<ul>` dan `<li>`).

3. **Konten Utama (`<main id="konten">` $\rightarrow$ Landmark `main`)**:
   - Menjadi wadah tunggal untuk konten esensial halaman dan menjadi target perpindahan fokus dari tautan pintas (*skip link*).
   - Memiliki hierarki heading linier yang runtut:
     - `<h1>` (Kalimat nilai utama produk): Judul tunggal tingkat tertinggi pada halaman.
     - `<h2>` (Fitur Utama): Mengidentifikasi bagian etalase fitur produk.
     - `<h3>` (Fitur pertama, kedua, ketiga): Judul komponen kartu di dalam elemen `<article>`.
     - `<h2>` (Cara Kerja): Mengidentifikasi alur kerja produk.
     - `<h2>` (Hubungi Kami): Mengidentifikasi bagian formulir interaksi pengguna.

4. **Konten Tematik (`<section aria-labelledby="...">` $\rightarrow$ Landmark `region`)**:
   - Setiap elemen `<section>` dipetakan menjadi peran landmark `region` dengan merujuk pada `id` judulnya menggunakan atribut `aria-labelledby` (misal: `aria-labelledby="judul-fitur"`), sehingga pembaca layar dapat membacakan nama area tersebut saat berpindah navigasi.

5. **Konten Pelengkap (`<aside aria-label="Informasi tambahan">` $\rightarrow$ Landmark `complementary`)**:
   - Ditempatkan berdampingan dengan alur "Cara Kerja" untuk menyajikan informasi sekunder atau catatan kontekstual.

6. **Kaki Halaman (`<footer>` $\rightarrow$ Landmark `contentinfo`)**:
   - Memuat informasi kepemilikan hak cipta situs secara mandiri di bagian paling bawah dokumen.

7. **Aksesibilitas Awal (*Skip Link*)**:
   - Disematkan elemen `<a href="#konten" className="sr-only focus:not-sr-only focus:p-2">Lewati ke konten utama</a>` di awal dokumen sebelum `<header>`. Elemen tersembunyi secara visual bagi pengguna umum, tetapi langsung terlihat saat menerima fokus navigasi papan ketik (Tab).

### 1.2 Verifikasi Pohon Aksesibilitas (*Accessibility Tree*)
Verifikasi melalui Chrome DevTools (Elements > tab Accessibility > *Enable full-page accessibility tree*) memastikan seluruh landmark terbaca:
- Landmark `banner` membungkus logo dan navigasi.
- Landmark `navigation` terdaftar dengan nama *"Navigasi utama"*.
- Landmark `main` membungkus seluruh isi artikel dan formulir.
- Setiap landmark `region` teridentifikasi dengan nama judulnya masing-masing.
- Landmark `contentinfo` berada di akhir struktur pohon.

---

## 2. Tata Letak Responsif

### 2.1 Penerapan Pendekatan *Mobile-First*
Tata letak dibangun menggunakan prinsip *mobile-first* pada Tailwind CSS versi 4, di mana gaya bawaan (tanpa awalan) dioptimalkan untuk tampilan layar terkecil (ponsel), kemudian diperluas bertahap menggunakan awalan breakpoint (`sm:`, `lg:`):

1. **Penataan Ruang Konten Terpusat**:
   - Menggunakan kelas `mx-auto max-w-6xl p-4` pada pembungkus `<nav>` dan `<main>` agar konten berorientasi di tengah dan tidak membentang secara ekstrem pada monitor ultra-lebar.

2. **Navigasi Adaptif (Flexbox)**:
   - *Kelas*: `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`
   - *Alasan*: Pada layar sempit (< 640 px), navigasi disusun vertikal bertumpuk (`flex-col`) agar mudah disentuh. Mulai breakpoint `sm` (640 px ke atas), tata letak berubah mendatar satu dimensi (`sm:flex-row`) dengan pemisahan proporsional (`justify-between`).

3. **Etalase Kartu Fitur (CSS Grid)**:
   - *Kelas*: `grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`
   - *Alasan*: Menata komponen dua dimensi secara konsisten. Tampilan ponsel (< 640 px) memakai 1 kolom untuk menjaga keterbacaan, tablet (640 px – 1023 px) beradaptasi menjadi 2 kolom, dan desktop ($\ge$ 1024 px) menggunakan 3 kolom berimbang dengan celah seragam `gap-6`.

4. **Bagian Konten dan Informasi Pendukung (CSS Grid Sembarang / *Arbitrary Value*)**:
   - *Kelas*: `grid gap-8 lg:grid-cols-[2fr_1fr]`
   - *Alasan*: Pada tampilan ponsel dan tablet, `<section>` dan `<aside>` bertumpuk satu kolom secara alami. Pada breakpoint `lg` ($\ge$ 1024 px), grid membagi area dua dimensi menjadi proporsi kolom 2 banding 1 (`2fr 1fr`), memberikan ruang lebih luas bagi alur konten utama.

### 2.2 Bukti Pengujian Tata Letak Tiga Ukuran Layar

#### Tampilan Layar Ponsel (Lebar 360 px)
- **Karakteristik**: Tata letak satu kolom penuh (`grid-cols-1`), navigasi bertumpuk vertikal, tidak terdapat pergeseran horizontal (*horizontal scrollbar*), dan ukuran teks proporsional.
- **Tangkapan Layar**:
  ![alt text](<Screenshot 2026-10-02 154148.png>)

#### Tampilan Layar Tablet (Lebar 768 px)
- **Karakteristik**: Menu navigasi mendatar sejajar merek (`sm:flex-row`), grid kartu fitur otomatis beradaptasi menjadi 2 kolom (`sm:grid-cols-2`), kartu ketiga berada di baris baru.
- **Tangkapan Layar**:
  ![alt text](<Screenshot 2026-10-02 154200.png>)

#### Tampilan Layar Desktop (Lebar 1280 px)
- **Karakteristik**: Kartu fitur tersusun 3 kolom horizontal berimbang (`lg:grid-cols-3`), bagian "Cara Kerja" dan `<aside>` bersanding dua kolom (`lg:grid-cols-[2fr_1fr]`).
- **Tangkapan Layar**:
  ![alt text](<Screenshot 2026-10-02 154352.png>)

---

## 3. Audit Aksesibilitas

### 3.1 Tabel Perbandingan Skor Lighthouse
Pengujian dilakukan menggunakan Google Chrome DevTools Lighthouse (Mode: Navigation, Kategori: Accessibility, Emulasi: Mobile):

| Halaman Pengujian | Skor Awal | Skor Akhir (Target) | Status Kelulusan Sub-CPMK |
| :--- | :---: | :---: | :---: |
| Halaman Latihan (`/latihan-audit`) | **79** | **95+** | Memenuhi syarat (Minimal 90) |
| Halaman Utama Produk (`/`) | **96** | **100** | Memenuhi syarat (Minimal 85) |

### 3.2 Analisis Temuan Audit dan Solusi Perbaikan

#### Kasus A: Temuan pada Halaman Latihan Audit (`/latihan-audit` — Skor 79)
Berdasarkan log Lighthouse audit, ditemukan 4 pelanggaran WCAG 2.2:
![alt text](<Screenshot 2026-10-02 160242.png>)

1. **Buttons do not have an accessible name**
   - *Penyebab*: Tombol pencarian hanya membungkus ikon SVG tanpa teks atau label yang terbaca pembaca layar.
   - *Perbaikan*: Menambahkan atribut `aria-label="Cari"` pada `<button>` dan menyematkan `aria-hidden="true"` pada elemen `<svg>` agar ikon visual diabaikan oleh teknologi bantu.

2. **Image elements do not have [alt] attributes**
   - *Penyebab*: Elemen `<img src="/next.svg" />` tidak memiliki atribut teks alternatif.
   - *Perbaikan*: Menambahkan atribut `alt="Logo Next.js"` (atau `alt=""` bila gambar bersifat murni dekoratif).

3. **Form elements do not have associated labels**
   - *Penyebab*: Elemen `<input type="search" />` berdiri sendiri tanpa pasangan elemen `<label>` yang terhubung secara terprogram.
   - *Perbaikan*: Menambahkan `<label htmlFor="cari-alat" className="sr-only">Cari Alat Laboratorium</label>` serta menyematkan `id="cari-alat"` pada `<input>`.

4. **Background and foreground colors do not have a sufficient contrast ratio**
   - *Penyebab*: Teks keterangan menggunakan warna kontras rendah `text-gray-300` di atas latar terang, melanggar batas rasio kontras WCAG 4.5:1.
   - *Perbaikan*: Mengganti kelas menjadi `text-gray-700` atau `text-gray-800` untuk mencapai rasio kontras minimal 7:1.

#### Kasus B: Temuan pada Halaman Utama Produk (`/` — Skor 96)
Berdasarkan laporan audit Chrome DevTools:
![alt text](<Screenshot 2026-10-08 192610.png>)
- **Pelanggaran Terdeteksi**: *Background and foreground colors do not have a sufficient contrast ratio* pada elemen teks sekunder (antara lain `p.mt-2.text-gray-700` dan teks bantuan formulir `p#email-bantuan.text-sm.text-gray-600` saat diuji pada latar tema gelap, serta teks judul pada `<aside>` abu-abu terang).
- *Penyebab Teknis*: Warna teks turunan abu-abu (`text-gray-700` / `text-gray-600`) berada di bawah rasio 4.5:1 terhadap warna latar belakang hitam (`#000000` / `#0b0b0b`).
- *Perbaikan*:
  - Mengubah teks deskripsi kartu dan teks bantuan menjadi `text-gray-200` atau `text-gray-300` agar terbaca tajam di atas latar hitam.
  - Memastikan kontras warna teks di dalam kartu `<aside>` (`bg-gray-100`) tetap menggunakan teks gelap pekat (`text-gray-900`) sehingga rasio kontras mencapai standar WCAG AAA (> 7:1).

### 3.3 Formulir yang Aksesibel dan Pengujian Papan Ketik Manual
Struktur formulir kontak pada `<section id="kontak">` dirancang dengan kendali aksesibilitas penuh:
1. **Penyambungan Label Terprogram**: Setiap elemen isian (`<input>`, `<textarea>`) memiliki atribut `id` unik yang dipasangkan tepat dengan `htmlFor` pada `<label>`.
2. **Keterangan Tambahan (`aria-describedby`)**: Masukan surel dipasangkan dengan deskripsi bantuan menggunakan `aria-describedby="email-bantuan"`, sehingga pembaca layar langsung membacakan panduan pengisian saat input difokuskan.
3. **Pengelompokan Opsi Radio**: Pilihan peran dibungkus dalam tag semantik `<fieldset>` dengan judul kelompok `<legend className="font-medium">Peran</legend>`.
4. **Indikator Fokus Visual**: Menerapkan kelas `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500` pada seluruh kontrol interaktif untuk memastikan penanda fokus terlihat tebal dan jelas.

#### Hasil Pemeriksaan Manual Navigasi Papan Ketik:
- **Urutan Fokus (Tab Order)**: Fokus berpindah secara teratur dan linier dari *Skip Link* $\rightarrow$ Logo $\rightarrow$ Menu Navigasi $\rightarrow$ Input Nama $\rightarrow$ Input Surel $\rightarrow$ Radio Opsi $\rightarrow$ Textarea Pesan $\rightarrow$ Tombol Kirim.
- **Operabilitas Non-Mouse**: Tombol Tab dan Shift+Tab berfungsi memindahkan fokus maju/mundur, tombol Panah/Spasi berfungsi memilih radio button, dan tombol Enter berhasil memicu tombol aksi pengiriman.
- **Visibilitas Cincin Fokus**: Cincin fokus (*outline*) selalu tampil dengan jelas pada elemen aktif tanpa pernah terpotong oleh overflow kontainer.

---

## 4. Kendala dan Penyelesaian

1. **Kendala Kontras Warna Tema Gelap**:
   - *Masalah*: Standar warna default modul menggunakan teks gelap (`text-gray-700`), namun latar belakang aplikasi menggunakan tema hitam/gelap, menyebabkan Lighthouse menandai kegagalan kontras teks (*contrast ratio failure*).
   - *Penyelesaian*: Menyelaraskan kelas warna teks menjadi terang (`text-gray-200`) untuk kontainer berlatar gelap dan memberi kontras inversi yang tegas pada kontainer berlatar terang (`<aside>`).

2. **Peringatan Pengecualian Data Lighthouse**:
   - *Masalah*: Muncul pesan peringatan audit *"There may be stored data affecting loading performance in this location: IndexedDB"*.
   - *Penyelesaian*: Audit dijalankan ulang pada jendela penyamaran (*Incognito Window*) dengan ekstensi dinonaktifkan untuk memastikan skor mencerminkan kondisi murni halaman tanpa gangguan *cache* atau ekstensi pihak ketiga.

---

## 5. Catatan Pemanfaatan AI

Sesuai ketentuan integritas akademik praktikum, berikut rincian pencatatan pemanfaatan asisten kecerdasan artifisial (AI):

- **Platform AI**: Google Gemini.
- **Tujuan Pemanfaatan**: Menata kerangka dokumen teknis Modul 2, merumuskan alasan keputusan teknis pemilihan Flexbox/Grid, mengonversi log kegagalan audit Lighthouse ke langkah perbaikan WCAG, serta menyusun dokumentasi pengujian responsif.
- **Perintah (*Prompt*) Utama**:
  - *"saya ingin membuat dokumen teknis sesuai dengan arahan modul (Penjelasan HTML, Semantik, dan Landmark., Penjelasan tata letak., Desain responsif., Aksesibilitas Web dan Audit lighthouse), gambar2 diatas adalah untuk mengisi halaman dokumennya disertakan dengan penjelasannya..."*
- **Bagian yang Dibantu AI**:
  1. Perumusan sintesis pemetaan landmark ARIA terhadap elemen HTML5.
  2. Penjelasan logis komparasi Flexbox satu dimensi vs CSS Grid dua dimensi dengan *arbitrary value*.
  3. Konseptualisasi perbaikan rasio kontras pada laporan audit Lighthouse (skor 79 dan 96).
  4. Penyusunan format laporan ke dalam Markdown standar Bagian H Modul 2.
- **Metode Verifikasi Independen**:
  1. Menguji langsung struktur pohon aksesibilitas melalui Chrome DevTools Elements.
  2. Menjalankan audit Lighthouse secara mandiri di browser lokal hingga mencapai skor $\ge 85$.
  3. Memvalidasi navigasi visual pada Device Toolbar pada resolusi 360 px, 768 px, dan 1280 px secara fisik tanpa bantuan AI.