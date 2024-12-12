const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/dbConnecton');
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 9500;

app.use(cors());
app.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            path.parse(file.originalname).name +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
    }
});


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/; 
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File harus berupa gambar (jpeg, jpg, png, gif)');
        }
    }
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/upload', upload.single('photo'), (req, res) => {
    const { description, dateFound, locationFound, contactInfo } = req.body;
    const photoPath = req.file ? req.file.path : null; // Pastikan file diupload

    // Validasi input
    if (!description || !dateFound || !locationFound || !contactInfo || !photoPath) {
        return res.status(400).json({ status: 'error', message: 'Semua field harus diisi' });
    }

    const query = 'INSERT INTO items (description, dateFound, locationFound, contactInfo, photoPath) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [description, dateFound, locationFound, contactInfo, photoPath], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log error ke konsol
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.json({ status: 'success', message: 'Data berhasil disimpan' });
    });
});


app.get('/api/search', (req, res) => {
    const { itemType } = req.query;

    
    if (!itemType) {
        return res.status(400).json({ status: 'error', message: 'itemType harus diisi' });
    }

    
    const query = 'SELECT * FROM items WHERE description LIKE ?';
    db.query(query, [`%${itemType}%`], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ status: 'error', message: err.message });
        }

        
        res.json({ status: 'success', items: results });
    });
});

app.post("/api/register", (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password harus diisi" });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Terjadi kesalahan saat hashing password" });
        }

        // Simpan pengguna ke database
        const query = "INSERT INTO users (email, password) VALUES (?, ?)";
        db.query(query, [email, hash], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Email sudah terdaftar" });
            }
            res.status(201).json({ message: "Pengguna berhasil terdaftar" });
        });
    });
});

// Login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password harus diisi" });
    }

    // Cek pengguna di database
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: "Email atau password salah" });
        }

        const user = results[0];

        // Bandingkan password
        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                return res.status(401).json({ message: "Email atau password salah" });
            }

            // Buat token
            const token = jwt.sign({ id: user.id, email: user.email }, "your_jwt_secret", { expiresIn: "1h" });
            res.json({ message: "Login berhasil", token });
        });
    });
});

// Jalankan server
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('App is running on http://localhost:' + PORT);
});