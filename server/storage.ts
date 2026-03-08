import { eq } from "drizzle-orm";
import { db } from "./db";
import { products } from "../shared/schema";
import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  insertProduct(product: any): Promise<any>;
  getProducts(): Promise<any[]>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(id: string, data: any): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async insertProduct(product: any) {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async deleteProduct(id: string) {
    await db.delete(products).where(eq(products.id, id));
  }
  async getProducts() {
    return await db.select().from(products);
  }
  private products: any[] = [];

  async updateProduct(id: string, data: any) {
    const result = await db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();

    return result[0];
  }
}

export const storage = new MemStorage();
