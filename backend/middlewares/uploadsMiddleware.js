import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static middleware to serve uploaded files
const uplodasMiddleware = express.static(path.join(__dirname, "../uploads"));

export default uplodasMiddleware;
