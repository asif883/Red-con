"use client";

import React, { useState } from "react";

const NewsLetter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed email address:", email);
    setEmail("");
  };

  return (
    <section className="w-full bg-[#050505] py-12 px-4 md:px-8 lg:px-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-[1440px] w-full flex flex-col gap-6">
        
        {/* TEXT CONTENT WRAPPER */}
        <div className="flex flex-col gap-2  ">
          {/* Main Header Typography with exact Gradient Clip specs */}
          <h2 className="text-white   font-bold text-[20px] leading-[28px] tracking-[-0.5px]">
            Sign up for{" "}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(0deg,#009738_0%,#009738_100%)]">
              our newsletter!
            </span>
          </h2>
          
          {/* Subtitle Body Typography */}
          <p className="text-white/70   font-medium text-[14px] leading-[20px]">
            Stay up to date with tips, trends and insights about engineering and infrastructure development.
          </p>
        </div>

        {/* INTERACTIVE FORM ROW SYSTEM */}
        <form 
          onSubmit={handleSubscribe}
          className="w-full flex flex-col sm:flex-row gap-4 items-stretch"
        >
          {/* Input Data Field */}
          <input
            type="email"
            placeholder="Enter your email address here"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-[12px] border border-[#5D615D] bg-[#424242]/40 px-5 py-3 text-white   text-[14px] font-medium placeholder-white/30 focus:outline-none focus:border-[#009738]/60 transition-colors"
          />

          {/* Submission Action Button */}
          <button
            type="submit"
            className="px-8 py-3 rounded-[12px] bg-[#0D5C3F]/40 hover:bg-[#0D5C3F]/60 text-white   font-bold text-[14px] leading-[20px] transition-all duration-200 active:scale-[0.99] whitespace-nowrap text-center cursor-pointer"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default NewsLetter;