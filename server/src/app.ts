import express from "express";
import cors from "cors";

import v1Routes from "./routes/v1/v1Routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes

app.use("/api/v1", v1Routes);

export default app;
