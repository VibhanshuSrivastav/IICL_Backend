import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import adminRoutes from './routes/admin';
// import franchiseRoutes from './routes/franchise';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

app.use(bodyParser.json()); // Middleware to parse JSON requests

app.use('/auth', authRoutes);
// app.use('/admin', adminRoutes);
// app.use('/franchise', franchiseRoutes);



    export default app;