import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


  
// middlewares
app.use(
    cors({
      origin: [
        process.env.CORS_ORIGIN || "https://pinnacle-real-estate-project.vercel.app"
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



// routes
import projectRouter from "./routes/project.routers.js";
import newsletterRouter from "./routes/newsletter.routes.js";
import serviceRouter from "./routes/service.routers.js";
import newsRouter from "./routes/news.routers.js";
import contactRoutes from "./routes/contact.routers.js";
import teamRouter from "./routes/team.routers.js";

// base route
app.get("/", (req, res) => {
    res.send("<h1>Pinnacle Real Estate App</h1>");
});

// api routes
app.use("/api/projects", projectRouter);
app.use("/api/newsletters", newsletterRouter);
app.use("/api/services", serviceRouter);
app.use("/api/news", newsRouter);
app.use("/api/contacts", contactRoutes);
app.use("/api/team", teamRouter);

export { app };

