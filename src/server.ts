import http from 'http';
import app from './app';
import {connectDB} from './config/database';
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables


const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
