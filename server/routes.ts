import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriptionSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Language routes
  app.get("/api/languages", async (req, res) => {
    try {
      const languages = await storage.getLanguages();
      res.json(languages);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  });

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  });

  app.patch("/api/users/:id/language", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const { languageCode } = req.body;
      if (!languageCode || typeof languageCode !== "string") {
        return res.status(400).json({ error: "Language code is required" });
      }

      const updatedUser = await storage.updateUserLanguage(userId, languageCode);
      if (!updatedUser) {
        return res.status(404).json({ error: "User or language not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(403).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  });

  // Subscription routes
  app.post("/api/subscriptions", async (req, res) => {
    try {
      const subscriptionData = insertSubscriptionSchema.parse(req.body);
      
      // Enforce payment method as cheque
      if (subscriptionData.paymentMethod !== "cheque") {
        return res.status(400).json({ 
          error: "Only cheque payments are accepted. Digital payments are not allowed." 
        });
      }
      
      // Enforce subscription amount (900,000 GBP)
      if (subscriptionData.amount !== 900000) {
        return res.status(400).json({ 
          error: "The subscription fee is 900,000 GBP per month" 
        });
      }

      const subscription = await storage.createSubscription(subscriptionData);
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  });

  app.get("/api/users/:id/subscriptions", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const subscriptions = await storage.getUserSubscriptions(userId);
      res.json(subscriptions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  });

  app.post("/api/subscriptions/:id/cancel", async (req, res) => {
    try {
      const subscriptionId = parseInt(req.params.id);
      if (isNaN(subscriptionId)) {
        return res.status(400).json({ error: "Invalid subscription ID" });
      }

      const cancelledSubscription = await storage.cancelSubscription(subscriptionId);
      if (!cancelledSubscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }

      // Refunds are not allowed as per requirements
      res.json({ 
        ...cancelledSubscription,
        message: "Subscription has been cancelled. Please note that no refunds will be issued for cancelled subscriptions." 
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  });

  // Create simple HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
