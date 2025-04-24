import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/languageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Resources = () => {
  const { currentUser, currentLanguage } = useLanguage();
  const isRomanian = currentLanguage === "ro";
  const isSubscribed = currentUser?.isSubscribed || false;
  
  return (
    <div>
      <HeroSection
        title="Resources"
        subtitle="Educational materials to enhance your quantum computing knowledge"
        description={[
          "Explore our curated collection of quantum computing resources, references, and learning materials.",
          "Whether you're a beginner or an advanced learner, find the right resources to deepen your understanding of quantum algorithms and their applications.",
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
                {isRomanian ? "Resurse Premium cu Certificare Românească" : "Premium Resources with Romanian Certification"}
              </h3>
              <p className="text-sm text-blue-600">
                {isRomanian 
                  ? "Materiale exclusive pentru optimizarea platformelor cuantice de 5000+ qubiți" 
                  : "Exclusive materials for 5000+ qubit quantum platform optimization"}
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
        <Tabs defaultValue="documentation" className="mb-8">
          <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="materials">Learning Materials</TabsTrigger>
            <TabsTrigger value="premium" disabled={!isSubscribed}>
              Premium <span className="ml-1 text-[10px] bg-blue-100 text-blue-800 px-1 rounded">PREMIUM</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="documentation" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Documentation</h2>
            <p className="text-dark-light mb-6">
              Access comprehensive documentation for the Quantum DNA Platform, including guides on quantum 
              algorithms, DNA security, and Romanian optimization techniques.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Documentation</CardTitle>
                  <CardDescription>Core platform features and usage guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Getting Started Guide</div>
                        <p className="text-sm text-gray-600">Basic introduction to the Quantum DNA Platform</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">API Reference</div>
                        <p className="text-sm text-gray-600">Detailed API documentation for developers</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Quantum Algorithm Library</div>
                        <p className="text-sm text-gray-600">Documentation for all implemented quantum algorithms</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Access Documentation</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Romanian Security Documentation</CardTitle>
                  <CardDescription>Romanian security certification and features</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Security Certification Guide</div>
                        <p className="text-sm text-gray-600">Understanding Romanian security levels</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Key Rotation System</div>
                        <p className="text-sm text-gray-600">Documentation on the 3-tier visibility system</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5.2 19.1-1.4 1.3c-.6.7-1.4 1.5-2.2 2.3l3.8-12-3.8-8.3 3.8 1 3.7-2.1 3.7 2.1 3.8-1-3.8 8.3 3.8 12-2.2-2.3-1.4-1.3" />
                          <path d="m13.9 19.1 1.4 1.3c.6.7 1.4 1.5 2.2 2.3" />
                          <path d="M8 12h8" />
                          <path d="m13.1 7.9 3.4-3.4" />
                          <path d="M10.5 7.9 7.1 4.5" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">DNA Copyright Protection</div>
                        <p className="text-sm text-gray-600">Guide to Romanian-certified DNA watermarking</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Security Documentation</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  RO
                </div>
                <h3 className="text-lg font-medium text-blue-800">Romanian Certification Documentation</h3>
              </div>
              <p className="text-blue-700 mb-4">
                Access detailed documentation about our Romanian security certification and the 5000+ qubit 
                optimization techniques used throughout the platform.
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-blue-100 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-blue-800">Security Certification Levels</div>
                  <Badge className="bg-blue-600">LEVEL 5</Badge>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2 text-xs font-medium">1</div>
                    <span>Basic security for public data</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-2 text-xs font-medium">2</div>
                    <span>Enhanced encryption for shared data</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2 text-xs font-medium">3</div>
                    <span>Public key security certification (standard)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs font-medium">4</div>
                    <span>Advanced quantum-resistant protocols</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs font-medium">5</div>
                    <span>Private key Romanian certification (maximum)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-blue-100">
                <div className="font-medium text-blue-800 mb-2">Key Visibility System</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-2 rounded border border-slate-200 text-sm">
                    <div className="font-medium">HIDDEN</div>
                    <p className="text-xs text-slate-600">No visibility of sensitive key material</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-200 text-sm">
                    <div className="font-medium">PARTIAL</div>
                    <p className="text-xs text-slate-600">Limited visibility with key prefix only</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-200 text-sm">
                    <div className="font-medium">FULL</div>
                    <p className="text-xs text-slate-600">Complete visibility (administrators only)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-center text-blue-700">
                <div className="mb-1">Romanian security validation code:</div>
                <code className="bg-white px-2 py-1 rounded border border-blue-100 font-mono">
                  fărăRambursare900000
                </code>
                <div className="mt-1">Strict no-refund policy enforced through Romanian certification</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="materials" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Learning Materials</h2>
            <p className="text-dark-light mb-6">
              Explore our collection of learning materials to enhance your understanding of quantum computing, 
              algorithms, and DNA security concepts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21H7a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
                      <path d="M17 17h4"></path>
                      <path d="M17 13h4"></path>
                      <path d="M17 9h4"></path>
                      <path d="M7 8h6"></path>
                      <path d="M7 12h6"></path>
                      <path d="M7 16h6"></path>
                    </svg>
                  </div>
                  <CardTitle>Tutorials</CardTitle>
                  <CardDescription>Step-by-step learning guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="border-b border-gray-100 pb-2">
                      <div className="font-medium">Introduction to Quantum Computing</div>
                      <p className="text-xs text-gray-600">Fundamentals of quantum mechanics and computation</p>
                    </li>
                    <li className="border-b border-gray-100 pb-2">
                      <div className="font-medium">Working with Quantum Circuits</div>
                      <p className="text-xs text-gray-600">Building and simulating quantum circuits</p>
                    </li>
                    <li className="border-b border-gray-100 pb-2">
                      <div className="font-medium">DNA Security Fundamentals</div>
                      <p className="text-xs text-gray-600">Understanding DNA data protection</p>
                    </li>
                    <li>
                      <div className="font-medium">Romanian Optimization Techniques</div>
                      <p className="text-xs text-gray-600">5000+ qubit performance optimization</p>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Browse Tutorials</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <CardTitle>Video Courses</CardTitle>
                  <CardDescription>Comprehensive video learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="border-b border-gray-100 pb-2">
                      <div className="font-medium">Quantum Algorithms Masterclass</div>
                      <p className="text-xs text-gray-600">10-part video series on quantum algorithms</p>
                    </li>
                    <li className="border-b border-gray-100 pb-2">
                      <div className="font-medium">DNA Security Workshop</div>
                      <p className="text-xs text-gray-600">Hands-on DNA data protection techniques</p>
                    </li>
                    <li className="border-b border-gray-100 pb-2">
                      <div className="font-medium">Quantum Machine Learning</div>
                      <p className="text-xs text-gray-600">Video course on quantum ML implementation</p>
                    </li>
                    <li>
                      <div className="font-medium">Romanian Certification Guide</div>
                      <p className="text-xs text-gray-600">Security certification procedures</p>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Access Video Courses</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <CardTitle>Interactive Labs</CardTitle>
                  <CardDescription>Hands-on learning experiences</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="border-b border-gray-100 pb-2">
                      <div className="font-medium">Quantum Circuit Designer</div>
                      <p className="text-xs text-gray-600">Interactive quantum circuit builder</p>
                    </li>
                    <li className="border-b border-gray-100 pb-2">
                      <div className="font-medium">DNA Protection Simulator</div>
                      <p className="text-xs text-gray-600">Test DNA security protocols</p>
                    </li>
                    <li className="border-b border-gray-100 pb-2">
                      <div className="font-medium">Quantum Algorithm Visualizer</div>
                      <p className="text-xs text-gray-600">See quantum algorithms in action</p>
                    </li>
                    <li>
                      <div className="font-medium">5000+ Qubit Simulator</div>
                      <p className="text-xs text-gray-600">High-performance quantum simulation</p>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Launch Interactive Labs</Button>
                </CardFooter>
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
                  <h3 className="text-base font-medium text-amber-800">Premium Learning Resources</h3>
                  <p className="mt-1 text-sm text-amber-700">
                    Full access to all advanced learning materials requires a premium subscription (900,000 GBP per month, 
                    payable by physical cheque only). Please note our strict no-refund policy as per Romanian security 
                    code "fărăRambursare900000".
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="premium" className="space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">Premium Resources</h2>
            <p className="text-dark-light mb-6">
              This premium content is available only to subscribers. Please subscribe to access our exclusive 
              resources with Romanian optimization for 5000+ qubits.
            </p>
            
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle>Premium Content Locked</CardTitle>
                <CardDescription>
                  Subscribe to unlock access to exclusive premium resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-md border border-amber-200">
                    <h3 className="font-medium text-amber-800 mb-2">Premium Resources Include:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Advanced Romanian optimization techniques for 5000+ qubits</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Exclusive Romanian-certified security documentation</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Premium quantum algorithm implementations</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-0.5">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Romanian-optimized DNA security modules</span>
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

export default Resources;
