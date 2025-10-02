import React from "react";
import Logo from "../../assets/Images/chain-arena-logo.jpg";
import Sponsor from "../../assets/Images/reef-pelagia-Photoroom.png";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src={Logo} alt="Chain Arena" className="h-8 w-auto" />
              <span className="text-xl font-bold text-white font-funnel">
                Chain Arena
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-inter">
              Chain Arena is the platform that brings Web2 games on-chain. We
              provide the infrastructure so teams don't need to rebuild from
              scratch.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide font-funnel">
              Product
            </h4>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  Get Started
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide font-funnel">
              Company
            </h4>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide font-funnel">
              Resources
            </h4>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-blue-600 transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sponsor Section */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <img src={Sponsor} alt="Sponsor Logo" className="h-22 w-auto" />
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Chain Arena. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              Discord
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
