import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/index.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
