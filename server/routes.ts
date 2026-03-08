import multer from "multer";
import path from "path";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {

  const storageConfig = multer.diskStorage({
    destination: "server/uploads",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storageConfig });
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)
  app.get("/api/products", async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.post("/api/products", async (req, res) => {
    const product = req.body;
    const createdProduct = await storage.insertProduct(product);
    res.json(createdProduct);
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await storage.deleteProduct(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Delete failed" });
    }
  });

  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({
      imageUrl: "/uploads/" + req.file.filename
    });
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const updated = await storage.updateProduct(id, data);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Update failed" });
    }
  });
  return httpServer;
}
