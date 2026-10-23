"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const footerLinks = {
  Products: ["Engine Oils", "Transmission Fluids", "Coolants", "Greases"],
  Company: ["About TAF", "Our Story", "Careers", "Press"],
  Support: ["Contact Us", "FAQ", "Distributors", "MSDS Sheets"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-12 border-t border-orange-primary/30 bg-slate-950/95 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-orange-primary/15 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-orange-primary/50 shadow-md">
                <Image
                  src="/taf-logo.jpg"
                  alt="TAF Energies"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-white font-black text-xl">TAF</div>
                <div className="text-orange-400 font-bold text-[10px] tracking-[0.25em] uppercase">
                  Energies PLC
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
              Premium lubricants engineered for endurance. Protecting gasoline and high-mileage engines worldwide.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {["twitter", "linkedin", "instagram", "facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-900/80 flex items-center justify-center text-slate-300 hover:text-white hover:border-orange-primary hover:bg-orange-primary/20 transition-all"
                >
                  <span className="text-xs uppercase font-extrabold">
                    {social.charAt(0).toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-300 text-sm font-medium hover:text-orange-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold text-base mb-1">
                Stay in the loop with TAF Energies
              </h4>
              <p className="text-slate-300 text-sm">
                Receive the latest engineering bulletins, oil specs, and distributor promotions.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your corporate email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-orange-primary transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-orange-primary to-orange-light hover:brightness-110 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/30 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs font-medium">
            © 2024 TAF Energies PLC. All rights reserved. Made in UAE.
          </p>
          <p className="text-orange-400 text-xs font-semibold">
            API SM/CF Certified · ISO 9001:2015 · Engineered in United Arab Emirates 🇦🇪
          </p>
        </div>
      </div>
    </footer>
  );
}
