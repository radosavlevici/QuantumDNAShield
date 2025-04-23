interface ApplicationDomain {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

const ApplicationDomains = () => {
  const domains: ApplicationDomain[] = [
    {
      icon: "shield-keyhole",
      title: "Cryptography",
      description: "Shor's algorithm threatens classical encryption methods like RSA, while enabling quantum key distribution for secure communication.",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      icon: "database-2",
      title: "Database Search",
      description: "Grover's algorithm provides quadratic speedup for searching unstructured databases, with applications in optimization and constraint satisfaction.",
      gradient: "from-secondary/10 to-secondary/5",
    },
    {
      icon: "flask",
      title: "Materials Science",
      description: "Quantum simulation algorithms can model complex quantum systems for designing new materials and pharmaceutical compounds.",
      gradient: "from-success/10 to-success/5",
    },
    {
      icon: "brain",
      title: "Machine Learning",
      description: "Quantum machine learning algorithms can potentially offer speedups for training and inference in specific ML tasks.",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      icon: "bank",
      title: "Finance",
      description: "Quantum algorithms can accelerate options pricing, portfolio optimization, and risk analysis in financial applications.",
      gradient: "from-secondary/10 to-secondary/5",
    },
    {
      icon: "route",
      title: "Optimization",
      description: "Quantum approximate optimization algorithms address complex combinatorial problems such as routing, scheduling, and resource allocation.",
      gradient: "from-success/10 to-success/5",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-dark mb-4">Application Domains for Quantum Algorithms</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain, index) => (
          <div key={index} className={`bg-gradient-to-br ${domain.gradient} p-4 rounded-lg`}>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-6 w-6 text-primary mr-2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {domain.icon === "shield-keyhole" && (
                  <>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </>
                )}
                {domain.icon === "database-2" && (
                  <>
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                  </>
                )}
                {domain.icon === "flask" && (
                  <>
                    <path d="M9 3h6v2H9z" />
                    <path d="M8 3h8a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                    <path d="M9 7v14" />
                    <path d="M15 7v14" />
                    <path d="M4 14h16" />
                    <path d="M4 18h16" />
                  </>
                )}
                {domain.icon === "brain" && (
                  <>
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-4.04Z" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-4.04Z" />
                  </>
                )}
                {domain.icon === "bank" && (
                  <>
                    <rect x="3" y="9" width="18" height="12" rx="1" />
                    <path d="M7 15h.01" />
                    <path d="M11 15h.01" />
                    <path d="M15 15h.01" />
                    <path d="M19 15h.01" />
                    <path d="M3 9l9-6 9 6" />
                  </>
                )}
                {domain.icon === "route" && (
                  <>
                    <circle cx="6" cy="19" r="3" />
                    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                    <circle cx="18" cy="5" r="3" />
                  </>
                )}
              </svg>
              <h4 className="font-medium text-dark">{domain.title}</h4>
            </div>
            <p className="text-sm text-dark-light">{domain.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDomains;
