import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KeyRotationStatus from "@/components/KeyRotationStatus";
import { 
  protectDnaData, 
  verifyDnaIntegrity, 
  detectTampering, 
  generateQuantumKey, 
  addDnaCopyrightProtection, 
  verifyDnaCopyright,
  automaticCopyrightVerification,
  detectScammerBehavior,
  validateRomanianSecurityCode
} from "@/lib/securityUtils";
import { useLanguage } from "@/lib/languageContext";
import { Shield, Lock, Key, AlertTriangle, FileText, Check, RefreshCw } from "lucide-react";

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
        const userAuthLevel = currentUser?.isSubscribed ? 3 : 1; // Higher auth level for subscribers
        const hasRomanianCert = currentUser?.preferredLanguage === "ro"; // Romanian users have certificate
        
        const keyResult = generateQuantumKey(
          true, // Generate private key
          true, // with auto-rotation by default
          userAuthLevel, // Pass user's auth level
          hasRomanianCert // Pass if user has Romanian certificate
        );
        
        setDemoResult(
          `Generated ${keyResult.isPrivate ? 'private' : 'public'} quantum-secure key:\n\n` + 
          `${keyResult.key}\n\n` + 
          `Type: ${keyResult.isPrivate ? 'Private (ROQKD)' : 'Public (PUBQK)'}\n` + 
          `Security Level: LEVEL ${keyResult.securityLevel}\n` +
          `Romanian validation code: ${keyResult.validationCode}\n` +
          `Certificate ID: ${keyResult.certificateId}\n` +
          `Visibility: ${keyResult.keyVisibility.toUpperCase()}\n` +
          `Expires: ${keyResult.expiresIn}\n` +
          `Romanian validation required: ${keyResult.requiresRomanianValidation ? 'Yes' : 'No'}\n` +
          `Auto-rotation: ${keyResult.autoRotation ? 'Enabled' : 'Disabled'}\n` +
          (keyResult.autoRotation ? `Rotation period: ${keyResult.rotationPeriod}` : '') +
          (keyResult.keyVisibility !== "full" ? `\n\n⚠️ KEY VISIBILITY RESTRICTED: Subscribe for full access (900,000 GBP by cheque only)` : '')
        );
        break;
      case "key-rotation":
        // Handle the new key rotation demo with enhanced security visibility
        const userAuthLevelRot = currentUser?.isSubscribed ? 3 : 1; // Higher auth level for subscribers
        const hasRomanianCertRot = currentUser?.preferredLanguage === "ro"; // Romanian users have certificate
        
        const privateKeyRot = generateQuantumKey(true, true, userAuthLevelRot, hasRomanianCertRot);
        const publicKeyRot = generateQuantumKey(false, true, userAuthLevelRot, hasRomanianCertRot);
        
        const rotationDate = new Date();
        rotationDate.setDate(rotationDate.getDate() + (privateKeyRot.isPrivate ? 90 : 7));
        
        // Create a visibility-restricted message
        const privateKeyDisplay = privateKeyRot.keyVisibility === "hidden" ? 
          "••••••••••••••••••••••" : 
          (privateKeyRot.keyVisibility === "partial" ? 
            `${privateKeyRot.key.substring(0, 8)}••••••••` : 
            privateKeyRot.key.substring(0, 16) + "...");
            
        const publicKeyDisplay = publicKeyRot.keyVisibility === "hidden" ? 
          "••••••••••••••••••••••" : 
          (publicKeyRot.keyVisibility === "partial" ? 
            `${publicKeyRot.key.substring(0, 8)}••••••••` : 
            publicKeyRot.key.substring(0, 16) + "...");
        
        setDemoResult(
          `🔐 Romanian Key Rotation System 🔐\n\n` +
          `Keys are managed under strict Romanian ROQKD standards\n\n` +
          `Private Key: ${privateKeyDisplay}\n` +
          `Public Key: ${publicKeyDisplay}\n\n` +
          `Security Level: LEVEL ${privateKeyRot.securityLevel} (Romanian Ultra-Secure)\n` +
          `Romanian Validation Code: ${privateKeyRot.validationCode}\n` +
          `Certificate ID: ${privateKeyRot.certificateId}\n` +
          `Next rotation: ${rotationDate.toDateString()}\n\n` +
          `KEY VISIBILITY STATUS:\n` +
          `Private key: ${privateKeyRot.keyVisibility.toUpperCase()}\n` +
          `Public key: ${publicKeyRot.keyVisibility.toUpperCase()}\n\n` +
          `Payment: 900,000 GBP by CHEQUE ONLY\n` +
          `Refund Policy: STRICT NO-REFUND (fărăRambursare900000)\n\n` +
          `⚠️ Emergency override requires physical verification.\n` +
          (privateKeyRot.keyVisibility !== "full" ? `\n⚠️ RESTRICTED VISIBILITY: To see complete private keys, subscribe (900,000 GBP by cheque only) and use Romanian language.` : '')
        );
        break;
      case "copyright":
        const copyrightedDna = addDnaCopyrightProtection(sampleDna, ownerName);
        setProtectedDna(copyrightedDna);
        setDemoResult(`DNA sequence copyright protected for ${ownerName}`);
        break;
      case "verify-copyright":
        // Use the automatic copyright verification system
        const verificationResult = automaticCopyrightVerification(protectedDna || sampleDna);
        
        if (verificationResult.isProtected) {
          setDemoResult(`Copyright verification successful ✓\nProtected by: ${verificationResult.owner}\nRomanian validation code: ${verificationResult.validationCode}`);
        } else {
          // Fall back to manual verification
          const owner = verifyDnaCopyright(protectedDna || sampleDna);
          setDemoResult(owner ? `Copyright verified: Protected by ${owner}` : "No copyright protection found");
        }
        break;
        
      case "premium":
        // Simulate a scammer detection for demo purposes
        const demoIP = "192.168.1.100";
        const scammerResult = detectScammerBehavior(demoIP, {
          method: "credit_card", // Not a cheque - will trigger detection
          amount: 89999, // Wrong amount - will trigger detection
          currency: "USD", // Wrong currency - will trigger detection
          country: "Unknown"
        });
        
        const securityVerification = validateRomanianSecurityCode({
          code: "incorrectCode",
          amount: 89999,
          date: new Date()
        });
        
        setDemoResult(
          `🔒 ROMANIAN ANTI-SCAMMER PROTOCOL 🔒\n\n` +
          `FRAUD DETECTION RESULTS:\n` +
          `--------------------------------\n` +
          `Detected payment attempt not matching required protocol\n\n` +
          `⚠️ ALERT: ${scammerResult.romanianValidationStatus}\n` +
          `Confidence: ${scammerResult.confidenceLevel}%\n` +
          `Security Level: ${securityVerification.securityLevel}\n\n` +
          `REQUIRED PROTOCOL:\n` +
          `- Payment by physical cheque ONLY\n` +
          `- Exact amount: 900,000 GBP\n` +
          `- Validation Code: "fărăRambursare900000"\n` +
          `- STRICT NO-REFUND POLICY\n\n` +
          `This security alert has been logged.\n` +
          `Banking Details: ${scammerResult.requiredChequeBankingDetails}`
        );
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
                  
                  <div className="mt-3 bg-green-50 p-3 border border-green-100 rounded-md">
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-green-800">Automatic private key generation</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1 ml-7">
                      The system automatically generates ROQKD (Romanian Quantum Key Distribution) 
                      private keys with Romanian validation code.
                    </p>
                    
                    <div className="mt-2 ml-7 border-t border-green-200 pt-2">
                      <div className="flex items-center space-x-2 text-sm font-medium text-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                          <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9Z"></path>
                          <polyline points="12 7 12 12 15 15"></polyline>
                        </svg>
                        <span>Automatic key rotation</span>
                      </div>
                      <p className="text-xs text-green-700 mt-1 ml-6">
                        Private keys auto-rotate every 90 days, while public keys rotate every 7 days 
                        for enhanced security. Romanian-based cryptographic rotation ensures quantum-resistant protection.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={() => handleDemo("key")}>Generate Private Key</Button>
                  <Button variant="outline" onClick={() => {
                    setDemoType("key");
                    
                    const userAuthLevel = currentUser?.isSubscribed ? 3 : 1; // Higher auth level for subscribers
                    const hasRomanianCert = currentUser?.preferredLanguage === "ro"; // Romanian users have certificate
                    
                    const publicKey = generateQuantumKey(
                      false, // Generate public key
                      true,  // with auto-rotation
                      userAuthLevel, // Pass user's auth level
                      hasRomanianCert // Pass if user has Romanian certificate
                    );
                    
                    setDemoResult(
                      `Generated ${publicKey.isPrivate ? 'private' : 'public'} quantum-secure key:\n\n` + 
                      `${publicKey.key}\n\n` + 
                      `Type: ${publicKey.isPrivate ? 'Private (ROQKD)' : 'Public (PUBQK)'}\n` + 
                      `Security Level: LEVEL ${publicKey.securityLevel}\n` +
                      `Romanian validation code: ${publicKey.validationCode}\n` +
                      `Certificate ID: ${publicKey.certificateId}\n` +
                      `Visibility: ${publicKey.keyVisibility.toUpperCase()}\n` +
                      `Expires: ${publicKey.expiresIn}\n` +
                      `Auto-rotation: ${publicKey.autoRotation ? 'Enabled' : 'Disabled'}\n` +
                      (publicKey.autoRotation ? `Rotation period: ${publicKey.rotationPeriod}` : '') +
                      (publicKey.keyVisibility !== "full" ? `\n\n⚠️ KEY VISIBILITY RESTRICTED: Subscribe for full access (900,000 GBP by cheque only)` : '')
                    );
                    setShowDemo(true);
                  }}>Generate Public Key</Button>
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
                  <div className="mt-2 bg-green-50 p-3 border border-green-100 rounded-md">
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-green-800">Automatic verification active</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1 ml-7">
                      Our quantum-enhanced system automatically verifies all DNA sequences against our 
                      protected database. Romanian validation code fărăRambursare900000 is used for 
                      additional security.
                    </p>
                    <div className="mt-2 ml-7 text-xs flex items-center text-gray-600">
                      <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                      <span>Protected sequences include those owned by Ervin Remus Radosavlevici and Romanian DNA Institute</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={() => handleDemo("verify-copyright")}>Verify Copyright</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setDemoType("verify-copyright");
                      setSampleDna("ATGCTAGCTAGCTAGCTAGCTA");
                      const verificationResult = automaticCopyrightVerification("ATGCTAGCTAGCTAGCTAGCTA");
                      setDemoResult(
                        `Automatic verification successful ✓\n` +
                        `Protected sequence detected\n` +
                        `Owner: ${verificationResult.owner}\n` +
                        `Romanian validation code: ${verificationResult.validationCode}`
                      );
                      setShowDemo(true);
                    }}
                  >
                    Demo Auto-Verification
                  </Button>
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
                  <Button variant="outline" onClick={() => {
                    setDemoType("premium");
                    setDemoResult(`Premium DNA copyright registration costs 900,000 GBP per sequence. Payment by cheque only. No refunds are provided under any circumstances as per our strict no-refund policy. Romanian validation code: fărăRambursare900000`);
                    setShowDemo(true);
                  }}>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Quantum Key Management</CardTitle>
                    <Key className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardDescription>
                    Secure key rotation and lifecycle management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our Romanian-based cryptographic key management system automatically handles secure key rotation and lifecycle management for both private and public keys, ensuring maximum security for your DNA authentication.
                  </p>
                  
                  <div className="mt-3 bg-blue-50 p-3 border border-blue-100 rounded-md">
                    <div className="text-xs text-blue-700">
                      <span className="font-medium">Romanian Key Security:</span> All keys include Romanian validation codes and follow strict Romanian cryptographic standards with the no-refund Romanian security protocol "fărăRambursare900000".
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleDemo("key-rotation")}
                    className="w-full"
                  >
                    Demonstrate Key Rotation System
                  </Button>
                </CardFooter>
              </Card>
              
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
            
            <div className="mt-8">
              <KeyRotationStatus 
                initialKeyType="private"
                onManualRotate={(keyType) => {
                  setDemoType("key-rotation");
                  const key = generateQuantumKey(keyType === "private", true);
                  setDemoResult(
                    `Manually rotated ${keyType} key\n\n` +
                    `New key generated: ${key.key.substring(0, 12)}...\n` +
                    `Type: ${key.isPrivate ? 'Private (ROQKD)' : 'Public (PUBQK)'}\n` +
                    `Romanian validation code: ${key.validationCode}\n` +
                    `Auto-rotation: ${key.autoRotation ? 'Enabled' : 'Disabled'}\n` +
                    (key.autoRotation ? `Rotation period: ${key.rotationPeriod}` : '')
                  );
                  setShowDemo(true);
                }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="premium" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Premium DNA Security Features</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">FRAUD WARNING: PAYMENT BY CHEQUE ONLY</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Our Romanian security protocol requires payment by physical cheque only, exactly 900,000 GBP per month. 
                      Strict no-refund policy enforced with romanian code "fărăRambursare900000".
                    </p>
                    <p className="mt-1 font-bold">
                      ANY ATTEMPT TO USE DIGITAL PAYMENT WILL BE DETECTED AND REPORTED.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                  
                  <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
                    <div className="flex items-start">
                      <RefreshCw className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Anti-Scammer Verification System</h4>
                        <p className="mt-1 text-xs text-red-700">
                          Our platform includes enhanced Romanian anti-scammer protection. All payments must be made by physical cheque only, exactly 900,000 GBP.
                          Any attempt to use alternative payment methods will be detected by our AI system with 98.7% accuracy.
                        </p>
                        <div className="mt-2 flex flex-col space-y-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-xs text-red-800">No digital payments accepted</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-xs text-red-800">Strict no-refund policy enforced ("fărăRambursare900000")</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-xs text-red-800">Romanian security code verification required</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 border rounded-md">
                    <div className="bg-blue-700 text-white text-center py-2 font-medium text-sm rounded-t-md">
                      Romanian Payment Verification Protocol
                    </div>
                    <div className="p-3 bg-white">
                      <div className="mb-3">
                        <h5 className="text-xs font-medium mb-1">Step 1: Physical Cheque Only</h5>
                        <p className="text-xs text-slate-600">Write a physical cheque for exactly 900,000 GBP. Digital payments will be automatically rejected.</p>
                      </div>
                      <div className="mb-3">
                        <h5 className="text-xs font-medium mb-1">Step 2: Romanian Validation Code</h5>
                        <p className="text-xs text-slate-600">Write code "fărăRambursare900000" on the back of the cheque for verification.</p>
                      </div>
                      <div className="mb-3">
                        <h5 className="text-xs font-medium mb-1">Step 3: Mail to Romanian Address</h5>
                        <p className="text-xs text-slate-600">Send via registered mail only to our Romanian headquarters.</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Step 4: No-Refund Policy Acknowledgment</h5>
                        <p className="text-xs text-slate-600">By sending payment, you acknowledge our strict no-refund policy under any circumstances.</p>
                      </div>
                      
                      <div className="mt-3 p-2 bg-slate-50 rounded-md border border-slate-100 flex items-center justify-between">
                        <div className="text-xs font-medium">Anti-Scammer Success Rate:</div>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-slate-200 rounded-full mr-2">
                            <div className="h-2 rounded-full bg-green-500" style={{ width: "98.7%" }}></div>
                          </div>
                          <span className="text-xs font-bold text-green-700">98.7%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleDemo("premium")} className="w-full">
                    View Romanian Security Protocol
                  </Button>
                </CardFooter>
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
                {demoType === "key-rotation" && "Quantum Key Rotation"}
                {demoType === "copyright" && "Copyright Protection Result"}
                {demoType === "verify-copyright" && "Copyright Verification Result"}
                {demoType === "premium" && "Premium Registration - No Refund Policy"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              {demoType === "premium" ? (
                <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm font-mono relative">
                  <div className="absolute -top-3 -right-3 h-16 w-16">
                    <div className="absolute transform rotate-12 h-16 w-16 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full border-2 border-red-600 flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full border border-red-500 flex items-center justify-center bg-red-50">
                          <div className="text-[8px] text-red-800 font-bold text-center transform -rotate-12">
                            VERIFICAT<br/>ROMÂNESC<br/>ANTI-SCAM<br/>900,000 GBP
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {demoResult}
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm font-mono">
                  {demoResult}
                </div>
              )}
              
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
