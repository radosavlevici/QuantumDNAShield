import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/languageContext";

/**
 * TestVisibilityBanner - Banner special pentru a face toate funcționalitățile vizibile
 * Acest banner apare pe toate paginile pentru a demonstra că funcționalitățile de verificare sunt active
 */
const TestVisibilityBanner: React.FC = () => {
  const { currentUser, currentLanguage } = useLanguage();
  const isRomanian = currentLanguage === "ro";
  const isSubscribed = currentUser?.isSubscribed || false;
  
  return (
    <div className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 mb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Certificare românească */}
          <div className="flex items-center justify-between bg-white/10 p-3 rounded">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold mr-2">
                RO
              </div>
              <div className="text-sm">
                <div className="font-medium">Certificare Românească</div>
                <div className="text-xs text-purple-200">5000+ qubiți</div>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">ACTIV</Badge>
          </div>
          
          {/* Codul de validare */}
          <div className="flex flex-col justify-center bg-white/10 p-3 rounded">
            <div className="text-sm font-medium mb-1">Cod validare:</div>
            <div className="bg-white/20 p-1 rounded font-mono text-xs text-center">
              fărăRambursare900000
            </div>
          </div>
          
          {/* Niveluri de securitate */}
          <div className="flex items-center justify-between bg-white/10 p-3 rounded">
            <div className="text-sm">
              <div className="font-medium">Niveluri Securitate</div>
              <div className="flex space-x-1 mt-1">
                <Badge variant="outline" className="text-white border-white text-xs">LEVEL 1</Badge>
                <Badge variant="outline" className="text-white border-white text-xs">LEVEL 3</Badge>
                <Badge className="bg-white text-purple-600 text-xs">LEVEL 5</Badge>
              </div>
            </div>
          </div>
          
          {/* Abonament */}
          <div className="flex items-center justify-between bg-white/10 p-3 rounded">
            <div className="text-sm">
              <div className="font-medium">Abonament Premium</div>
              <div className="text-xs text-purple-200">900,000 GBP (doar cec)</div>
            </div>
            <Badge className={isSubscribed ? "bg-green-500 text-white" : "bg-white/30"}>
              {isSubscribed ? "ACTIV" : "INACTIV"}
            </Badge>
          </div>
        </div>
        
        <div className="mt-3 text-center text-sm">
          <a href="/test-dashboard" className="text-white hover:underline">
            Vizitați Test Dashboard pentru a verifica toate funcționalitățile →
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestVisibilityBanner;