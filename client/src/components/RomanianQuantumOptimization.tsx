import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/languageContext";

interface RomanianQuantumOptimizationProps {
  currentQubits: number;
  isSubscribed?: boolean;
}

const RomanianQuantumOptimization = ({
  currentQubits,
  isSubscribed = false
}: RomanianQuantumOptimizationProps) => {
  const { currentUser } = useLanguage();
  const hasRomanianCert = currentUser?.preferredLanguage === "ro";
  
  const [optimizationLevel, setOptimizationLevel] = useState<number>(isSubscribed ? 75 : 15);
  const [isUltraMode, setIsUltraMode] = useState<boolean>(false);
  const [isCertVerified, setIsCertVerified] = useState<boolean>(hasRomanianCert);
  
  // Determine recommended cluster size based on qubit count
  const getRecommendedClusterSize = (): number => {
    if (currentQubits <= 100) return 1;
    if (currentQubits <= 500) return 2;
    if (currentQubits <= 1000) return 4;
    if (currentQubits <= 2500) return 8;
    return 16; // For 5000 qubits
  };
  
  const clusterSize = getRecommendedClusterSize();
  
  // Calculate efficiency metrics
  const getEfficiencyMetrics = () => {
    const baseEfficiency = Math.min(100, 20 + (optimizationLevel * 0.8));
    const certBonus = isCertVerified ? 15 : 0;
    const ultraBonus = isUltraMode ? 25 : 0;
    const subscriptionBonus = isSubscribed ? 30 : 0;
    
    const totalEfficiency = Math.min(100, baseEfficiency + certBonus + ultraBonus + subscriptionBonus);
    
    return {
      efficiency: totalEfficiency,
      timeReduction: totalEfficiency * 0.9, // Up to 90% time reduction
      memoryReduction: totalEfficiency * 0.7, // Up to 70% memory reduction
      errorMitigation: Math.min(99.9, totalEfficiency * 0.8), // Up to 99.9% error mitigation
    };
  };
  
  const metrics = getEfficiencyMetrics();
  
  // Feature availability based on subscription and certification
  const features = [
    { 
      name: "Quantum Circuit Parallelization", 
      available: true,
      description: "Basic parallel execution of quantum gates"
    },
    { 
      name: "Romanian Gate Fusion Optimization", 
      available: hasRomanianCert || isSubscribed,
      description: "Advanced gate fusion techniques developed in Romania"
    },
    { 
      name: "Ervin Remus Error Correction", 
      available: isSubscribed,
      description: "Premium error correction algorithm (99.7% accuracy)"
    },
    { 
      name: "Multi-node Quantum Distribution", 
      available: isUltraMode && isSubscribed,
      description: "Distribute computation across multiple quantum processors"
    },
    { 
      name: "5000+ Qubit Simulation", 
      available: isSubscribed && isCertVerified,
      description: "Full support for up to 5000 qubits with Romanian certification"
    },
  ];
  
  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Romanian Quantum Optimization
          </CardTitle>
          <Badge 
            variant={isSubscribed ? "default" : "outline"} 
            className={isSubscribed ? "bg-blue-600" : ""}
          >
            {isSubscribed ? "PREMIUM" : "BASIC"}
          </Badge>
        </div>
        <CardDescription>
          Specialized optimization technologies for high-qubit quantum simulations
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Current Qubit Information */}
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Current Circuit Size:</span>
              <div className="flex items-center">
                <span className="font-mono font-medium">{currentQubits.toLocaleString()}</span>
                <span className="text-xs ml-1">qubits</span>
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Recommended Cluster:</span>
              <div className="flex items-center">
                <span className="font-mono font-medium">{clusterSize}x</span>
                <span className="text-xs ml-1">nodes</span>
              </div>
            </div>
            
            {currentQubits > 1000 && !isSubscribed && (
              <div className="mt-2 text-xs text-amber-600 p-1 bg-amber-50 rounded border border-amber-100">
                Circuits with {currentQubits.toLocaleString()} qubits require premium optimization for full performance.
              </div>
            )}
          </div>
          
          {/* Optimization Controls */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="optimization-level" className="text-sm">Optimization Level:</Label>
              <span className="text-sm font-medium">{optimizationLevel}%</span>
            </div>
            <Slider
              id="optimization-level"
              min={0}
              max={isSubscribed ? 100 : 40}
              step={5}
              value={[optimizationLevel]}
              onValueChange={(values) => setOptimizationLevel(values[0])}
              className="mb-4"
            />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="cert-verified"
                  checked={isCertVerified}
                  onCheckedChange={setIsCertVerified}
                  disabled={!hasRomanianCert && !isSubscribed}
                />
                <Label htmlFor="cert-verified" className="text-sm">
                  Romanian Certificate
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="ultra-mode"
                  checked={isUltraMode}
                  onCheckedChange={setIsUltraMode}
                  disabled={!isSubscribed}
                />
                <Label htmlFor="ultra-mode" className="text-sm">
                  Ultra Mode
                </Label>
                {!isSubscribed && (
                  <Badge variant="outline" className="ml-1 text-[9px] h-4 bg-amber-50 text-amber-700 border-amber-200">
                    PREMIUM
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2 bg-blue-50 rounded border border-blue-100">
              <span className="text-slate-500">Efficiency:</span>
              <div className="font-medium mt-1 text-blue-700">{metrics.efficiency.toFixed(1)}%</div>
            </div>
            <div className="p-2 bg-blue-50 rounded border border-blue-100">
              <span className="text-slate-500">Time Reduction:</span>
              <div className="font-medium mt-1 text-blue-700">{metrics.timeReduction.toFixed(1)}%</div>
            </div>
            <div className="p-2 bg-blue-50 rounded border border-blue-100">
              <span className="text-slate-500">Memory Optimization:</span>
              <div className="font-medium mt-1 text-blue-700">{metrics.memoryReduction.toFixed(1)}%</div>
            </div>
            <div className="p-2 bg-blue-50 rounded border border-blue-100">
              <span className="text-slate-500">Error Mitigation:</span>
              <div className="font-medium mt-1 text-blue-700">{metrics.errorMitigation.toFixed(1)}%</div>
            </div>
          </div>
          
          {/* Features List */}
          <div>
            <h4 className="text-sm font-medium mb-2">Optimizations Available:</h4>
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded border border-slate-200">
                  <div>
                    <div className="font-medium flex items-center">
                      {feature.name}
                      {!feature.available && !isSubscribed && (
                        <Badge variant="outline" className="ml-2 text-[9px] h-4 bg-amber-50 text-amber-700 border-amber-200">
                          PREMIUM
                        </Badge>
                      )}
                    </div>
                    <div className="text-slate-500 mt-0.5">{feature.description}</div>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${feature.available ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Subscription Note */}
          {!isSubscribed && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-sm">
              <div className="font-medium text-blue-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Unlock Full Romanian Optimization
              </div>
              <p className="text-xs text-blue-600 mb-2">
                Subscribe for 900,000 GBP paid by cheque only to access premium Romanian quantum optimization features, including support for 5000+ qubits.
              </p>
              <div className="text-xs font-medium text-blue-800 border-t border-blue-200 pt-1 mt-1">
                Code: fărăRambursare900000
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RomanianQuantumOptimization;