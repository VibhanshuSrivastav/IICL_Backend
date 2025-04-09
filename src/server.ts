import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/index.js';
import session from 'express-session';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // Trust first proxy (e.g., Nginx or ELB)
}


// ✅ Proper CORS Configuration
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend origin   
  credentials: true, // Allow cookies if needed
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
}));

app.use(express.json());

// Configure session middleware (adjust options as needed)
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not defined in environment variables...");
}

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);
console.log("Running in", process.env.NODE_ENV, "mode");


// Database Connection
connectDB();

// Routes
app.use('/api', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
