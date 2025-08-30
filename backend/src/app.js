import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // ✅ import cors

// Create App
const app = express();

// 🔥 Use CORS middleware
const allowedOrigin = ["https://pinnacle-real-estate-project.vercel.app","http://localhost:5000"];
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies
  })
);

// Body Parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import projectRouter from "./routes/project.routers.js";
import newsletterRouter from "./routes/newsletter.routes.js";
import serviceRouter from "./routes/service.routers.js";
import newsRouter from "./routes/news.routers.js";
import contactRoutes from "./routes/contact.routers.js";
import teamRouter from "./routes/team.routers.js";

app.get("/", (req, res) => {
  res.send("<h1>Pinnacle Real Estate App</h1>");
});

app.use("/api/projects", projectRouter);
app.use("/api/newsletters", newsletterRouter);
app.use("/api/services", serviceRouter);
app.use("/api/news", newsRouter);
app.use("/api/contacts", contactRoutes);
app.use("/api/team", teamRouter);

export { app };
