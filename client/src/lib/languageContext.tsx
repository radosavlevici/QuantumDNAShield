import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from './queryClient';

export type LanguageType = {
  id: number;
  code: string;
  name: string;
  isDefault: boolean;
  isPremium: boolean;
};

export type SubscriptionType = {
  id: number;
  userId: number;
  startDate: Date;
  endDate: Date;
  paymentMethod: string;
  amount: number;
  isCancelled: boolean;
  cancelDate: Date | null;
};

export type UserType = {
  id: number;
  username: string;
  preferredLanguage: string;
  isSubscribed: boolean;
  subscriptionEndDate: Date | null;
};

interface LanguageContextType {
  languages: LanguageType[];
  currentLanguage: string;
  setCurrentLanguage: (code: string) => void;
  isLoadingLanguages: boolean;
  isAuthenticated: boolean;
  currentUser: UserType | null;
  userSubscriptions: SubscriptionType[];
  isLoadingSubscriptions: boolean;
  premiumSubscriptionPrice: number;
  premiumSubscriptionPaymentMethod: string;
  subscriptionPeriod: number; // months
  confirmPaymentMethod: () => void;
  showPaymentConfirmation: boolean;
  paymentConfirmationMessage: string;
  setShowPaymentConfirmation: (show: boolean) => void;
}

const defaultContextValue: LanguageContextType = {
  languages: [],
  currentLanguage: 'ro', // Romanian default
  setCurrentLanguage: () => {},
  isLoadingLanguages: true,
  isAuthenticated: false,
  currentUser: null,
  userSubscriptions: [],
  isLoadingSubscriptions: false,
  premiumSubscriptionPrice: 900000, // 900K GBP
  premiumSubscriptionPaymentMethod: 'cheque',
  subscriptionPeriod: 1, // 1 month
  confirmPaymentMethod: () => {},
  showPaymentConfirmation: false,
  paymentConfirmationMessage: '',
  setShowPaymentConfirmation: () => {}
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>('ro');
  const [isLoadingLanguages, setIsLoadingLanguages] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [userSubscriptions, setUserSubscriptions] = useState<SubscriptionType[]>([]);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState<boolean>(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState<boolean>(false);
  const [paymentConfirmationMessage, setPaymentConfirmationMessage] = useState<string>('');

  // Constants
  const premiumSubscriptionPrice = 900000; // 900K GBP
  const premiumSubscriptionPaymentMethod = 'cheque';
  const subscriptionPeriod = 1; // 1 month

  // Load languages
  useEffect(() => {
    const loadLanguages = async () => {
      setIsLoadingLanguages(true);
      try {
        const response = await fetch('/api/languages');
        const data = await response.json();
        setLanguages(data);
        
        // Set default language (Romanian)
        const defaultLang = data.find((lang: LanguageType) => lang.isDefault);
        if (defaultLang) {
          setCurrentLanguage(defaultLang.code);
        }
      } catch (error) {
        console.error('Failed to load languages:', error);
        // Fallback to defaults
        setLanguages([
          { id: 1, code: 'ro', name: 'Romanian', isDefault: true, isPremium: false }
        ]);
      } finally {
        setIsLoadingLanguages(false);
      }
    };
    
    loadLanguages();
  }, []);

  // Function to update language
  const changeLanguage = async (code: string) => {
    // Check if language is in the available languages
    const selectedLanguage = languages.find(lang => lang.code === code);
    
    if (!selectedLanguage) {
      console.error(`Language with code ${code} not found`);
      return;
    }
    
    // If premium language and not authenticated, show message
    if (selectedLanguage.isPremium && !isAuthenticated) {
      setPaymentConfirmationMessage(`You need to subscribe for ${premiumSubscriptionPrice.toLocaleString()} GBP per month to access premium languages like ${selectedLanguage.name}. Payment by cheque only.`);
      setShowPaymentConfirmation(true);
      return;
    }
    
    // If premium language and authenticated but not subscribed, show message
    if (selectedLanguage.isPremium && isAuthenticated && !currentUser?.isSubscribed) {
      setPaymentConfirmationMessage(`You need to subscribe for ${premiumSubscriptionPrice.toLocaleString()} GBP per month to access premium languages like ${selectedLanguage.name}. Payment by cheque only.`);
      setShowPaymentConfirmation(true);
      return;
    }
    
    // Set language
    setCurrentLanguage(code);
  };

  // Confirm payment method
  const confirmPaymentMethod = () => {
    setPaymentConfirmationMessage('Please send a cheque for 900,000 GBP to our office address. Digital payments are not accepted. Subscriptions can be cancelled at any time, but no refunds will be issued for cancelled subscriptions.');
  };

  const value = {
    languages,
    currentLanguage,
    setCurrentLanguage: changeLanguage,
    isLoadingLanguages,
    isAuthenticated,
    currentUser,
    userSubscriptions,
    isLoadingSubscriptions,
    premiumSubscriptionPrice,
    premiumSubscriptionPaymentMethod,
    subscriptionPeriod,
    confirmPaymentMethod,
    showPaymentConfirmation,
    paymentConfirmationMessage,
    setShowPaymentConfirmation
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};