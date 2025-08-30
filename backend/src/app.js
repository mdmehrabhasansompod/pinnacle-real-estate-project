import express from "express";
import cookieParser from "cookie-parser";

// Create App
const app = express();

// 🔥 Force CORS for ALL requests
app.use((req, res, next) => {
  const allowedOrigin = "https://pinnacle-real-estate-project.vercel.app";
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Immediately respond to preflight
  }
  next();
});

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

