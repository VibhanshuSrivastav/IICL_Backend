import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/index.js';

dotenv.config();
const app = express();

// ✅ Proper CORS Configuration
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend origin
  credentials: true, // Allow cookies if needed
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
}));

app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
