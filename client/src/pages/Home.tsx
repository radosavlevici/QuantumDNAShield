import HeroSection from "@/components/HeroSection";

const Home = () => {
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-dark mb-3">Quantum Algorithms</h2>
            <p className="text-dark-light mb-4">
              Explore interactive demonstrations of quantum algorithms including Grover's search algorithm, Shor's factoring algorithm, and quantum phase estimation.
            </p>
            <a href="/quantum-algorithms" className="text-primary hover:text-primary/80 font-medium">
              Learn more →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-dark mb-3">Quantum Basics</h2>
            <p className="text-dark-light mb-4">
              Understand the fundamental principles of quantum mechanics that enable quantum computing, including superposition, entanglement, and quantum measurement.
            </p>
            <a href="/quantum-basics" className="text-primary hover:text-primary/80 font-medium">
              Learn more →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-dark mb-3">DNA Security</h2>
            <p className="text-dark-light mb-4">
              Discover how quantum algorithms can be applied to enhance DNA data security, privacy, and authentication in genomic databases and biomedical applications.
            </p>
            <a href="/dna-security" className="text-primary hover:text-primary/80 font-medium">
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
