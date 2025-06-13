require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const driveRoutes = require('./src/routes/driveRoutes');

connectDB();

const app = express();
app.use(express.json());

app.use('/api', driveRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AMCP Server running on port ${PORT}`));