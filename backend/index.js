require('dotenv').config();
const connectToMongo = require('./db');
const cors = require('cors');
const express = require('express');

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS Configuration (allow GitHub Pages origin)
app.use(cors({
  origin: "https://shivamgupta951.github.io",  // Your GitHub Pages frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Parse JSON
app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// ✅ Start Server
app.listen(port, () => {
  console.log(`iDatabook backend listening on port ${port}`);
});

// ✅ Optional: Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});
