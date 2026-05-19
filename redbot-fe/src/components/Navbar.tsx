import { Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-white">RED Project Indonesia</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#programs" className="text-gray-400 hover:text-white transition-colors">
              Programs
            </a>
            <a href="#impact" className="text-gray-400 hover:text-white transition-colors">
              Impact
            </a>
            <a href="#get-involved" className="text-gray-400 hover:text-white transition-colors">
              Get Involved
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#get-involved"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-medium transition-colors"
            >
              Donate
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#programs" className="text-gray-400 hover:text-white transition-colors">
                Programs
              </a>
              <a href="#impact" className="text-gray-400 hover:text-white transition-colors">
                Impact
              </a>
              <a href="#get-involved" className="text-gray-400 hover:text-white transition-colors">
                Get Involved
              </a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
              <a
                href="#get-involved"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-medium transition-colors text-center mt-2"
              >
                Donate
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
