import HeroSection from "@/components/HeroSection";

const Resources = () => {
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-dark mb-4">Coming Soon</h2>
          <p className="text-dark-light">
            The Resources section is currently under development. Please check back later for a comprehensive collection of learning materials, references, and tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
