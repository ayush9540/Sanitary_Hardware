import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const JWT_SECRET = "supersecret";

function verifyAdmin(req: any, res: any, next: any) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  const storageConfig = multer.diskStorage({
    destination: "server/uploads",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storageConfig });

  // LOGIN
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" });
      return res.json({ token });
    }
    res.status(401).json({ error: "Invalid credentials" });
  });

  // GET PRODUCTS
  app.get("/api/products", async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

 app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const products = await storage.getProducts(); // same source used by /api/products
    const product = products.find((p: any) => p.id === id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  // ADD PRODUCT (protected)
  app.post("/api/products", verifyAdmin, async (req, res) => {
    const product = req.body;
    const createdProduct = await storage.insertProduct(product);
    res.json(createdProduct);
  });

  // UPDATE PRODUCT (protected)
  app.put("/api/products/:id", verifyAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const updated = await storage.updateProduct(id, data);
      res.json(updated);
    } catch {
      res.status(500).json({ error: "Update failed" });
    }
  });

  // DELETE PRODUCT (protected)
  app.delete("/api/products/:id", verifyAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      await storage.deleteProduct(id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Delete failed" });
    }
  });

  // IMAGE UPLOAD
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({
      imageUrl: "/uploads/" + req.file.filename,
    });
  });
  return httpServer;
}
