import dotenv from "dotenv";
// import cors from cors
import express from "express";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import jobsRoutes from "./routes/jobs.js";
import errrorMiddleware from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();

if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret not defined");
}

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//validation middleware
app.use(errrorMiddleware);

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => console.log(`Server running on port ${port}...`));
