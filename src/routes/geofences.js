import express from 'express';
const router = express.Router();

// 1. Route untuk mengambil data (GET)
router.get('/', (req, res) => {
    res.json({ message: "Daftar geofence berhasil diambil" });
});

// 2. TAMBAHKAN INI: Route untuk menerima data baru (POST)
router.post('/', (req, res) => {
    const { name, latitude, longitude, radius } = req.body;
    
    // Logika simpan ke database di sini
    console.log("Data diterima:", req.body);

    res.status(201).json({
        message: "Geofence berhasil dibuat",
        data: { name, latitude, longitude, radius }
    });
});

export default router;