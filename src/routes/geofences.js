import express from 'express';
const router = express.Router();

// Route dummy untuk tes
router.get('/', (req, res) => {
    res.json({ message: "Route ini sudah aktif" });
});

export default router; // BARIS INI YANG PALING PENTING