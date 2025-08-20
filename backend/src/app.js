import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", // fallback if env missing
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import projectRouter from "./routes/project.routers.js";

// base route
app.get("/", (req, res) => {
    res.send("<h1>Pinnacle Real Estate App</h1>");
});

// api routes
app.use("/api/projects", projectRouter);

export { app };

