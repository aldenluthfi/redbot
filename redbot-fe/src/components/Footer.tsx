import { Heart, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-white">RED Project Indonesia</span>
            </div>
            <p className="text-gray-400 mb-6">
              A social initiative focused on gender equality, reproductive health, and the empowerment of women and children.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/redproject.idn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 6.334 0 5.926 0 5c0 3.126 0 3.748.072 5.052.2 4.45 2.614 6.235 6.981 6.235 3.333 0 3.748-.014 5.052-.072 4.444-.2 6.783-2.778 6.979-6.98.058-.335.072-.743.072-5.052 0-3.126-.014-3.748-.072-5.052-.196-4.354-2.773-6.781-6.979-6.981C15.748.014 15.333 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="mailto:contact@edproject.idn"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-400 hover:text-white transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#impact" className="text-gray-400 hover:text-white transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#get-involved" className="text-gray-400 hover:text-white transition-colors">
                  Get Involved
                </a>
              </li>
            </ul>
          </div>

          {/* Our Values */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Values</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Respect</span>
              </li>
              <li>
                <span className="text-gray-400">Educate</span>
              </li>
              <li>
                <span className="text-gray-400">Divert</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Indonesia</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-red-500" />
                <a href="mailto:contact@edproject.idn" className="hover:text-white transition-colors">
                  contact@edproject.idn
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 6.334 0 5.926 0 5c0 3.126 0 3.748.072 5.052.2 4.45 2.614 6.235 6.981 6.235 3.333 0 3.748-.014 5.052-.072 4.444-.2 6.783-2.778 6.979-6.98.058-.335.072-.743.072-5.052 0-3.126-.014-3.748-.072-5.052-.196-4.354-2.773-6.781-6.979-6.981C15.748.014 15.333 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                <a
                  href="https://www.instagram.com/redproject.idn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @redproject.idn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 RED Project Indonesia. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Operating with values of Respect, Educate, and Divert
          </p>
        </div>
      </div>
    </footer>
  );
}
