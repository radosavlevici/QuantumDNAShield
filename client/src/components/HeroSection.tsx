interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string[];
}

const HeroSection = ({ title, subtitle, description }: HeroSectionProps) => {
  return (
    <section className="pb-12 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-dark mb-4">{title}</h1>
      <p className="text-xl text-dark-light mb-8">{subtitle}</p>
      
      {description && (
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-12">
          {description.map((paragraph, index) => (
            <p key={index} className="text-dark-light mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
