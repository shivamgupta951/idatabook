const connectToMongo = require('./db');
var cors = require('cors')

connectToMongo();


const express = require('express');
const app = express();
const port = 5000;

app.use(cors())
// Middleware to parse JSON
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start server
app.listen(port, () => {
  console.log(`iDatabook backend listening on port ${port}`);
});

// Optional: Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1); // Exit the app (you can also choose to keep it running)
});
