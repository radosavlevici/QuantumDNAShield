import { Link } from "wouter";

interface NavigationProps {
  currentPath: string;
  mobile?: boolean;
  onNavClick?: () => void;
}

const Navigation = ({ currentPath, mobile = false, onNavClick }: NavigationProps) => {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/quantum-basics", label: "Quantum Basics" },
    { path: "/quantum-algorithms", label: "Quantum Algorithms" },
    { path: "/dna-security", label: "DNA Security" },
    { path: "/quantum-ml", label: "Quantum ML" },
    { path: "/resources", label: "Resources" },
  ];

  return (
    <>
      {navItems.map((item) => (
        <Link key={item.path} href={item.path}>
          <a
            className={`${
              currentPath === item.path
                ? "text-primary font-medium"
                : "text-dark-light hover:text-primary"
            } transition`}
            onClick={onNavClick}
          >
            {item.label}
          </a>
        </Link>
      ))}
    </>
  );
};

export default Navigation;
