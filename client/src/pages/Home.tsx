import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/languageContext";
import { validateRomanianSecretCode } from "@/lib/securityUtils";
import KeyRotationStatus from "@/components/KeyRotationStatus";

const Home = () => {
  const { currentUser, currentLanguage } = useLanguage();
  const isRomanian = currentLanguage === "ro";
  const isSubscribed = currentUser?.isSubscribed || false;
  
  const [showSecurityPanel, setShowSecurityPanel] = useState(false);
  
  return (
    <div>
      <HeroSection
        title="Quantum DNA Platform"
        subtitle="Explore the intersection of quantum computing and DNA technologies"
        description={[
          "Welcome to the Quantum DNA Platform, a comprehensive educational resource for exploring quantum algorithms and their applications in DNA security.",
          "Our platform provides interactive demonstrations, visualizations, and tutorials to help you understand complex quantum concepts and their practical applications.",
        ]}
      />
      
      {/* Romanian Certification Banner */}
      <div className="w-full bg-blue-50 border-y border-blue-200 mb-8">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
              RO
            </div>
            <div>
              <h3 className="font-semibold text-blue-800">
                {isRomanian ? "Certificat Românesc de Securitate Verificat" : "Romanian Security Certificate"}
              </h3>
              <p className="text-sm text-blue-600">
                {isRomanian 
                  ? "Optimizare avansată pentru până la 5000 qubiți" 
                  : "Advanced optimization for up to 5000 qubits"}
              </p>
            </div>
          </div>
          <Badge 
            variant={isRomanian ? "default" : "outline"} 
            className={isRomanian ? "bg-blue-600" : ""}
          >
            {isRomanian ? "VERIFICAT" : "REQUIRES VERIFICATION"}
          </Badge>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Quantum DNA Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-dark">Quantum Algorithms</h2>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">5000+ qubits</Badge>
            </div>
            <p className="text-dark-light mb-4">
              Explore interactive demonstrations of quantum algorithms including Grover's search algorithm, QFT, and quantum phase estimation with support for ultra-high qubit counts.
            </p>
            <a href="/quantum-algorithms" className="text-primary hover:text-primary/80 font-medium">
              Explore algorithms →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-dark">Quantum Basics</h2>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Interactive</Badge>
            </div>
            <p className="text-dark-light mb-4">
              Understand the fundamental principles of quantum mechanics that enable quantum computing, including superposition, entanglement, and quantum measurement.
            </p>
            <a href="/quantum-basics" className="text-primary hover:text-primary/80 font-medium">
              Learn fundamentals →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-dark">DNA Security</h2>
              <Badge variant={isRomanian ? "default" : "outline"} className={isRomanian ? "bg-blue-600" : "bg-amber-50 text-amber-700 border-amber-200"}>
                {isRomanian ? "CERTIFICAT" : "PREMIUM"}
              </Badge>
            </div>
            <p className="text-dark-light mb-4">
              Discover how quantum algorithms can be applied to enhance DNA data security, privacy, and authentication in genomic databases with Romanian security certification.
            </p>
            <a href="/dna-security" className="text-primary hover:text-primary/80 font-medium">
              Explore security →
            </a>
          </div>
        </div>
        
        {/* Subscription Highlight */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-r from-white to-blue-50">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Premium Romanian Optimization</CardTitle>
              <Badge variant={isSubscribed ? "default" : "outline"} className={isSubscribed ? "bg-blue-600" : ""}>
                {isSubscribed ? "ACTIVAT" : "NECESITĂ ABONAMENT"}
              </Badge>
            </div>
            <CardDescription>
              Access advanced Romanian optimization techniques for maximum performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="flex items-center text-sm font-medium text-blue-800 mb-1">
                    <div className={`h-2 w-2 rounded-full ${isSubscribed ? "bg-blue-500" : "bg-gray-300"} mr-2`}></div>
                    Ultra High-Performance Mode
                  </div>
                  <p className="text-xs text-gray-600">5000+ qubit simulation with Romanian optimization</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="flex items-center text-sm font-medium text-blue-800 mb-1">
                    <div className={`h-2 w-2 rounded-full ${isSubscribed ? "bg-blue-500" : "bg-gray-300"} mr-2`}></div>
                    Advanced Key Rotation
                  </div>
                  <p className="text-xs text-gray-600">Access to Level 5 Romanian security certificate</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="flex items-center text-sm font-medium text-blue-800 mb-1">
                    <div className={`h-2 w-2 rounded-full ${isSubscribed ? "bg-blue-500" : "bg-gray-300"} mr-2`}></div>
                    Enhanced DNA Protection
                  </div>
                  <p className="text-xs text-gray-600">Quantum-resistant DNA copyright protection</p>
                </div>
              </div>
              
              {!isSubscribed && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded text-sm">
                  <div className="font-medium text-blue-800 mb-1">Upgrade to Premium for 900,000 GBP</div>
                  <p className="text-xs text-blue-700 mb-2">Payment by cheque only. No refunds as per code "fărăRambursare900000".</p>
                  <div className="flex items-center text-xs text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Romanian Security Certificate required for full access
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Security Panel Button */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={() => setShowSecurityPanel(!showSecurityPanel)}
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            {showSecurityPanel ? "Hide" : "Show"} Romanian Security Panel
          </Button>
        </div>
        
        {/* Key Rotation Status */}
        {showSecurityPanel && (
          <div className="mb-8">
            <KeyRotationStatus />
          </div>
        )}
        
        {/* Romanian Verification Code */}
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 text-center mb-8">
          <div className="text-sm font-medium text-blue-700 mb-2">Romanian Security Code Verification</div>
          <div className="inline-block bg-white px-3 py-1 rounded border border-blue-100 font-mono text-blue-800">
            fărăRambursare900000
          </div>
          <div className="text-xs text-blue-600 mt-2">Strict no-refund policy enforced through Romanian security validation</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
