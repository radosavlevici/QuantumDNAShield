import HeroSection from "@/components/HeroSection";

const DnaSecurity = () => {
  return (
    <div>
      <HeroSection
        title="DNA Security"
        subtitle="Protecting genomic data with quantum-secure algorithms"
        description={[
          "DNA sequencing technologies have advanced rapidly, creating new opportunities and challenges for data security and privacy.",
          "Learn how quantum algorithms can be applied to enhance the security of DNA databases, enable privacy-preserving genomic analysis, and create tamper-proof authentication mechanisms.",
        ]}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-dark mb-4">Coming Soon</h2>
          <p className="text-dark-light">
            The DNA Security section is currently under development. Please check back later for detailed explanations of quantum-enhanced DNA security techniques.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DnaSecurity;
