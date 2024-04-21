const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./router/auth");
const itemRoutes = require("./router/itemRoutes")


const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/delogin_register')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});