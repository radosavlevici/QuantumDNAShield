import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TestVisibilityBanner from "./TestVisibilityBanner";
import { useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [location] = useLocation();
  const showTestBanner = location !== "/test-dashboard"; // Nu arătăm bannerul pe pagina de test
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      {showTestBanner && <TestVisibilityBanner />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
