import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-400">© 2025 Ervin Remus Radosavlevici</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/terms">
              <a className="text-slate-400 hover:text-white transition">Terms</a>
            </Link>
            <Link href="/privacy">
              <a className="text-slate-400 hover:text-white transition">Privacy</a>
            </Link>
            <Link href="/contact">
              <a className="text-slate-400 hover:text-white transition">Contact</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
