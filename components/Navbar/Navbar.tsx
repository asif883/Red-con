
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

// TypeScript Types
type SubLink = {
  name: string;
  href: string;
};

type NavLink = {
  name: string;
  href: string;
  subLinks?: SubLink[];
};

// Navigation Links
const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "About REDCon",
    href: "/about-us",
    subLinks: [
      { name: "Our Story", href: "/about-us#our-story" },
      { name: "Mission & Vision", href: "/about-us#mission-vision" },
      { name: "Our Approach", href: "/about-us#our-approach" },
      { name: "Why REDCon", href: "/about-us#why-redcon" },
    ],
  },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Teams", href: "/teams" },
  { name: "Insights", href: "/insights" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Stores the currently active submenu
  const [currentSubmenu, setCurrentSubmenu] =
    useState<NavLink | null>(null);

  const pathname = usePathname();

  // Open Main Menu
  const openMenu = () => {
    setIsOpen(true);
    setCurrentSubmenu(null);
  };

  // Close Entire Menu
  const closeMenu = () => {
    setIsOpen(false);
    setCurrentSubmenu(null);
  };

  // Open Submenu
  const openSubmenu = (link: NavLink) => {
    setCurrentSubmenu(link);
  };

  // Back to Main Menu
  const goBack = () => {
    setCurrentSubmenu(null);
  };

  return (
    <>
      {/* ================= MAIN NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 w-full pt-6 px-4 z-50">
        <div className="relative max-w-[1440px] mx-auto rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.40)]">

          {/* Left: Hamburger */}
          <button
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            className="flex items-center justify-center text-white cursor-pointer transition-opacity hover:opacity-70"
          >
            <Menu className="w-6 h-6" strokeWidth={1.8} />
          </button>

          {/* Center: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo/logo.png"
              alt="REDCon Ltd. Logo"
              width={160}
              height={40}
              className="object-contain w-[120px] sm:w-[200px]"
              priority
            />
          </Link>

          {/* Right: Get in Touch */}
          <Link
            href="/contact"
            className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-5 pr-1 py-1 rounded-full text-black text-[12px] sm:text-[14px] font-semibold leading-[20px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] transition-all hover:opacity-90"
            style={{
              background:
                "linear-gradient(270deg, #ffffff 0%, #00a63e 100%)",
            }}
          >
            <span>Get in Touch</span>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[0.5px] border-[rgba(22,163,74,0.80)] bg-[#16A34A] flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </Link>
        </div>
      </nav>

      {/* ================= MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ease-in-out ${
          isOpen
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none"
        }`}
      >
        {/* Background Overlay */}
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ================= MENU PANEL ================= */}
        <div
          className={`absolute top-0 left-0 h-full w-full sm:w-[380px] bg-black border-r border-white/10 shadow-2xl overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="absolute top-8 right-6 sm:right-8 z-30">
            <button
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-[12px] font-medium">
                Close
              </span>

              <X className="w-4 h-4" strokeWidth={1.8} />
            </button>
          </div>

          {/* ================= MAIN MENU ================= */}
          <div
            className={`absolute inset-0 flex flex-col px-6 sm:px-8 pt-24 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              currentSubmenu
                ? "-translate-x-full opacity-0 pointer-events-none"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div className="flex flex-col">
              {navLinks.map((link, index) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" &&
                    pathname.startsWith(link.href));

                const hasSubmenu =
                  Boolean(link.subLinks?.length);

                return (
                  <div
                    key={link.name}
                    style={{
                      transitionDelay:
                        isOpen && !currentSubmenu
                          ? `${index * 60 + 100}ms`
                          : "0ms",
                    }}
                    className={`transition-all duration-500 ${
                      isOpen && !currentSubmenu
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                    }`}
                  >
                    {/* Link With Submenu */}
                    {hasSubmenu ? (
                      <button
                        onClick={() => openSubmenu(link)}
                        className="w-full flex items-center justify-between py-3 border-b border-white/10 text-left group cursor-pointer"
                      >
                        <span
                          className={`text-[17px] sm:text-[18px] font-medium transition-colors ${
                            isActive
                              ? "text-[#16A34A]"
                              : "text-white group-hover:text-[#16A34A]"
                          }`}
                        >
                          {link.name}
                        </span>

                        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#16A34A] transition-colors" />
                      </button>
                    ) : (
                      /* Normal Navigation Link */
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center justify-between py-3 border-b border-white/10 group"
                      >
                        <span
                          className={`text-[17px] sm:text-[18px] font-medium transition-colors ${
                            isActive
                              ? "text-[#16A34A]"
                              : "text-white group-hover:text-[#16A34A]"
                          }`}
                        >
                          {link.name}
                        </span>

                        <ArrowUpRight
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? "text-[#16A34A]"
                              : "text-white/40 group-hover:text-[#16A34A]"
                          }`}
                        />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= ABOUT US SUBMENU ================= */}
          <div
            className={`absolute inset-0 flex flex-col px-6 sm:px-8 pt-24 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              currentSubmenu
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            {/* Back Button */}
            <button
              onClick={goBack}
              className={`flex items-center gap-2 text-white/60 hover:text-[#16A34A] transition-all duration-500 cursor-pointer w-fit mb-8 ${
                currentSubmenu
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: currentSubmenu ? "100ms" : "0ms",
              }}
            >
              <ArrowLeft className="w-4 h-4" />

              <span className="text-[13px] font-medium">
                Back
              </span>
            </button>

            {/* Submenu Heading */}
            <h2
              className={`text-[20px] sm:text-[22px] font-medium text-white mb-5 transition-all duration-500 ${
                currentSubmenu
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: currentSubmenu ? "180ms" : "0ms",
              }}
            >
              {currentSubmenu?.name}
            </h2>

            {/* Submenu Links */}
            <div className="flex flex-col">
              {currentSubmenu?.subLinks?.map((subLink, index) => (
                <Link
                  key={subLink.name}
                  href={subLink.href}
                  onClick={closeMenu}
                  style={{
                    transitionDelay: currentSubmenu
                      ? `${index * 70 + 250}ms`
                      : "0ms",
                  }}
                  className={`group flex items-center justify-between py-3 border-b border-white/10 transition-all duration-500 ${
                    currentSubmenu
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                >
                  <span className="text-[14px] sm:text-[15px] font-medium text-white/70 group-hover:text-[#16A34A] transition-colors">
                    {subLink.name}
                  </span>

                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#16A34A] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
