const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

connectDB();

const app = express();

// Routes
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
