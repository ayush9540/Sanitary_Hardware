import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
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
