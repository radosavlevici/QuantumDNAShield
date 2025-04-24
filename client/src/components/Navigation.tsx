import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

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
    { path: "/test-dashboard", label: "Test Dashboard", badge: "TOATE FUNCȚIONALITĂȚILE" },
  ];

  return (
    <>
      {navItems.map((item) => (
        <Link key={item.path} href={item.path}>
          <div className="flex items-center">
            <span
              className={`${
                currentPath === item.path
                  ? "text-primary font-medium"
                  : "text-dark-light hover:text-primary"
              } transition cursor-pointer`}
              onClick={onNavClick}
            >
              {item.label}
            </span>
            {item.badge && (
              <Badge className="ml-2 bg-purple-600 text-[8px] py-0 h-auto">
                {item.badge}
              </Badge>
            )}
          </div>
        </Link>
      ))}
    </>
  );
};

export default Navigation;
