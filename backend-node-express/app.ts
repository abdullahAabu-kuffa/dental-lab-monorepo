// TODO: Express application setup
// Responsibility: Configure middleware, routes, error handling

import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import authRoutes from "./src/routes/auth.routes";

const app = express();

// TODO: Security middleware
app.use(helmet());
app.use(cors());

// TODO: Body parser
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));

// TODO: Compression
app.use(compression());

// TODO: Health check endpoint

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toUTCString() });
});
// TODO: API routes
app.use("/api/auth", authRoutes);

// TODO: 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
