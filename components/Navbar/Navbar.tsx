"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services", hasDropdown: false },
    { name: "Projects", href: "/projects" },
    { name: "Teams", href: "/teams" },
    { name: "Insights", href: "/insights" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full pt-6 px-4 z-50">
      <div className="max-w-[1440px] mx-auto rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 px-6 py-3 flex items-center justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.40)]">
        {/* Logo wrapped inside a safe Link system to always point directly home */}
        <Link
          href="/"
          className="flex items-center cursor-pointer transition-opacity hover:opacity-95"
        >
          <Image
            src="/logo/logo.png"
            alt="REDCon Ltd. Logo"
            width={160}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links with Pathname Mapping Context */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <div
                key={link.name}
                className="relative flex flex-col items-center group"
              >
                <Link
                  href={link.href}
                  className={`text-white text-[14px] font-semibold leading-[20px] tracking-[0.35px] hover:text-green-400 transition-all py-1 flex items-center gap-1 ${
                    isActive
                      ? "underline underline-offset-[12px] decoration-[3px] decoration-[#16A34A]"
                      : ""
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <svg
                      className="w-3 h-3 text-white/77 group-hover:text-green-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Get in Touch Button (Desktop) */}
        <div className="hidden md:block">
          <button
            className="flex items-center gap-3 pl-5 pr-1 py-1 rounded-full text-white text-[14px] font-semibold leading-[20px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] transition-all hover:opacity-90 cursor-pointer"
            style={{
              background:
                "linear-gradient(270deg, rgba(0, 151, 56, 0.40) 0%, rgba(255, 0, 0, 0.40) 100%)",
            }}
          >
            <span>Get in Touch</span>
            <div className="w-9 h-9 rounded-full border-[0.5px] border-[rgba(244,206,205,0.80)] bg-[#16A34A] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Module */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none cursor-pointer transition-transform duration-200 active:scale-95"
            aria-label="Toggle navigation menu layer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Upgraded Mobile Navigation Overlay System using dynamic css layouts */}
      <div
        className={`md:hidden absolute top-24 left-4 right-4 bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[16px] font-semibold tracking-[0.35px] py-2 border-b border-white/5 transition-colors ${
                isActive ? "text-[#16A34A]" : "text-white hover:text-green-400"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          );
        })}

        <button
          className="mt-4 flex items-center justify-between px-5 py-2.5 rounded-full text-white text-[14px] font-semibold cursor-pointer"
          style={{
            background:
              "linear-gradient(270deg, rgba(0, 151, 56, 0.40) 0%, rgba(255, 0, 0, 0.40) 100%)",
          }}
          onClick={() => setIsOpen(false)}
        >
          <span>Get in Touch</span>
          <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
