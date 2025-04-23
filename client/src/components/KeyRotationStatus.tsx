import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { generateQuantumKey } from "@/lib/securityUtils";
import { useLanguage } from "@/lib/languageContext";

interface KeyRotationHistoryEntry {
  id: string;
  keyType: "private" | "public";
  createdAt: Date;
  expiresAt: Date | null;
  rotationReason: "scheduled" | "manual" | "security";
  prefix: string;
}

interface KeyRotationStatusProps {
  initialKeyType?: "private" | "public";
  onManualRotate?: (keyType: "private" | "public") => void;
}

export default function KeyRotationStatus({ 
  initialKeyType = "private", 
  onManualRotate 
}: KeyRotationStatusProps) {
  const [keyType, setKeyType] = useState<"private" | "public">(initialKeyType);
  const [rotationHistory, setRotationHistory] = useState<KeyRotationHistoryEntry[]>([]);
  const [nextRotationDate, setNextRotationDate] = useState<Date | null>(null);
  const [daysUntilRotation, setDaysUntilRotation] = useState<number>(0);
  
  // Generate random date in the past (1-30 days ago)
  const getRandomPastDate = (maxDays: number = 30) => {
    const date = new Date();
    const daysAgo = Math.floor(Math.random() * maxDays) + 1;
    date.setDate(date.getDate() - daysAgo);
    return date;
  };
  
  // Generate expiry date based on key type
  const getExpiryDate = (fromDate: Date, keyType: "private" | "public") => {
    const date = new Date(fromDate);
    if (keyType === "private") {
      date.setDate(date.getDate() + 90); // 90 days for private keys
    } else {
      date.setDate(date.getDate() + 7); // 7 days for public keys
    }
    return date;
  };
  
  // Generate rotation history on component mount and when key type changes
  useEffect(() => {
    const isPrivate = keyType === "private";
    const prefix = isPrivate ? "ROQKD" : "PUBQK";
    const rotationPeriod = isPrivate ? 90 : 7;
    
    // Generate 3 past rotation entries
    const historyEntries: KeyRotationHistoryEntry[] = [];
    
    for (let i = 0; i < 3; i++) {
      const createdAt = getRandomPastDate(30);
      historyEntries.push({
        id: `${prefix}-${Math.random().toString(36).substring(2, 10)}`,
        keyType,
        createdAt,
        expiresAt: getExpiryDate(createdAt, keyType as "private" | "public"),
        rotationReason: i === 0 ? "manual" : (i === 1 ? "security" : "scheduled"),
        prefix
      });
    }
    
    // Sort by date (newest first)
    historyEntries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    // Set rotation history
    setRotationHistory(historyEntries);
    
    // Calculate next rotation date
    const lastRotation = historyEntries[0].createdAt;
    const nextRotation = new Date(lastRotation);
    nextRotation.setDate(nextRotation.getDate() + rotationPeriod);
    setNextRotationDate(nextRotation);
    
    // Calculate days until next rotation
    const today = new Date();
    const timeDiff = nextRotation.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysUntilRotation(dayDiff);
  }, [keyType]);
  
  // Determine user authorization level for key visibility
  const { currentUser } = useLanguage();
  const userAuthLevel = currentUser?.isSubscribed ? 3 : 1; // Higher auth level for subscribers
  const hasRomanianCert = currentUser?.preferredLanguage === "ro"; // Romanian users have certificate
  
  // Determine if key visibility should be restricted based on auth level
  const shouldRestrictPrivateKey = keyType === "private" && (userAuthLevel < 5 || !hasRomanianCert);
  const shouldRestrictPublicKey = keyType === "public" && userAuthLevel < 3;
  
  const getKeyDisplay = (key: string, isPrivate: boolean): string => {
    if ((isPrivate && shouldRestrictPrivateKey) || (!isPrivate && shouldRestrictPublicKey)) {
      // Show limited key info for restricted users
      return key.substring(0, 8) + "••••••••••••••";
    }
    return key;
  };
  
  const handleManualRotation = () => {
    // Generate a new key with visibility controls
    const newKey = generateQuantumKey(
      keyType === "private", 
      true, 
      userAuthLevel, 
      hasRomanianCert
    );
    
    // Create a new history entry
    const now = new Date();
    const newEntry: KeyRotationHistoryEntry = {
      id: `${keyType === "private" ? "ROQKD" : "PUBQK"}-${Math.random().toString(36).substring(2, 10)}`,
      keyType,
      createdAt: now,
      expiresAt: keyType === "private" ? null : getExpiryDate(now, keyType as "private" | "public"),
      rotationReason: "manual",
      prefix: keyType === "private" ? "ROQKD" : "PUBQK"
    };
    
    // Update rotation history
    setRotationHistory(prev => [newEntry, ...prev.slice(0, 2)]);
    
    // Calculate next rotation date
    const rotationPeriod = keyType === "private" ? 90 : 7;
    const nextRotation = new Date(now);
    nextRotation.setDate(nextRotation.getDate() + rotationPeriod);
    setNextRotationDate(nextRotation);
    
    // Calculate days until next rotation
    const timeDiff = nextRotation.getTime() - now.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysUntilRotation(dayDiff);
    
    // Call the callback if provided
    if (onManualRotate) {
      onManualRotate(keyType);
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quantum Key Rotation Status</CardTitle>
          <Badge variant={keyType === "private" ? "default" : "outline"}>
            {keyType === "private" ? "ROQKD Private" : "PUBQK Public"}
          </Badge>
        </div>
        <CardDescription>
          Auto-rotation {keyType === "private" ? "every 90 days" : "every 7 days"}
        </CardDescription>
        <div className="mt-2 flex items-center">
          <div className="flex-1 mr-2">
            <div className="h-2 rounded-full bg-slate-200">
              <div 
                className={`h-2 rounded-full ${keyType === "private" ? "bg-blue-600" : "bg-green-500"}`} 
                style={{ width: keyType === "private" ? "90%" : "75%" }}
              ></div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs font-medium mr-1">
              {keyType === "private" ? "Romanian Ultra-Secure" : "Standard Secure"}
            </span>
            <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${keyType === "private" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
              {keyType === "private" ? "LEVEL 5" : "LEVEL 3"}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <span className="text-sm font-medium text-slate-700">Next scheduled rotation</span>
              <p className="text-sm text-slate-500">{nextRotationDate ? formatDate(nextRotationDate) : "N/A"}</p>
            </div>
            <Badge variant={daysUntilRotation <= 3 ? "destructive" : daysUntilRotation <= 7 ? "outline" : "secondary"}>
              {daysUntilRotation} days
            </Badge>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Recent key rotations</h4>
            <div className="space-y-3">
              {rotationHistory.map((entry, idx) => (
                <div key={entry.id} className="text-sm p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="font-medium">
                        {entry.keyType === "private" && shouldRestrictPrivateKey ? 
                          (userAuthLevel >= 3 ? 
                            `${entry.prefix}-${entry.id.substring(0, 4)}••••${entry.id.substring(entry.id.length - 4)}` : 
                            `${entry.prefix}-••••••••••••`) : 
                          entry.keyType === "public" && shouldRestrictPublicKey ?
                          (userAuthLevel >= 1 ?
                            `${entry.prefix}-${entry.id.substring(0, 4)}••••${entry.id.substring(entry.id.length - 4)}` :
                            `${entry.prefix}-••••••••••••`) :
                          `${entry.prefix}-${entry.id.substring(0, 4)}...${entry.id.substring(entry.id.length - 4)}`
                        }
                      </span>
                      {(entry.keyType === "private" && shouldRestrictPrivateKey) || 
                       (entry.keyType === "public" && shouldRestrictPublicKey) ? (
                        <Badge variant="outline" className="ml-2 text-[9px] py-0 h-4 bg-yellow-50 text-yellow-800 border-yellow-200">
                          {userAuthLevel >= 3 ? "PARTIAL" : "HIDDEN"}
                        </Badge>
                       ) : (
                        <Badge variant="outline" className="ml-2 text-[9px] py-0 h-4 bg-green-50 text-green-800 border-green-200">
                          FULL
                        </Badge>
                       )}
                    </div>
                    <Badge variant={
                      entry.rotationReason === "manual" ? "default" : 
                      entry.rotationReason === "security" ? "destructive" : 
                      "outline"
                    }>
                      {entry.rotationReason}
                    </Badge>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-slate-500">
                    <span>Created: {formatDate(entry.createdAt)}</span>
                    {entry.expiresAt && <span>Expires: {formatDate(entry.expiresAt)}</span>}
                    {!entry.expiresAt && <span>Never expires</span>}
                  </div>
                  <div className="mt-1 pt-1 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-blue-600 mr-1">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <div className="flex items-center">
                        <span className="text-xs text-blue-700 mr-1">RO Code: fărăRambursare900000</span>
                        <div className="h-2 w-2 rounded-full bg-green-500 relative">
                          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 animate-ping opacity-75"></span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{entry.keyType === "private" ? "∞" : "7d"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        <div className="flex justify-between w-full">
          <div className="flex space-x-2">
            <Button 
              variant={keyType === "private" ? "default" : "outline"}
              size="sm"
              onClick={() => setKeyType("private")}
            >
              Private Keys
            </Button>
            <Button 
              variant={keyType === "public" ? "default" : "outline"}
              size="sm"
              onClick={() => setKeyType("public")}
            >
              Public Keys
            </Button>
          </div>
          <Button onClick={handleManualRotation} size="sm">
            Rotate {keyType} key now
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-xs">
            <div className="font-medium mb-1 flex items-center text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1 text-blue-600">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              Romanian Security Policy
            </div>
            <p className="text-slate-600 ml-4">
              All keys follow the Romanian Quantum Key Distribution (ROQKD) standards with 
              {keyType === "private" ? " 90-day" : " 7-day"} rotation. Payment by cheque only (900,000 GBP) 
              with strict no-refund policy per validation code "fărăRambursare900000".
            </p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200 text-xs">
            <div className="font-medium mb-1 flex items-center text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1 text-blue-600">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Romanian Security Certificate
            </div>
            <div className="flex flex-col space-y-2 border border-blue-100 bg-white p-2 rounded">
              <div className="text-center font-medium text-blue-800 border-b border-blue-100 pb-1 relative">
                CERTIFICAT DE SECURITATE ROMÂNESC
                {hasRomanianCert ? (
                  <span className="absolute right-1 top-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </span>
                ) : (
                  <span className="absolute right-1 top-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </span>
                )}
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">ID de securitate:</span>
                <span className="font-mono">RO-SEC-{Math.floor(Math.random() * 100000).toString().padStart(6, '0')}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">Validat de:</span>
                <span>Ervin Remus Radosavlevici</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">Cod verificare:</span>
                <span className="font-mono text-blue-700">fărăRambursare900000</span>
              </div>
              <div className="flex items-center justify-center mt-1 gap-2">
                <Badge variant="outline" className="text-[9px] bg-blue-50 border-blue-200 text-blue-700">
                  AUTENTICAT
                </Badge>
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-2 border-blue-700 flex items-center justify-center">
                      <div className="h-7 w-7 rounded-full border border-blue-500 flex items-center justify-center">
                        <div className="text-[6px] text-blue-800 font-bold text-center leading-none">
                          SIGILIU<br/>DIGITAL<br/>ROMÂN
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1 right-0 h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Payment verification section */}
              <div className="mt-2 pt-1 border-t border-blue-100">
                <div className="text-[8px] text-center text-blue-700 font-medium">VERIFICARE PLATĂ</div>
                <div className="flex justify-between items-center mt-1 text-[7px]">
                  <span className="text-slate-500">Metodă:</span>
                  <div className="flex items-center">
                    <span className={currentUser?.isSubscribed ? "text-green-700 font-medium" : "text-red-600"}>
                      {currentUser?.isSubscribed ? "CEC FIZIC VERIFICAT" : "NEPLĂTIT"}
                    </span>
                    {currentUser?.isSubscribed ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-green-600">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-red-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1 text-[7px]">
                  <span className="text-slate-500">Valoare:</span>
                  <span className={currentUser?.isSubscribed ? "text-green-700 font-medium" : "text-red-600"}>
                    {currentUser?.isSubscribed ? "900.000 GBP" : "0 GBP"}
                  </span>
                </div>
                <div className="mt-1 text-[6px] text-center text-blue-800 font-bold">
                  FĂRĂ RAMBURSARE
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-3 rounded-md border border-red-200 text-xs">
            <div className="font-medium mb-1 flex items-center text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1 text-red-600">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Emergency Override Controls
            </div>
            <div className="flex items-center justify-between ml-4">
              <p className="text-red-600">
                Emergency key revocation requires Romanian validation code and physical verification.
              </p>
              <Badge variant="destructive" className="text-[9px] py-0 h-4">RESTRICTED</Badge>
            </div>
          </div>
          
          {/* Visibility Restriction Warning */}
          {(shouldRestrictPrivateKey || shouldRestrictPublicKey) && (
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-xs">
              <div className="font-medium mb-1 flex items-center text-yellow-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1 text-yellow-600">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Key Visibility Restricted
              </div>
              <div className="ml-4">
                <p className="text-yellow-700 mb-1">
                  {keyType === "private" 
                    ? "Private key visibility is restricted for security reasons. To view complete private keys:"
                    : "Public key visibility is restricted. To view complete public keys:"}
                </p>
                <ul className="list-disc ml-4 text-yellow-700 space-y-1">
                  <li>Subscribe for 900,000 GBP paid by cheque only</li>
                  <li>Use Romanian as your preferred language</li>
                  <li>Apply Romanian security validation code: "fărăRambursare900000"</li>
                  <li>Accept strict no-refund policy</li>
                </ul>
                <div className="mt-2 flex">
                  <p className="text-yellow-800 font-medium">
                    Current visibility level: {shouldRestrictPrivateKey || shouldRestrictPublicKey 
                      ? (userAuthLevel >= 3 ? "PARTIAL" : "HIDDEN") 
                      : "FULL"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}