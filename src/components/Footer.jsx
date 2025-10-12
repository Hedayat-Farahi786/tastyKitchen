"use client";

import { Footer as FooterComponent } from "flowbite-react";
import logo from "../assets/logo.png";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <FooterComponent className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <FooterComponent.Brand
              alt="Tasty Kitchen Logo"
              href="#home"
              src={logo}
            />
            <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-md">
              Münchens beliebtestes Restaurant für köstliche Gerichte und
              erstklassigen Service. Seit Jahren bringen wir Geschmack und
              Qualität auf Ihren Tisch.
            </p>
            {/* Social Media */}
            <div className="mt-6 flex items-center space-x-4">
              <p className="text-sm font-semibold text-gray-700">
                Folgen Sie uns:
              </p>
              <div className="flex space-x-3">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <BsInstagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <BsFacebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <BsTwitter className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Schnelllinks
            </h3>
            <FooterComponent.LinkGroup col className="space-y-3">
              <FooterComponent.Link
                href="#home"
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                Startseite
              </FooterComponent.Link>
              <FooterComponent.Link
                href="#menu-section"
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                Menü
              </FooterComponent.Link>
              <FooterComponent.Link
                href="/products"
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                Alle Produkte
              </FooterComponent.Link>
              <FooterComponent.Link
                href="#contact-section"
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                Kontakt
              </FooterComponent.Link>
            </FooterComponent.LinkGroup>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-gray-600 text-sm">
                  München, Deutschland
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span className="text-gray-600 text-sm">
                  info@tastykitchen.de
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <span className="text-gray-600 text-sm">089 3148784</span>
              </div>
            </div>
          </div>
        </div>

        <FooterComponent.Divider />

        <div className="flex flex-col md:flex-row items-center justify-between pt-6">
          <FooterComponent.Copyright
            by="Tasty Kitchen™"
            href="#"
            year={new Date().getFullYear()}
            className="text-gray-600"
          />
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Datenschutz
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              AGB
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Impressum
            </a>
          </div>
        </div>
      </div>
    </FooterComponent>
  );
}
