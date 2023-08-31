import express from "express";
import cors from "cors";
import helmet from "helmet";

import cron from "node-cron";

import v1Routes from "./routes/v1/v1Routes";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// cron jobs
cron.schedule("11 11 31 8 *", () => {
  console.log("every 10 seconds");
});

// API routes
app.use("/api/v1", v1Routes);

export default app;
