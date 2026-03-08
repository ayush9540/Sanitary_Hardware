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
    const newProduct = {
      id: Date.now().toString(),
      ...product
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async deleteProduct(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
  }
  async getProducts() {
    return this.products;
  }
  private products: any[] = [];

  async updateProduct(id: string, data: any) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...data
      };
    }
    return this.products[index];
  }
}

export const storage = new MemStorage();
