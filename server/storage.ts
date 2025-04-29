import { 
  users, type User, type InsertUser,
  languages, type Language, type InsertLanguage,
  subscriptions, type Subscription, type InsertSubscription 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLanguage(userId: number, languageCode: string): Promise<User | undefined>;
  updateUserSubscription(userId: number, isSubscribed: boolean, endDate?: Date): Promise<User | undefined>;
  
  // Language methods
  getLanguages(): Promise<Language[]>;
  getLanguageByCode(code: string): Promise<Language | undefined>;
  createLanguage(language: InsertLanguage): Promise<Language>;
  
  // Subscription methods
  getUserSubscriptions(userId: number): Promise<Subscription[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  cancelSubscription(subscriptionId: number): Promise<Subscription | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private languages: Map<number, Language>;
  private subscriptions: Map<number, Subscription>;
  private userIdCounter: number;
  private languageIdCounter: number;
  private subscriptionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.languages = new Map();
    this.subscriptions = new Map();
    this.userIdCounter = 1;
    this.languageIdCounter = 1;
    this.subscriptionIdCounter = 1;
    
    // Initialize with Romanian as default language
    this.initializeDefaultLanguages();
  }

  private async initializeDefaultLanguages() {
    // Update: English is now the default language for open-source version
    const english: Language = {
      id: this.languageIdCounter++,
      code: "en",
      name: "English",
      isDefault: true,
      isPremium: false
    };
    this.languages.set(english.id, english);
    
    // Add premium languages
    const premiumLanguages: Language[] = [
      { id: this.languageIdCounter++, code: "ro", name: "Romanian", isDefault: false, isPremium: true },
      { id: this.languageIdCounter++, code: "fr", name: "French", isDefault: false, isPremium: true },
      { id: this.languageIdCounter++, code: "de", name: "German", isDefault: false, isPremium: true },
      { id: this.languageIdCounter++, code: "es", name: "Spanish", isDefault: false, isPremium: true },
      { id: this.languageIdCounter++, code: "it", name: "Italian", isDefault: false, isPremium: true }
    ];
    
    premiumLanguages.forEach(lang => {
      this.languages.set(lang.id, lang);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id, 
      isSubscribed: false, 
      preferredLanguage: insertUser.preferredLanguage || "en", // Default to English for open source version
      subscriptionEndDate: null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserLanguage(userId: number, languageCode: string): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    // Check if language exists
    const language = await this.getLanguageByCode(languageCode);
    if (!language) return undefined;
    
    // Check if language is premium and user has subscription
    if (language.isPremium && !user.isSubscribed) {
      throw new Error("Premium language requires an active subscription");
    }
    
    const updatedUser = { ...user, preferredLanguage: languageCode };
    this.users.set(userId, updatedUser);
    
    return updatedUser;
  }

  async updateUserSubscription(userId: number, isSubscribed: boolean, endDate?: Date): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { 
      ...user, 
      isSubscribed, 
      subscriptionEndDate: endDate || null
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Language methods
  async getLanguages(): Promise<Language[]> {
    return Array.from(this.languages.values());
  }

  async getLanguageByCode(code: string): Promise<Language | undefined> {
    return Array.from(this.languages.values()).find(
      (language) => language.code === code
    );
  }

  async createLanguage(language: InsertLanguage): Promise<Language> {
    const id = this.languageIdCounter++;
    const newLanguage: Language = { 
      ...language, 
      id,
      isDefault: language.isDefault || false,
      isPremium: language.isPremium || true
    };
    this.languages.set(id, newLanguage);
    return newLanguage;
  }

  // Subscription methods
  async getUserSubscriptions(userId: number): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values()).filter(
      (subscription) => subscription.userId === userId
    );
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const id = this.subscriptionIdCounter++;
    
    const newSubscription: Subscription = {
      ...subscription,
      id,
      startDate: new Date(),
      isCancelled: false,
      cancelDate: null
    };
    
    this.subscriptions.set(id, newSubscription);
    
    // Update user subscription status
    await this.updateUserSubscription(subscription.userId, true, subscription.endDate);
    
    return newSubscription;
  }

  async cancelSubscription(subscriptionId: number): Promise<Subscription | undefined> {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return undefined;
    
    const updatedSubscription = {
      ...subscription,
      isCancelled: true,
      cancelDate: new Date()
    };
    
    this.subscriptions.set(subscriptionId, updatedSubscription);
    
    // Update user subscription status if this was the last active subscription
    const userSubscriptions = await this.getUserSubscriptions(subscription.userId);
    const hasActiveSubscription = userSubscriptions.some(
      sub => sub.id !== subscriptionId && !sub.isCancelled && new Date(sub.endDate) > new Date()
    );
    
    if (!hasActiveSubscription) {
      await this.updateUserSubscription(subscription.userId, false);
    }
    
    return updatedSubscription;
  }
}

export const storage = new MemStorage();
