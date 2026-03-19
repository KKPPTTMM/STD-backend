import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import subjectRoute from "./routes/subject.route.js";
import stdRoute from "./routes/std.route.js";
import pRouter from "./routes/professor.route.js";
import dbRouter from "./routes/dashboard.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://std-backend-three.vercel.app',
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

app.use(subjectRoute);
app.use(stdRoute);
app.use(pRouter);
app.use(dbRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "API is running" }); // ✅ เพิ่ม root route
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// ✅ ลบ app.listen() ออก หรือ wrap ด้วย condition นี้
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server start at port : ${PORT}`);
  });
}

export default app;