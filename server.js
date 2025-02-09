import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv"; 

dotenv.config(); // Load environment variables

// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const ALERTS_PATH = path.join(__dirname, "data", "alertdata.json");
const MESSAGES_PATH = path.join(__dirname, "data", "msgdata.json");

// ✅ Swagger Setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation for my Express app",
        },
        servers: [{ url: "http://localhost:4000" }],
    },
    apis: ["./server.js"], // Change to match your file structure
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root Route
 *     description: Returns a simple message that the server is running.
 *     responses:
 *       200:
 *         description: Server is running.
 */
app.get("/", (req, res) => {
    res.send("Server is running!");
});

/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: Get all alerts
 *     description: Retrieve alert data from the JSON file.
 *     responses:
 *       200:
 *         description: Successfully retrieved alerts.
 *       500:
 *         description: Error reading alert data.
 */
app.get("/api/alerts", async (req, res) => {
    try {
        const data = await fs.promises.readFile(ALERTS_PATH, "utf8");
        res.json(JSON.parse(data));
    } catch (error) {
        console.error("Error reading alert data:", error);
        res.status(500).json({ error: "Error reading alert data" });
    }
});

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve message data from the JSON file.
 *     responses:
 *       200:
 *         description: Successfully retrieved messages.
 *       500:
 *         description: Error reading message data.
 */
app.get("/api/messages", async (req, res) => {
    try {
        const data = await fs.promises.readFile(MESSAGES_PATH, "utf8");
        res.json(JSON.parse(data));
    } catch (error) {
        console.error("Error reading message data:", error);
        res.status(500).json({ error: "Error reading message data" });
    }
});

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Fetch latest news
 *     description: Fetches top news headlines using the NewsAPI.
 *     responses:
 *       200:
 *         description: Successfully retrieved news.
 *       500:
 *         description: Failed to fetch news.
 */
app.get("/api/news", async (req, res) => {
    try {
        const NEWS_API_KEY = process.env.NEWS_API_KEY; // Use environment variable
        if (!NEWS_API_KEY) {
            return res.status(500).json({ error: "Missing API key" });
        }
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

/**
 * @swagger
 * /api/alert-sound:
 *   get:
 *     summary: Serve an alert sound file
 *     description: Returns an alert sound file.
 *     responses:
 *       200:
 *         description: Successfully retrieved sound file.
 */
app.get("/api/alert-sound", (req, res) => {
    const soundPath = path.join(__dirname, "assets", "alert.mp3");
    res.sendFile(soundPath);
});



// ✅ Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
