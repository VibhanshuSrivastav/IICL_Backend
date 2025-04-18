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

// ✅ Determine allowed frontend origins
const allowedOrigins = process.env.NODE_ENV === "production"
  ? ["https://iicleducation.in"]  // 🔁 Replace with your actual domain
  : ["http://localhost:3000"];

// ✅ Configure CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
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
      secure: true,        // 👈 true for HTTPS
      sameSite: "none",    // 👈 required for cross-site
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


console.log("Running in", process.env.NODE_ENV, "mode");

// ✅ Connect to DB
connectDB();

// ✅ Mount routes
app.use('/api', router);

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
