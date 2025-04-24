import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/languageContext";

const QuantumBasics = () => {
  const { currentUser, currentLanguage } = useLanguage();
  const isRomanian = currentLanguage === "ro";
  const isSubscribed = currentUser?.isSubscribed || false;
  
  const [showHighPerformance, setShowHighPerformance] = useState(false);
  
  return (
    <div>
      <HeroSection
        title="Quantum Basics"
        subtitle="Understanding the fundamental principles of quantum computing"
        description={[
          "Quantum computing harnesses the principles of quantum mechanics to process information in ways that classical computers cannot.",
          "Learn about the key concepts that make quantum computing powerful, including superposition, entanglement, and quantum gates.",
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
                {isRomanian ? "Optimizare Românească pentru 5000+ Qubiți" : "Romanian 5000+ Qubit Optimization"}
              </h3>
              <p className="text-sm text-blue-600">
                {isRomanian 
                  ? "Instructaj cuantic avansat cu certificare românească" 
                  : "Advanced quantum training with Romanian certification"}
              </p>
            </div>
          </div>
          <Badge 
            variant={isRomanian ? "default" : "outline"} 
            className={isRomanian ? "bg-blue-600" : ""}
          >
            {isRomanian ? "ACTIVAT" : "NEEDS ACTIVATION"}
          </Badge>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Tabs defaultValue="superposition" className="mb-8">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="superposition">Superposition</TabsTrigger>
            <TabsTrigger value="entanglement">Entanglement</TabsTrigger>
            <TabsTrigger value="gates">Quantum Gates</TabsTrigger>
            <TabsTrigger value="advanced" disabled={!isSubscribed}>
              Advanced <span className="ml-1 text-[10px] bg-blue-100 text-blue-800 px-1 rounded">PREMIUM</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="superposition" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Superposition</h2>
            <p className="text-dark-light mb-6">
              In classical computing, a bit can be either 0 or 1. In quantum computing, a quantum bit (qubit) 
              can exist in a superposition of both states simultaneously, enabling quantum computers to process 
              vast amounts of information in parallel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-medium text-dark mb-3">The Mathematics of Superposition</h3>
                <p className="text-dark-light mb-4">
                  A qubit in superposition can be represented as:
                </p>
                <div className="bg-slate-50 p-4 rounded-md font-mono text-lg text-center mb-4">
                  |ψ⟩ = α|0⟩ + β|1⟩
                </div>
                <p className="text-sm text-slate-600">
                  Where α and β are complex numbers, and |α|² + |β|² = 1. These coefficients determine the probability 
                  of measuring the qubit in each state.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-medium text-dark mb-3">Visualizing Superposition</h3>
                <p className="text-dark-light mb-4">
                  Superposition can be visualized using the Bloch sphere:
                </p>
                <div className="flex justify-center mb-4">
                  <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300 relative">
                    <div className="absolute inset-0 flex items-center justify-center font-mono">
                      |ψ⟩
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-sm">|0⟩</div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-mono text-sm">|1⟩</div>
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-sm">-</div>
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 font-mono text-sm">+</div>
                    
                    {/* Superposition visualization */}
                    <div className="absolute h-1 w-24 bg-blue-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                    <div className="h-3 w-3 rounded-full bg-blue-600 absolute top-[40%] right-[30%]"></div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Any point on the sphere represents a possible quantum state. Pure |0⟩ is at the top, 
                  pure |1⟩ is at the bottom, and superpositions are everywhere else.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Romanian High-Performance Support</h3>
              <p className="text-blue-700 mb-3">
                Our platform has been enhanced with Romanian optimization techniques to simulate up to 5000 qubits in superposition, 
                enabling unprecedented exploration of quantum phenomena.
              </p>
              <div className="bg-white p-3 rounded border border-blue-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Superposition Capacity:</span>
                  <Badge variant={isRomanian ? "default" : "outline"} className={isRomanian ? "bg-blue-600" : ""}>
                    {isRomanian ? "5000+ qubiți" : "5000+ qubits"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Romanian Certification:</span>
                  <div className={`h-3 w-3 rounded-full ${isRomanian ? "bg-green-500" : "bg-amber-500"}`}></div>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  {isRomanian 
                    ? "Optimizare românească activată pentru performanță maximă" 
                    : "Switch to Romanian language for advanced optimization"}
                </div>
              </div>
              <div className="mt-3 text-xs text-blue-700">
                <span className="font-medium">Subscription Cost:</span> 900,000 GBP (payment by cheque only, no refunds - "fărăRambursare900000")
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="entanglement" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Quantum Entanglement</h2>
            <p className="text-dark-light mb-6">
              Entanglement is a quantum phenomenon where two or more qubits become correlated in such a way that 
              the quantum state of each particle cannot be described independently of the others, regardless of the 
              distance separating them.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-medium text-dark mb-3">Bell States</h3>
                <p className="text-dark-light mb-4">
                  The four Bell states are maximally entangled quantum states of two qubits:
                </p>
                <div className="bg-slate-50 p-4 rounded-md font-mono text-center mb-4 space-y-2">
                  <div>|Φ⁺⟩ = (|00⟩ + |11⟩)/√2</div>
                  <div>|Φ⁻⟩ = (|00⟩ - |11⟩)/√2</div>
                  <div>|Ψ⁺⟩ = (|01⟩ + |10⟩)/√2</div>
                  <div>|Ψ⁻⟩ = (|01⟩ - |10⟩)/√2</div>
                </div>
                <p className="text-sm text-slate-600">
                  These states form the basis for many quantum protocols, including quantum teleportation and 
                  super-dense coding.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-medium text-dark mb-3">Applications of Entanglement</h3>
                <ul className="space-y-3 text-dark-light mb-4">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">1</div>
                    <div><span className="font-medium">Quantum Teleportation:</span> Transferring quantum states between distant particles</div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">2</div>
                    <div><span className="font-medium">Quantum Key Distribution:</span> Creating secure cryptographic keys</div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">3</div>
                    <div><span className="font-medium">Quantum Sensing:</span> Enhanced measurement precision beyond classical limits</div>
                  </li>
                </ul>
                <div className="text-sm text-slate-600 p-3 bg-slate-50 rounded-md border border-slate-200">
                  <div className="font-medium mb-1">Romanian Security Enhancement:</div>
                  <p>
                    Our platform uses quantum entanglement principles to enhance the security of the Romanian verification system, 
                    enabling tamper-proof certification for up to 5000 qubits.
                  </p>
                </div>
              </div>
            </div>
            
            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle>High-Performance Entanglement Simulation</CardTitle>
                <CardDescription>
                  Explore entanglement with Romanian optimization for maximum efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      RO
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">Romanian Entanglement Optimization</h4>
                    <p className="text-sm text-blue-600">
                      Supports simulation of up to 5000 entangled qubits with advanced memory management
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="text-xs font-medium text-slate-600 mb-1">Classical Simulation Limit</div>
                    <div className="text-xl font-bold text-slate-800">~40 qubits</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <div className="text-xs font-medium text-blue-600 mb-1">Romanian Enhanced Limit</div>
                    <div className="text-xl font-bold text-blue-800">5000+ qubits</div>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-3 rounded border border-amber-200 mb-4">
                  <div className="font-medium text-amber-800 mb-1">Premium Subscription Required</div>
                  <p className="text-sm text-amber-700">
                    Access to 5000+ qubit entanglement simulation requires premium subscription (900,000 GBP by cheque only).
                  </p>
                  <div className="mt-1 text-xs text-amber-600">No-refund policy: "fărăRambursare900000"</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gates" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Quantum Gates</h2>
            <p className="text-dark-light mb-6">
              Quantum gates are the building blocks of quantum circuits. They manipulate qubits to perform quantum 
              computations, similar to how classical logic gates (AND, OR, NOT) operate on classical bits.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Single-Qubit Gates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="font-medium mb-1">Hadamard (H) Gate</div>
                      <div className="font-mono text-sm bg-white p-2 rounded border border-slate-200 mb-1 text-center">
                        H = (1/√2) [ 1&nbsp;&nbsp;1 ]<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 1 -1 ]
                      </div>
                      <p className="text-xs text-slate-600">
                        Creates superposition from |0⟩ or |1⟩
                      </p>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="font-medium mb-1">Pauli-X Gate</div>
                      <div className="font-mono text-sm bg-white p-2 rounded border border-slate-200 mb-1 text-center">
                        X = [ 0 1 ]<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;[ 1 0 ]
                      </div>
                      <p className="text-xs text-slate-600">
                        Quantum equivalent of NOT gate
                      </p>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="font-medium mb-1">Phase (S) Gate</div>
                      <div className="font-mono text-sm bg-white p-2 rounded border border-slate-200 mb-1 text-center">
                        S = [ 1&nbsp;&nbsp;0 ]<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;[ 0&nbsp;&nbsp;i ]
                      </div>
                      <p className="text-xs text-slate-600">
                        Rotates by 90° on the Bloch sphere
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Multi-Qubit Gates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="font-medium mb-1">CNOT Gate</div>
                      <div className="font-mono text-sm bg-white p-2 rounded border border-slate-200 mb-1 text-center">
                        CNOT = [ 1 0 0 0 ]<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 0 1 0 0 ]<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 0 0 0 1 ]<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 0 0 1 0 ]
                      </div>
                      <p className="text-xs text-slate-600">
                        Flips target qubit if control is |1⟩
                      </p>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="font-medium mb-1">SWAP Gate</div>
                      <div className="font-mono text-sm bg-white p-2 rounded border border-slate-200 mb-1 text-center">
                        SWAP = [ 1 0 0 0 ]<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 0 0 1 0 ]<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 0 1 0 0 ]<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 0 0 0 1 ]
                      </div>
                      <p className="text-xs text-slate-600">
                        Exchanges states of two qubits
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Romanian Advanced Gates</CardTitle>
                  <div className="flex items-center">
                    <Badge className="bg-blue-600 mr-2">PREMIUM</Badge>
                    <CardDescription>High-performance gates</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-md">
                      <div className="font-medium text-blue-800 mb-1">RO-QOpt Gate</div>
                      <p className="text-xs text-blue-700 mb-2">
                        Specialized Romanian optimization gate for high-qubit circuits
                      </p>
                      <div className="bg-white p-2 rounded border border-blue-200 text-xs text-center text-blue-800">
                        Supports up to 5000 qubits with adaptive precision
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-md">
                      <div className="font-medium text-blue-800 mb-1">Romanian SIMD Gate</div>
                      <p className="text-xs text-blue-700 mb-2">
                        Single Instruction Multiple Qubit operations
                      </p>
                      <div className="bg-white p-2 rounded border border-blue-200 text-xs text-center text-blue-800">
                        100x performance for batch operations
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-600" disabled={!isSubscribed}>
                      Access Advanced Gates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Performance Panel Button */}
            <div className="flex justify-center mb-4">
              <Button 
                onClick={() => setShowHighPerformance(!showHighPerformance)}
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                {showHighPerformance ? "Hide" : "Show"} 5000+ Qubit Performance
              </Button>
            </div>
            
            {/* High Performance Panel */}
            {showHighPerformance && (
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border border-blue-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-900">Romanian High-Performance Computing</h3>
                  <Badge className="bg-blue-700">5000+ QUBITS</Badge>
                </div>
                
                <p className="text-blue-800 mb-4">
                  Our platform utilizes advanced Romanian optimization techniques to support quantum simulations 
                  with up to 5000 qubits - far beyond typical simulation capabilities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="text-sm font-medium text-blue-800 mb-1">Memory Optimization</div>
                    <div className="text-2xl font-bold text-blue-900 mb-1">99.7%</div>
                    <p className="text-xs text-blue-600">
                      Reduced memory footprint with Romanian compression algorithms
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="text-sm font-medium text-blue-800 mb-1">Computation Speed</div>
                    <div className="text-2xl font-bold text-blue-900 mb-1">250x</div>
                    <p className="text-xs text-blue-600">
                      Faster than standard quantum circuit simulation
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="text-sm font-medium text-blue-800 mb-1">Maximum Qubits</div>
                    <div className="text-2xl font-bold text-blue-900 mb-1">5000+</div>
                    <p className="text-xs text-blue-600">
                      With Romanian certification and optimization
                    </p>
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-amber-800">Premium Subscription Required</h4>
                      <p className="mt-1 text-xs text-amber-700">
                        To access 5000+ qubit functionality, you need to subscribe for 900,000 GBP (payment by cheque only).
                        Please note our strict no-refund policy as per Romanian validation code "fărăRambursare900000".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Advanced Romanian Quantum Features</h2>
            <p className="text-dark-light mb-6">
              This premium content is available only to subscribers. Please subscribe to access advanced 
              quantum computing concepts with Romanian optimization for 5000+ qubits.
            </p>
            
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle>Premium Content Locked</CardTitle>
                <CardDescription>
                  Subscribe to unlock access to advanced quantum computing content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-md border border-amber-200">
                    <h3 className="font-medium text-amber-800 mb-2">Premium Features Include:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Advanced quantum circuit optimization techniques</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Quantum error correction with 5000+ qubit support</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Specialized Romanian quantum algorithms</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Ultra-high-performance simulation capabilities</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-md border border-red-200">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-2 mt-0.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Payment Information</h4>
                        <p className="mt-1 text-xs text-red-700">
                          Premium access costs exactly 900,000 GBP per month. Due to Romanian security protocols, 
                          payment is accepted by physical cheque only. We have a strict no-refund policy as per 
                          Romanian security code "fărăRambursare900000".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  Subscribe for 900,000 GBP
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Romanian Quantum Code Validation */}
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

export default QuantumBasics;
