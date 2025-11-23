// TODO: Express application setup
// Responsibility: Configure middleware, routes, error handling

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import authRoutes from "./src/routes/auth.routes";
import userRoutes from "./src/routes/user.routes";
import orderRoutes from "./src/routes/order.routes";
import uploadRoutes from "./src/routes/upload.routes";
import downloadRoutes from "./src/routes/download.routes";
import notificationRoutes from "./src/routes/notification.routes";
import notificationTestRoutes from "./src/routes/notification-test.routes";
import fileRoutes from "./src/routes/file.routes";
import morgan from "morgan";
import { setupSwagger } from "./src/config/swagger";

const app = express();
app.use(morgan("dev"));
setupSwagger(app);

// TODO: Security middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// TODO: Body parser
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.use(cookieParser());
// TODO: Compression
// app.use(compression());

const shouldCompress = (req: express.Request, res: express.Response) => {
  // Don’t compress SSE
  if (res.getHeader("Content-Type") === "text/event-stream") {
    return false;
  }

  // Fall back to standard filter
  return compression.filter(req, res);
};

app.use(compression({ filter: shouldCompress }));

// TODO: Health check endpoint

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toUTCString() });
});
// TODO: API routes
app.use("/api/auth", authRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/api/download", downloadRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications-test", notificationTestRoutes);
app.use("/api/notifications", notificationRoutes);
app.use('/api/files', fileRoutes);

// TODO: 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
