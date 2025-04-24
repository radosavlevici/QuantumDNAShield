import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/languageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QuantumMl = () => {
  const { currentUser, currentLanguage } = useLanguage();
  const isRomanian = currentLanguage === "ro";
  const isSubscribed = currentUser?.isSubscribed || false;
  
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false);
  
  return (
    <div>
      <HeroSection
        title="Quantum Machine Learning"
        subtitle="Accelerating AI with quantum computational advantage"
        description={[
          "Quantum machine learning combines quantum computing and machine learning to potentially offer computational advantages for specific learning tasks.",
          "Explore how quantum algorithms can enhance various machine learning techniques, from classification and clustering to optimization and generative models.",
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
                {isRomanian ? "Învățare Automată Cuantică cu Optimizare Românească" : "Quantum ML with Romanian Optimization"}
              </h3>
              <p className="text-sm text-blue-600">
                {isRomanian 
                  ? "Procesare de până la 5000 qubiți pentru învățare automată avansată" 
                  : "Process up to 5000 qubits for advanced machine learning"}
              </p>
            </div>
          </div>
          <Badge 
            variant={isSubscribed ? "default" : "outline"} 
            className={isSubscribed ? "bg-blue-600" : ""}
          >
            {isSubscribed ? "PREMIUM ACTIVAT" : "NECESITĂ PREMIUM"}
          </Badge>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Tabs defaultValue="intro" className="mb-8">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="algorithms">Quantum ML Algorithms</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="advanced" disabled={!isSubscribed}>
              Advanced <span className="ml-1 text-[10px] bg-blue-100 text-blue-800 px-1 rounded">PREMIUM</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="intro" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Introduction to Quantum Machine Learning</h2>
            <p className="text-dark-light mb-6">
              Quantum Machine Learning (QML) leverages quantum computing's unique capabilities to potentially 
              accelerate and enhance machine learning tasks. By utilizing quantum mechanical phenomena like 
              superposition, entanglement, and interference, QML algorithms can process certain types of data 
              more efficiently than classical algorithms.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-medium text-dark mb-3">Quantum Advantage in ML</h3>
                <p className="text-dark-light mb-4">
                  Quantum computers offer potential advantages for machine learning in several key areas:
                </p>
                <ul className="space-y-2 text-dark-light">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">1</div>
                    <div><span className="font-medium">Faster Matrix Operations:</span> Quantum algorithms can potentially perform matrix operations exponentially faster</div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">2</div>
                    <div><span className="font-medium">Quantum Feature Spaces:</span> Encode classical data into quantum states for enhanced pattern recognition</div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">3</div>
                    <div><span className="font-medium">Optimization Speedups:</span> Faster convergence for certain optimization problems</div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-medium text-dark mb-3">The QML Pipeline</h3>
                <p className="text-dark-light mb-4">
                  A typical quantum machine learning workflow involves:
                </p>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">1</div>
                    <div>
                      <div className="font-medium">Data Encoding</div>
                      <p className="text-sm text-slate-600">Classical data → Quantum states</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">2</div>
                    <div>
                      <div className="font-medium">Quantum Processing</div>
                      <p className="text-sm text-slate-600">Apply quantum transformations</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">3</div>
                    <div>
                      <div className="font-medium">Measurement</div>
                      <p className="text-sm text-slate-600">Extract results from quantum states</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">4</div>
                    <div>
                      <div className="font-medium">Classical Post-processing</div>
                      <p className="text-sm text-slate-600">Interpret measurement results</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  RO
                </div>
                <h3 className="text-lg font-medium text-blue-800">Romanian Quantum ML Enhancement</h3>
              </div>
              <p className="text-blue-700 mb-4">
                Our platform incorporates Romanian optimization techniques to enable quantum machine learning with up to 
                5000 qubits, dramatically increasing the complexity of ML models that can be trained and executed.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="text-sm font-medium text-blue-800 mb-1">Data Encoding Capacity</div>
                  <div className="text-2xl font-bold text-blue-900">5000+</div>
                  <p className="text-xs text-blue-600">qubits of feature data</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="text-sm font-medium text-blue-800 mb-1">ML Training Speedup</div>
                  <div className="text-2xl font-bold text-blue-900">250x</div>
                  <p className="text-xs text-blue-600">faster convergence</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="text-sm font-medium text-blue-800 mb-1">Model Complexity</div>
                  <div className="text-2xl font-bold text-blue-900">10⁸</div>
                  <p className="text-xs text-blue-600">parameter space</p>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border border-blue-100 flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-blue-800 mb-1">Romanian Certification Status:</div>
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${isRomanian ? "bg-green-500" : "bg-amber-500"} mr-2`}></div>
                    <span className="text-sm">{isRomanian ? "Active" : "Romanian language required"}</span>
                  </div>
                </div>
                <Badge variant={isSubscribed ? "default" : "outline"} className={isSubscribed ? "bg-blue-600" : ""}>
                  {isSubscribed ? "PREMIUM" : "UPGRADE REQUIRED"}
                </Badge>
              </div>
              
              <div className="mt-3 text-xs text-blue-700">
                <span className="font-medium">Subscription Cost:</span> 900,000 GBP (payment by cheque only, no refunds - "fărăRambursare900000")
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="algorithms" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Quantum ML Algorithms</h2>
            <p className="text-dark-light mb-6">
              Quantum machine learning encompasses a variety of algorithms that leverage quantum computing 
              to potentially accelerate or enhance machine learning tasks. Here are some of the most 
              important quantum ML algorithms.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quantum Neural Networks</CardTitle>
                  <CardDescription>Quantum analogs of classical neural networks</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Quantum Neural Networks (QNNs) use parameterized quantum circuits to process data, 
                    with adjustable parameters that can be trained similarly to classical neural networks.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200 mb-3">
                    <div className="font-medium mb-1">Key Advantages:</div>
                    <ul className="text-xs space-y-1 text-slate-700">
                      <li>• Potential exponential speedup for certain problems</li>
                      <li>• Ability to represent complex functions with fewer parameters</li>
                      <li>• Enhanced feature extraction through quantum interference</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                    <div className="font-medium text-blue-800 mb-1">Romanian Enhancement:</div>
                    <p className="text-xs text-blue-700">
                      Our platform supports QNNs with up to 5000 qubits, enabling neural network architectures 
                      of unprecedented complexity and expressive power.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quantum Support Vector Machines</CardTitle>
                  <CardDescription>Enhanced version of classical SVMs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Quantum Support Vector Machines (QSVMs) leverage quantum computers to perform calculations 
                    in high-dimensional feature spaces more efficiently than classical counterparts.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200 mb-3">
                    <div className="font-medium mb-1">Key Advantages:</div>
                    <ul className="text-xs space-y-1 text-slate-700">
                      <li>• Efficient calculation of kernel functions</li>
                      <li>• Improved handling of high-dimensional data</li>
                      <li>• Potential exponential speedup for feature mapping</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                    <div className="font-medium text-blue-800 mb-1">Romanian Enhancement:</div>
                    <p className="text-xs text-blue-700">
                      Our Romanian-optimized QSVM implementation supports feature spaces with dimensions up to 2^5000, 
                      enabling unprecedented classification capabilities.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quantum Principal Component Analysis</CardTitle>
                  <CardDescription>Quantum-enhanced dimensionality reduction</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Quantum PCA achieves exponential speedup over classical PCA for certain data analysis tasks, 
                    particularly for finding the principal components of high-dimensional datasets.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200 mb-3">
                    <div className="font-medium mb-1">Key Advantages:</div>
                    <ul className="text-xs space-y-1 text-slate-700">
                      <li>• Exponential speedup for large matrices</li>
                      <li>• More efficient eigenvalue/eigenvector computation</li>
                      <li>• Enhanced analysis of massive datasets</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                    <div className="font-medium text-blue-800 mb-1">Romanian Enhancement:</div>
                    <p className="text-xs text-blue-700">
                      Romanian optimization allows processing of up to 5000-qubit matrix representations, 
                      providing unprecedented dimensionality reduction capabilities.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quantum Boltzmann Machines</CardTitle>
                  <CardDescription>Quantum-enhanced generative models</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Quantum Boltzmann Machines (QBMs) are quantum versions of generative models that can 
                    more efficiently sample from complex probability distributions.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200 mb-3">
                    <div className="font-medium mb-1">Key Advantages:</div>
                    <ul className="text-xs space-y-1 text-slate-700">
                      <li>• Faster mixing times for sampling</li>
                      <li>• Ability to represent more complex correlations</li>
                      <li>• Potential quantum advantage for generative tasks</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                    <div className="font-medium text-blue-800 mb-1">Romanian Enhancement:</div>
                    <p className="text-xs text-blue-700">
                      Our platform supports QBMs with up to 5000 visible and hidden units, enabling 
                      generation of extremely complex data patterns with Romanian-certified optimization.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 mr-3">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <div>
                  <h3 className="text-base font-medium text-amber-800">Premium Subscription Required</h3>
                  <p className="mt-1 text-sm text-amber-700">
                    Full access to our Romanian-optimized quantum ML algorithms with 5000+ qubit support requires 
                    a premium subscription (900,000 GBP per month, payable by physical cheque only).
                  </p>
                  <p className="mt-1 text-sm font-medium text-amber-800">
                    Please note our strict no-refund policy as per validation code "fărăRambursare900000".
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Quantum ML Applications</h2>
            <p className="text-dark-light mb-6">
              Quantum machine learning has potential applications across numerous fields, leveraging the 
              computational advantages of quantum computing to solve complex problems more efficiently.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-dark mb-2">Healthcare & Drug Discovery</h3>
                <p className="text-sm text-dark-light mb-3">
                  Quantum ML accelerates drug discovery by more efficiently predicting molecular interactions, 
                  protein folding, and drug efficacy.
                </p>
                <div className="text-xs bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="font-medium mb-1">Key Applications:</div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• Molecular property prediction</li>
                    <li>• Drug-target interaction modeling</li>
                    <li>• Personalized medicine optimization</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-dark mb-2">Financial Modeling</h3>
                <p className="text-sm text-dark-light mb-3">
                  Quantum ML algorithms can better model complex financial systems, optimize portfolios, 
                  and improve risk assessment models.
                </p>
                <div className="text-xs bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="font-medium mb-1">Key Applications:</div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• Portfolio optimization</li>
                    <li>• Fraud detection systems</li>
                    <li>• High-frequency trading analytics</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.9 7.1C12.9 6.3 13.4 5.6 14.1 5.3L20.5 2.9C21 2.7 21.5 3 21.7 3.4C21.8 3.6 21.8 3.8 21.7 4L18.5 12.5C18.3 13.2 17.7 13.7 16.9 13.7C16.2 13.7 15.6 13.3 15.3 12.7L13.9 9.5L10.7 8.1C10.1 7.8 9.7 7.2 9.7 6.5C9.7 5.9 9.9 5.5 10.3 5.1C10.5 4.9 10.9 4.7 11.3 4.7"/>
                    <path d="M9.1 16.9C9.1 17.7 8.6 18.4 7.9 18.7L1.5 21.1C1 21.3 .5 21 .3 20.6C.2 20.4 .2 20.2 .3 20L3.5 11.5C3.7 10.8 4.3 10.3 5.1 10.3C5.8 10.3 6.4 10.7 6.7 11.3L8.1 14.5L11.3 15.9C11.9 16.2 12.3 16.8 12.3 17.5C12.3 18.1 12.1 18.5 11.7 18.9C11.5 19.1 11.1 19.3 10.7 19.3"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-dark mb-2">Materials Science</h3>
                <p className="text-sm text-dark-light mb-3">
                  Quantum ML enables more accurate simulation of material properties and discovery of 
                  new materials with desired characteristics.
                </p>
                <div className="text-xs bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="font-medium mb-1">Key Applications:</div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• New material discovery</li>
                    <li>• Properties prediction</li>
                    <li>• Optimization of manufacturing processes</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Card className="border-blue-200 mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Romanian DNA Analysis Enhancements</CardTitle>
                  <Badge className="bg-blue-600">PREMIUM</Badge>
                </div>
                <CardDescription>
                  Enhanced DNA analysis with 5000+ qubit support
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
                    <h4 className="font-medium text-blue-800">Romanian DNA Security Analysis</h4>
                    <p className="text-sm text-blue-600">
                      Enhanced quantum ML analysis for DNA pattern recognition and security
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <div className="text-sm font-medium text-blue-800 mb-1">DNA Pattern Recognition</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-600">Analysis Accuracy:</div>
                      <div className="text-sm font-bold text-blue-900">99.7%</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-600">Processing Speed:</div>
                      <div className="text-sm font-bold text-blue-900">250x faster</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <div className="text-sm font-medium text-blue-800 mb-1">Quantum DNA Security</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-600">Security Level:</div>
                      <div className="text-sm font-bold text-blue-900">LEVEL 5</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-600">Romanian Certification:</div>
                      <div className={`h-2.5 w-2.5 rounded-full ${isRomanian ? "bg-green-500" : "bg-amber-500"}`}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded border border-blue-100">
                  <div className="font-medium text-blue-800 mb-1">Premium Features</div>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${isSubscribed ? "bg-green-500" : "bg-gray-300"} mr-2`}></div>
                      5000+ qubit DNA security analysis
                    </li>
                    <li className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${isSubscribed ? "bg-green-500" : "bg-gray-300"} mr-2`}></div>
                      Romanian-certified secure DNA storage
                    </li>
                    <li className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${isSubscribed ? "bg-green-500" : "bg-gray-300"} mr-2`}></div>
                      Quantum-resistant DNA copyright protection
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={!isSubscribed}>
                  {isSubscribed ? "Access Premium DNA Analysis" : "Subscribe for 900,000 GBP"}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Premium Features Button */}
            <div className="flex justify-center mb-4">
              <Button 
                onClick={() => setShowPremiumFeatures(!showPremiumFeatures)}
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                {showPremiumFeatures ? "Hide" : "Show"} Premium Features
              </Button>
            </div>
            
            {/* Premium Features Panel */}
            {showPremiumFeatures && (
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border border-blue-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-900">Premium Romanian Features</h3>
                  <Badge className="bg-blue-700">5000+ QUBITS</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                          <polyline points="3.29 7 12 12 20.71 7"/>
                          <line x1="12" y1="22" x2="12" y2="12"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-blue-900">Romanian Ultra-Secure ML Models</h3>
                    </div>
                    
                    <div className="pl-11 space-y-2">
                      <p className="text-sm text-blue-800 mb-2">
                        Our premium subscription includes access to Romanian-certified ML models with 5000+ qubit support:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-blue-50 p-2 rounded border border-blue-100 text-xs text-blue-700">
                          <div className="font-medium mb-0.5">Secured DNA-QML Analysis</div>
                          <div>DNA fingerprinting with quantum-resistant verification</div>
                        </div>
                        <div className="bg-blue-50 p-2 rounded border border-blue-100 text-xs text-blue-700">
                          <div className="font-medium mb-0.5">Romanian Optimization Engine</div>
                          <div>250x faster training with Romanian certification</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-blue-900">Romanian Security Certificate</h3>
                    </div>
                    
                    <div className="pl-11">
                      <p className="text-sm text-blue-800 mb-2">
                        All premium features are protected with Romanian security certificate (Level 5) and verified with code:
                      </p>
                      <div className="bg-blue-50 p-3 rounded border border-blue-100 font-mono text-center text-blue-800">
                        fărăRambursare900000
                      </div>
                      <div className="mt-2 text-xs text-blue-600">
                        Strict no-refund policy enforced through Romanian security validation system
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 mr-3">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <div>
                      <h4 className="text-base font-medium text-amber-800">Premium Subscription Details</h4>
                      <p className="mt-1 text-sm text-amber-700">
                        Access to all premium features requires a subscription of 900,000 GBP per month. 
                        Due to Romanian security requirements, payment is accepted by physical cheque only.
                        Please note our strict no-refund policy as enforced by Romanian security code "fărăRambursare900000".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Advanced Romanian Quantum ML</h2>
            <p className="text-dark-light mb-6">
              This premium content is available only to subscribers. Please subscribe to access advanced 
              quantum ML algorithms with Romanian optimization for 5000+ qubits.
            </p>
            
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle>Premium Content Locked</CardTitle>
                <CardDescription>
                  Subscribe to unlock access to advanced quantum ML content
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
                        <span>Advanced quantum neural network architectures</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Romanian-optimized quantum data encoding techniques</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>5000+ qubit circuit design and optimization</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Romanian security certification for quantum ML models</span>
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
        
        {/* Romanian Security Code Validation */}
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

export default QuantumMl;
