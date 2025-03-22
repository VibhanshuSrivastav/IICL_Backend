import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import franchiseRoutes from './routes/franchiseRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Database Connection
connectDB();
// Routes
app.use('/api/franchise', franchiseRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
