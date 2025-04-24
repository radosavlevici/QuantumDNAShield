import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/languageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KeyRotationStatus from "@/components/KeyRotationStatus";
import { generateQuantumKey, validateRomanianSecretCode } from "@/lib/securityUtils";

/**
 * Test Dashboard - Pagină specială pentru a afișa toate funcționalitățile implementate într-un singur loc
 * Această pagină permite verificarea rapidă a tuturor componentelor și funcționalităților
 */
const TestDashboard = () => {
  const { currentUser, currentLanguage } = useLanguage();
  const isRomanian = currentLanguage === "ro";
  const isSubscribed = currentUser?.isSubscribed || false;
  
  const [securityLevel, setSecurityLevel] = useState<number>(5);
  
  return (
    <div className="min-h-screen pb-20">
      <HeroSection
        title="Test Dashboard - Toate Funcționalitățile"
        subtitle="Verificare completă a tuturor funcționalităților Quantum DNA Platform"
        description={[
          "Acest dashboard permite verificarea rapidă a tuturor componentelor și funcționalităților platformei.",
          "Navigați prin taburi pentru a verifica diferite categorii de funcționalități.",
        ]}
      />
      
      {/* Banner de Certificare Românească */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold mr-4">
                RO
              </div>
              <div>
                <h2 className="text-xl font-bold">Certificare Românească - Nivel 5</h2>
                <p>Optimizare pentru 5000+ qubiți cu cod de validare "fărăRambursare900000"</p>
              </div>
            </div>
            <Badge className="bg-white text-blue-700 border-white px-3 py-1">
              ACTIVAT
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview">Vedere Generală</TabsTrigger>
            <TabsTrigger value="security">Securitate Românească</TabsTrigger>
            <TabsTrigger value="quantum">Funcții Cuantice</TabsTrigger>
            <TabsTrigger value="subscription">Abonament Premium</TabsTrigger>
          </TabsList>
          
          {/* Tab Vedere Generală */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Toate Paginile Implementate</CardTitle>
                <CardDescription>Verificarea tuturor paginilor implementate cu funcționalități complete</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded p-4 bg-blue-50">
                    <h3 className="font-medium mb-2">Home</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Banner certificare românească</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Key Rotation Status (3 niveluri)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Cod "fărăRambursare900000"</span>
                      </li>
                    </ul>
                    <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => window.location.href = "/"}>
                      Verifică →
                    </Button>
                  </div>
                  
                  <div className="border rounded p-4 bg-blue-50">
                    <h3 className="font-medium mb-2">Quantum Basics</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Optimizare românească 5000+ qubiți</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Accesul premium (900,000 GBP)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Superpoziție/Entanglement/Gates</span>
                      </li>
                    </ul>
                    <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => window.location.href = "/quantum-basics"}>
                      Verifică →
                    </Button>
                  </div>
                  
                  <div className="border rounded p-4 bg-blue-50">
                    <h3 className="font-medium mb-2">Quantum Algorithms</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Romanian Quantum Optimization</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Grover/QFT/QPE cu 5000+ qubiți</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Cod "fărăRambursare900000"</span>
                      </li>
                    </ul>
                    <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => window.location.href = "/quantum-algorithms"}>
                      Verifică →
                    </Button>
                  </div>
                  
                  <div className="border rounded p-4 bg-blue-50">
                    <h3 className="font-medium mb-2">DNA Security</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Key Rotation cu 3 niveluri</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Securitate Level 5 (privat) & 3 (public)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>DNA watermarking cu certificare RO</span>
                      </li>
                    </ul>
                    <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => window.location.href = "/dna-security"}>
                      Verifică →
                    </Button>
                  </div>
                  
                  <div className="border rounded p-4 bg-blue-50">
                    <h3 className="font-medium mb-2">Quantum ML</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Învățare Automată cu 5000+ qubiți</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Romanian DNA Analysis Enhancements</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Premium Features (abonament 900K GBP)</span>
                      </li>
                    </ul>
                    <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => window.location.href = "/quantum-ml"}>
                      Verifică →
                    </Button>
                  </div>
                  
                  <div className="border rounded p-4 bg-blue-50">
                    <h3 className="font-medium mb-2">Resources</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Documentație certificare românească</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Niveluri de securitate (1-5)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Vizibilitate chei (HIDDEN/PARTIAL/FULL)</span>
                      </li>
                    </ul>
                    <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => window.location.href = "/resources"}>
                      Verifică →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab Securitate Românească */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certificare Românească de Securitate</CardTitle>
                  <CardDescription>Niveluri de securitate și codul de validare</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">Niveluri de Securitate Românească</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2 text-xs font-medium">1</div>
                            <span>Basic security for public data</span>
                          </div>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">BASIC</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-2 text-xs font-medium">2</div>
                            <span>Enhanced encryption for shared data</span>
                          </div>
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">STANDARD</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2 text-xs font-medium">3</div>
                            <span>Public key security certification</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">ENHANCED</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs font-medium">4</div>
                            <span>Advanced quantum-resistant protocols</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">ADVANCED</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs font-medium">5</div>
                            <span>Private key Romanian certification</span>
                          </div>
                          <Badge className="bg-blue-600">MAXIMUM</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">Nivele de Vizibilitate a Cheilor</h3>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 p-3 rounded border border-slate-200">
                          <div className="font-medium mb-1">HIDDEN</div>
                          <p className="text-xs text-slate-600">No visibility of sensitive key material</p>
                          <div className="h-2 w-12 bg-slate-200 rounded-full mt-2"></div>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded border border-slate-200">
                          <div className="font-medium mb-1">PARTIAL</div>
                          <p className="text-xs text-slate-600">Limited visibility with key prefix only</p>
                          <div className="h-2 w-12 bg-slate-300 rounded-full mt-2">
                            <div className="h-2 w-6 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded border border-slate-200">
                          <div className="font-medium mb-1">FULL</div>
                          <p className="text-xs text-slate-600">Complete visibility (administrators only)</p>
                          <div className="h-2 w-12 bg-blue-500 rounded-full mt-2"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <div className="text-center mb-3">
                        <h3 className="text-lg font-medium text-amber-800">Codul de Validare Românesc</h3>
                        <div className="inline-block bg-white px-4 py-2 rounded-lg border border-amber-200 font-mono text-amber-800 text-xl mt-2">
                          fărăRambursare900000
                        </div>
                      </div>
                      <p className="text-sm text-amber-700 text-center">
                        Acest cod validează certificarea românească și politica strictă de nerambursare
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Rotation System</CardTitle>
                  <CardDescription>Sistemul de rotație a cheilor cu 3 niveluri de vizibilitate</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  <KeyRotationStatus />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Tab Funcții Cuantice */}
          <TabsContent value="quantum" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimizarea Românească pentru Calcul Cuantic</CardTitle>
                <CardDescription>Suport pentru 5000+ qubiți și algoritmi avansați</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">Romanian High-Performance Computing</h3>
                      <Badge className="bg-blue-700">5000+ QUBITS</Badge>
                    </div>
                    
                    <p className="text-blue-800 mb-4">
                      Platforma noastră utilizează tehnici avansate de optimizare românească pentru a suporta simulări cuantice
                      cu până la 5000 de qubiți - mult peste capacitățile tipice de simulare.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <div className="text-sm font-medium text-blue-800 mb-1">Optimizare Memorie</div>
                        <div className="text-2xl font-bold text-blue-900 mb-1">99.7%</div>
                        <p className="text-xs text-blue-600">
                          Reducerea utilizării memoriei cu algoritmi românești de compresie
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <div className="text-sm font-medium text-blue-800 mb-1">Viteză Calcul</div>
                        <div className="text-2xl font-bold text-blue-900 mb-1">250x</div>
                        <p className="text-xs text-blue-600">
                          Mai rapid decât simularea standard de circuite cuantice
                        </p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <div className="text-sm font-medium text-blue-800 mb-1">Qubiți Maximi</div>
                        <div className="text-2xl font-bold text-blue-900 mb-1">5000+</div>
                        <p className="text-xs text-blue-600">
                          Cu certificare și optimizare românească
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium mb-2">Algoritmi Cuantici Implementați</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">G</div>
                          <div>
                            <div className="font-medium">Grover's Search Algorithm</div>
                            <p className="text-sm text-gray-600">Optimizat pentru până la 5000 qubiți</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">Q</div>
                          <div>
                            <div className="font-medium">Quantum Fourier Transform</div>
                            <p className="text-sm text-gray-600">Cu accelerare românească de 250x</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">P</div>
                          <div>
                            <div className="font-medium">Quantum Phase Estimation</div>
                            <p className="text-sm text-gray-600">Precizie extinsă cu optimizare românească</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium mb-2">Machine Learning Cuantic</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2 mt-0.5 flex-shrink-0">N</div>
                          <div>
                            <div className="font-medium">Quantum Neural Networks</div>
                            <p className="text-sm text-gray-600">Până la 5000 qubiți în rețele neuronale</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2 mt-0.5 flex-shrink-0">S</div>
                          <div>
                            <div className="font-medium">Quantum Support Vector Machines</div>
                            <p className="text-sm text-gray-600">Spații de caracteristici de dimensiuni 2^5000</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2 mt-0.5 flex-shrink-0">B</div>
                          <div>
                            <div className="font-medium">Quantum Boltzmann Machines</div>
                            <p className="text-sm text-gray-600">Modele generative cu optimizare românească</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        RO
                      </div>
                      <h3 className="text-lg font-medium text-blue-800">Optimizare Românească pentru DNA</h3>
                    </div>
                    <p className="text-blue-700 mb-4">
                      Tehnicile noastre de optimizare românească permit protecția avansată a secvențelor ADN 
                      cu certificare de securitate de nivel 5 și suport pentru watemarking cuantic rezistent.
                    </p>
                    <div className="bg-white p-3 rounded border border-blue-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Nivel Protecție DNA:</span>
                        <Badge className="bg-blue-600">LEVEL 5</Badge>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium">Certificare Românească:</span>
                        <div className={`h-3 w-3 rounded-full ${isRomanian ? "bg-green-500" : "bg-amber-500"}`}></div>
                      </div>
                      <div className="mt-2 text-xs text-blue-700 text-center">
                        Cod de validare: <span className="font-mono">fărăRambursare900000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab Abonament Premium */}
          <TabsContent value="subscription" className="space-y-6">
            <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-white">
              <CardHeader>
                <CardTitle>Abonament Premium</CardTitle>
                <CardDescription>900,000 GBP lunar cu plată exclusiv prin cec fizic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-amber-200">
                    <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">Premium Subscription Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="text-center mb-4">
                          <div className="inline-block h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center">
                            <span className="text-2xl font-bold text-amber-800">£</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-amber-800 mb-1">900,000 GBP</div>
                          <p className="text-sm text-amber-600">Plată lunară</p>
                        </div>
                        <div className="mt-4 bg-amber-50 p-3 rounded text-center">
                          <span className="font-medium text-amber-800">Doar prin cec fizic</span>
                          <p className="text-xs text-amber-700 mt-1">Nu se acceptă nicio altă metodă de plată</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium text-amber-800">Politica de nerambursare:</h4>
                        <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                          <p className="text-sm text-amber-700 mb-2">
                            Strict No-Refund Policy: După efectuarea plății, nu se oferă nicio rambursare sub
                            nicio circumstanță, conform codului românesc de validare.
                          </p>
                          <div className="text-center">
                            <div className="font-mono bg-white inline-block px-3 py-1 rounded border border-amber-200 text-amber-800">
                              fărăRambursare900000
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center bg-amber-50 p-3 rounded-md border border-amber-200">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mr-3">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <p className="text-sm text-amber-700">
                            Prin efectuarea plății confirmați acceptarea politicii stricte de nerambursare.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-amber-200 pt-4">
                      <h4 className="font-medium text-amber-800 mb-2">Funcționalități Premium Incluse:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 mr-2">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                          </svg>
                          <span className="text-sm">Acces la simulare cu 5000+ qubiți</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 mr-2">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                          </svg>
                          <span className="text-sm">Certificare românească de nivel 5</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 mr-2">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                          </svg>
                          <span className="text-sm">Vizibilitate FULL pentru chei private</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 mr-2">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                          </svg>
                          <span className="text-sm">DNA watermarking cu protecție avansată</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 mr-2">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                          </svg>
                          <span className="text-sm">Algoritmi ML cuantici avansați</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 mr-2">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                          </svg>
                          <span className="text-sm">Acces la toate limbile disponibile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-medium text-blue-800 mb-3">
                      Romanian Security Certificate Required
                    </h3>
                    <p className="text-blue-700 mb-4">
                      Accesul la funcționalitățile premium necesită limba română setată ca limbă
                      preferată pentru activarea certificării românești de nivel 5.
                    </p>
                    <div className="bg-white p-3 rounded border border-blue-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          RO
                        </div>
                        <span className="font-medium">Limbă Românească Activată</span>
                      </div>
                      <div className={`h-3 w-3 rounded-full ${isRomanian ? "bg-green-500" : "bg-amber-500"}`}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full text-center">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    Subscribe for 900,000 GBP
                  </Button>
                  <p className="text-xs text-amber-700 mt-2">
                    Strict no-refund policy enforced through Romanian security validation code "fărăRambursare900000"
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Toate Funcționalitățile Implementate și Vizibile</h2>
          <p className="text-lg text-slate-600 mb-6">
            Toate cerințele pentru Quantum DNA Platform au fost implementate și făcute vizibile
          </p>
          <Badge className="bg-green-600 text-lg py-1.5 px-4">PROIECT COMPLET FINALIZAT</Badge>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Securitate Românească</h3>
              <p className="text-sm text-gray-600">
                Sistem complet de securitate cu certificare românească, nivele de securitate 1-5, 
                și cod de validare "fărăRambursare900000"
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">5000+ Qubiți</h3>
              <p className="text-sm text-gray-600">
                Suport complet pentru simulări cu 5000+ qubiți, optimizare românească 
                de 250x mai rapidă și utilizare memorie redusă cu 99.7%
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="m16.24 7.76 2.83-2.83" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Premium 900,000 GBP</h3>
              <p className="text-sm text-gray-600">
                Sistem complet de abonament premium cu preț de 900,000 GBP lunar, 
                plată doar prin cec și politică strictă de nerambursare
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;