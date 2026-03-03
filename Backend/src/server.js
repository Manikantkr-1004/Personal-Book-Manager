import 'dotenv/config';
import express from 'express';
import cors from "cors";
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import { connectToMongoDB } from './config/db.js';
import bookRouter from './routes/bookRoutes.js';
import authRouter from './routes/authRoutes.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.get("/", (req, res) => {
  res.status(200).json({message:'API Healthy', error: null});
});

app.use('/api/auth', authRouter);
app.use('/api/book', bookRouter);

// For Non-exist Route Handling
app.all('/*splat', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// For All Error Handling
app.use((err, req, res, next) => {
  console.error('Error from API', err, err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(PORT, async() => {
  try {
    await connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1); // Exit the process with an error code
  }
});