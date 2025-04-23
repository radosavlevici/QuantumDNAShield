import HeroSection from "@/components/HeroSection";

const QuantumMl = () => {
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-dark mb-4">Coming Soon</h2>
          <p className="text-dark-light">
            The Quantum Machine Learning section is currently under development. Please check back later for detailed explanations and interactive demonstrations of quantum ML algorithms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuantumMl;
