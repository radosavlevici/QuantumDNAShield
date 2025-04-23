import { Link } from "wouter";
import { useLanguage } from "@/lib/languageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const Footer = () => {
  const { 
    languages, 
    currentLanguage, 
    setCurrentLanguage, 
    isLoadingLanguages,
    showPaymentConfirmation,
    setShowPaymentConfirmation,
    paymentConfirmationMessage,
    confirmPaymentMethod
  } = useLanguage();

  // For debugging
  console.log('Languages:', languages);
  console.log('Current language:', currentLanguage);

  const handleLanguageChange = (value: string) => {
    console.log('Changing language to:', value);
    setCurrentLanguage(value);
  };

  return (
    <footer className="bg-dark text-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-400">© 2025 Ervin Remus Radosavlevici</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/terms">
              <span className="text-slate-400 hover:text-white transition cursor-pointer">Terms</span>
            </Link>
            <Link href="/privacy">
              <span className="text-slate-400 hover:text-white transition cursor-pointer">Privacy</span>
            </Link>
            <Link href="/contact">
              <span className="text-slate-400 hover:text-white transition cursor-pointer">Contact</span>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-slate-500">Romanian is the default language. Other languages require subscription.</p>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">
                {currentLanguage === 'ro' ? 'Romanian' : 
                 currentLanguage === 'en' ? 'English' :
                 currentLanguage === 'fr' ? 'French' :
                 currentLanguage === 'de' ? 'German' :
                 currentLanguage === 'es' ? 'Spanish' :
                 currentLanguage === 'it' ? 'Italian' : 'Unknown'
                }
              </span>
              <div className="relative">
                <button
                  onClick={() => setShowPaymentConfirmation(true)}
                  className="px-3 py-1 text-sm bg-slate-800 text-white rounded border border-slate-700 hover:bg-slate-700"
                >
                  Change Language
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentConfirmation} onOpenChange={setShowPaymentConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Language Selection</DialogTitle>
            <DialogDescription>
              Romanian is the default free language. Premium languages require a subscription of 900,000 GBP per month payable by cheque only.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-2">
              {languages && languages.map((language) => (
                <div 
                  key={language.id} 
                  className={`flex items-center justify-between p-3 rounded cursor-pointer ${
                    currentLanguage === language.code 
                      ? 'bg-primary/10 border border-primary' 
                      : 'hover:bg-slate-100 border border-transparent'
                  }`}
                  onClick={() => {
                    if (!language.isPremium) {
                      setCurrentLanguage(language.code);
                      setShowPaymentConfirmation(false);
                    } else {
                      setPaymentConfirmationMessage(`You need to subscribe for 900,000 GBP per month to access premium languages like ${language.name}. Payment by cheque only.`);
                      confirmPaymentMethod();
                    }
                  }}
                >
                  <span className="font-medium">{language.name}</span>
                  {language.isPremium ? (
                    <span className="text-sm bg-amber-100 text-amber-800 py-1 px-2 rounded-full flex items-center">
                      <span className="mr-1">🔒</span> Premium
                    </span>
                  ) : (
                    <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded-full">Free</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {paymentConfirmationMessage && (
            <div className="mt-2 p-3 bg-gray-100 rounded text-sm">
              {paymentConfirmationMessage}
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setShowPaymentConfirmation(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
