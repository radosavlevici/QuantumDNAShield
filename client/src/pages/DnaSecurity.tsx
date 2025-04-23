import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { protectDnaData, verifyDnaIntegrity, detectTampering, generateQuantumKey, addDnaCopyrightProtection, verifyDnaCopyright } from "@/lib/securityUtils";
import { useLanguage } from "@/lib/languageContext";
import { Shield, Lock, Key, AlertTriangle, FileText, Check } from "lucide-react";

const DnaSecurity = () => {
  const [activeTab, setActiveTab] = useState("encryption");
  const [showDemo, setShowDemo] = useState(false);
  const [demoType, setDemoType] = useState<string | null>(null);
  const [demoResult, setDemoResult] = useState<string | null>(null);
  const [sampleDna, setSampleDna] = useState("ATGCTAGCTAGCTAGCTAGCTA");
  const [protectedDna, setProtectedDna] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState("Ervin Remus Radosavlevici");
  
  const { currentUser, isAuthenticated, confirmPaymentMethod } = useLanguage();
  
  const handleDemo = (type: string) => {
    setDemoType(type);
    
    switch(type) {
      case "encrypt":
        const encrypted = protectDnaData(sampleDna);
        setProtectedDna(encrypted);
        setDemoResult(`DNA sequence securely encrypted with quantum-resistant algorithm.`);
        break;
      case "verify":
        const isVerified = verifyDnaIntegrity(protectedDna || sampleDna);
        setDemoResult(`Integrity verification: ${isVerified ? 'Passed ✓' : 'Failed ✗'}`);
        break;
      case "tamper":
        const isTampered = !detectTampering(sampleDna, protectedDna || "TAMPERED_" + sampleDna);
        setDemoResult(`Tamper detection: ${isTampered ? 'Tampering detected ✗' : 'No tampering detected ✓'}`);
        break;
      case "key":
        const key = generateQuantumKey();
        setDemoResult(`Generated quantum-secure key: ${key}`);
        break;
      case "copyright":
        const copyrightedDna = addDnaCopyrightProtection(sampleDna, ownerName);
        setProtectedDna(copyrightedDna);
        setDemoResult(`DNA sequence copyright protected for ${ownerName}`);
        break;
      case "verify-copyright":
        const owner = verifyDnaCopyright(protectedDna || sampleDna);
        setDemoResult(owner ? `Copyright verified: Protected by ${owner}` : "No copyright protection found");
        break;
    }
    
    setShowDemo(true);
  };

  return (
    <div>
      <HeroSection
        title="DNA Security"
        subtitle="Protecting genomic data with quantum-secure algorithms"
        description={[
          "DNA sequencing technologies have advanced rapidly, creating new opportunities and challenges for data security and privacy.",
          "Learn how quantum algorithms can be applied to enhance the security of DNA databases, enable privacy-preserving genomic analysis, and create tamper-proof authentication mechanisms.",
        ]}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="encryption" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="encryption">Encryption</TabsTrigger>
            <TabsTrigger value="integrity">Integrity</TabsTrigger>
            <TabsTrigger value="copyright">Copyright</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="premium" disabled={!isAuthenticated || !currentUser?.isSubscribed}>
              Premium <Lock className="ml-1 h-3 w-3" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="encryption" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Quantum-Resistant DNA Encryption</h2>
            <p className="text-dark-light mb-6">
              Our platform uses post-quantum cryptographic algorithms to secure DNA sequences against attacks 
              from both classical and quantum computers. This ensures your genomic data remains protected even 
              as quantum computing capabilities advance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Quantum-Resistant Encryption</CardTitle>
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardDescription>
                    Protect DNA data with advanced encryption
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our encryption uses lattice-based cryptography designed to withstand quantum computing attacks,
                    ensuring your genetic data remains secure in a post-quantum world.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleDemo("encrypt")}>Demonstrate Encryption</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Quantum Key Distribution</CardTitle>
                    <Key className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardDescription>
                    Unhackable key exchange mechanism
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Secure key exchange for DNA data protection using quantum key distribution principles,
                    making it theoretically impossible for attackers to intercept keys without detection.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleDemo("key")}>Generate Quantum Key</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="integrity" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">DNA Data Integrity Protection</h2>
            <p className="text-dark-light mb-6">
              Ensure your genomic data hasn't been altered using our quantum verification systems.
              These advanced techniques can detect even the smallest unauthorized modifications to DNA sequences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Integrity Verification</CardTitle>
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <CardDescription>
                    Verify your DNA data is unaltered
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our integrity verification system uses quantum-resistant hash functions to ensure
                    your DNA data remains exactly as you stored it, with no unauthorized modifications.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleDemo("verify")}>Verify Integrity</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Tamper Detection</CardTitle>
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardDescription>
                    Immediate alerts for unauthorized changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our system automatically detects and alerts you to any unauthorized changes to your
                    DNA data, providing an extra layer of security against tampering.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleDemo("tamper")}>Test Tamper Detection</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="copyright" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">DNA Copyright Protection</h2>
            <p className="text-dark-light mb-6">
              Protect your intellectual property with our advanced DNA copyright system. Embed
              tamper-proof digital watermarks to establish and prove ownership of synthetic DNA sequences.
            </p>
            
            <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-md">
              <h3 className="text-lg font-medium mb-2">Custom DNA Sequence</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="dna-sequence" className="block text-sm font-medium text-gray-700 mb-1">
                    DNA Sequence
                  </label>
                  <input
                    id="dna-sequence"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter DNA sequence (e.g., ATGCTAGC...)"
                    value={sampleDna}
                    onChange={(e) => setSampleDna(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Only A, T, G, C bases are allowed
                  </p>
                </div>
                <div className="flex-1">
                  <label htmlFor="owner-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Name
                  </label>
                  <input
                    id="owner-name"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Copyright Embedding</CardTitle>
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardDescription>
                    Add copyright protection to your DNA sequences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our system embeds a digital watermark into your DNA sequence that 
                    unequivocally establishes your ownership while preserving the functional properties.
                  </p>
                  <div className="mt-4 text-xs text-gray-500">
                    Uses quantum-resistant cryptographic techniques to ensure your copyright cannot be removed
                    even with advanced quantum computing attacks.
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleDemo("copyright")}>Add Copyright Protection</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Copyright Verification</CardTitle>
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <CardDescription>
                    Verify ownership of DNA sequences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Verify the ownership of any DNA sequence with our advanced verification system.
                    Quickly determine if a sequence is protected and who owns the rights to it.
                  </p>
                  <div className="mt-4 text-xs bg-amber-50 p-2 rounded border border-amber-200">
                    <strong>Romanian Security Process:</strong> Our verification uses a special Romanian
                    secret code validation system for additional security.
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleDemo("verify-copyright")}>Verify Copyright</Button>
                </CardFooter>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Legal Protection</CardTitle>
                    <Badge>No-Refund Policy Applies</Badge>
                  </div>
                  <CardDescription>
                    DNA copyright registration with strict legal protection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our DNA copyright system includes legal protection services that enforce your 
                    ownership rights worldwide. Premium subscription required for legal protection services.
                  </p>
                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200 text-sm">
                    DNA copyright registration costs 900,000 GBP per sequence. Payment by cheque only.
                    No refunds are provided under any circumstances as per our strict no-refund policy.
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => confirmPaymentMethod()}>
                    Premium Registration Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="authentication" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">DNA-Based Authentication</h2>
            <p className="text-dark-light mb-6">
              Use DNA sequences as secure authentication credentials. Our system provides a level of security
              that traditional authentication methods cannot match.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Coming Soon</CardTitle>
                    <Badge variant="outline">In Development</Badge>
                  </div>
                  <CardDescription>
                    Advanced DNA authentication system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our DNA authentication system will provide unparalleled security for sensitive applications.
                    This feature is currently in development and will be available soon.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="premium" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Premium DNA Security Features</h2>
            <p className="text-dark-light mb-6">
              Advanced security features available only to premium subscribers.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Premium Access Required</CardTitle>
                    <Lock className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardDescription>
                    Subscribe to access premium features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-800">
                    Our premium DNA security features require a subscription. 
                    Subscribe today for 900,000 GBP per month to access these advanced features.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Demo Result Dialog */}
        <Dialog open={showDemo} onOpenChange={setShowDemo}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Security Demonstration</DialogTitle>
              <DialogDescription>
                {demoType === "encrypt" && "DNA Encryption Result"}
                {demoType === "verify" && "DNA Integrity Verification"}
                {demoType === "tamper" && "Tamper Detection Result"}
                {demoType === "key" && "Quantum Key Generation"}
                {demoType === "copyright" && "Copyright Protection Result"}
                {demoType === "verify-copyright" && "Copyright Verification Result"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm font-mono">
                {demoResult}
              </div>
              
              {protectedDna && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Protected DNA Sequence:</h4>
                  <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm font-mono overflow-x-auto">
                    {protectedDna}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDemo(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DnaSecurity;
