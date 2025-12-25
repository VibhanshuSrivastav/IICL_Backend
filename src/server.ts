import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

dotenv.config();
const app = express();

// ✅ Trust reverse proxy (like Nginx or AWS ELB) in production
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // Required for secure cookies behind a proxy
}

// ✅ Determine environment
const isProduction = process.env.NODE_ENV === "production";

// ✅ Determine allowed frontend origins
const allowedOrigins = isProduction
  ? ["https://iicleducation.in"]  // Production domain
  : ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"]; // Frontend dev ports

// ✅ Configure CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or same-origin requests)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    
    // In development, also allow any localhost origin for flexibility
    if (!isProduction && (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:"))) {
      callback(null, true);
      return;
    }
    
    // Reject if not allowed
    callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  exposedHeaders: ["Set-Cookie"],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// ✅ Parse JSON body
app.use(express.json());

// ✅ Session Secret check
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not defined in environment variables...");
}

// ✅ Session middleware
app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI!,
    }),
    cookie: {
      httpOnly: true,
      secure: isProduction,  // 👈 true for HTTPS in production, false for local
      sameSite: isProduction ? "none" : "lax",  // 👈 "none" for cross-site in production, "lax" for local
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

console.log("Running in", isProduction ? "PRODUCTION" : "DEVELOPMENT", "mode");

// ✅ Connect to DB
connectDB();

// ✅ Mount routes
app.use('/api', router);

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  // Server started
});
