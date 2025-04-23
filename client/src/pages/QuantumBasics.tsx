import HeroSection from "@/components/HeroSection";

const QuantumBasics = () => {
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-dark mb-4">Coming Soon</h2>
          <p className="text-dark-light">
            The Quantum Basics section is currently under development. Please check back later for detailed explanations of quantum computing fundamentals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuantumBasics;
