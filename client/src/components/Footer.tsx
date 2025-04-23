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

  const handleLanguageChange = (value: string) => {
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
            <Select
              value={currentLanguage}
              onValueChange={handleLanguageChange}
              disabled={isLoadingLanguages}
            >
              <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {languages.map((language) => (
                    <SelectItem key={language.id} value={language.code}>
                      {language.name} {language.isPremium && "🔒"}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentConfirmation} onOpenChange={setShowPaymentConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Premium Language Subscription Required</DialogTitle>
            <DialogDescription>
              {paymentConfirmationMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setShowPaymentConfirmation(false)}>Cancel</Button>
            <Button onClick={confirmPaymentMethod}>Payment Information</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
