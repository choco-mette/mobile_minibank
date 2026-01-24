# Role
Bertindaklah sebagai Senior Mobile Frontend Engineer yang ahli dalam Vanilla JavaScript, Vite, Tailwind CSS, dan Capacitor.js.

# Project Overview
Saya sedang membangun aplikasi mobile banking bernama "MiniBank". Backend (Node.js/Express) sudah siap dengan fitur autentikasi (basic auth denan username dan password di http header) dan transaksi. Tugasmu adalah membuat struktur dasar dan boilerplate code untuk sisi Client (Frontend).

# Tech Stack (Strict Constraints)
1.  **Framework:** Vanilla JavaScript (ES6 Modules) - TANPA React, Vue, atau Angular.
2.  **Build Tool:** Vite.
3.  **Styling:** Tailwind CSS (via PostCSS).
4.  **Mobile Runtime:** Capacitor.js (Android).
5.  **Architecture:** Custom SPA (Single Page Application) sederhana menggunakan sistem Router sendiri.

# Fitur & Spesifikasi Frontend
Aplikasi klien harus memiliki halaman-halaman berikut yang terhubung ke API Backend:

1.  **Auth System:**
    * **Halaman Login:** Input username & password. Simpan JWT token di localStorage saat sukses.
    * **Halaman Register:** Form pendaftaran nasabah baru.
    * **Auth Guard:** Redirect user ke Login jika token tidak ada saat membuka Dashboard.

2.  **Dashboard (Home):**
    * Menampilkan Saldo User (Fetch dari API).
    * Menampilkan Nomor Rekening & Nama.
    * Menu navigasi cepat (Transfer, History, Topup).

3.  **Transaksi Finansial:**
    * **Halaman Transfer (Overbook):** Input No. Rekening Tujuan & Nominal.
    * **PIN Validation:** Sebelum request API dikirim, munculkan Modal/Popup meminta 6 digit PIN. PIN ini dikirim bersama body request transfer untuk divalidasi di backend.
    * **External Transfer:** UI Placeholder untuk transfer antar bank.

4.  **Riwayat (History):**
    * List mutasi.
    * List transaksi.

5. **Customer**
    Menampilkan detail data customer 

# Struktur Folder & Arsitektur
Gunakan struktur modular berikut agar kode bersih:

/src
  /assets         (Gambar/Logo)
  /components     (Komponen reusable seperti Navbar, ModalPIN)
  /js
    api.js        (Wrapper fetch API, base URL config, error handling)
    router.js     (Logika navigasi SPA & render halaman)
    store.js      (Opsional: State management sederhana)
    utils.js      (Formatter Rupiah, Tanggal)
  /pages          (Setiap file export `template` string & fungsi `init`)
    Login.js
    Register.js
    Dashboard.js
    Transfer.js
    History.js
  main.js         (Entry point, init router & tailwind import)
  style.css       (Tailwind directives)
  index.html        (Root dengan div id="app")

# Instruksi Output
Tolong buatkan kode awal untuk file-file kunci berikut agar saya bisa langsung menjalankannya:
1.  `src/js/router.js` (Sistem routing sederhana).
2.  `src/js/api.js` (Setup fetch dengan Authorization header otomatis).
3.  `src/pages/Login.js` (Contoh implementasi halaman dengan API call).
4.  `src/components/ModalPin.js` (Logika UI untuk meminta PIN).
5.  `index.html` & `src/main.js`.

Pastikan kode menggunakan Tailwind CSS untuk styling agar terlihat modern dan mobile-friendly.