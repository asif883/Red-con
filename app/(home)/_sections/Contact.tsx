"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    serviceRequired: "Survey & Monitoring",
    projectDetails: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Consultation Request Submitted:", formData);
  };

  return (
    <section className="w-full bg-neutral-950 py-20 px-4 md:px-8 lg:px-16 flex items-center justify-center overflow-hidden min-h-screen">
      <div className="max-w-[1440px] w-full flex flex-col gap-12">
        {/* SECTION HEADER CONTENT */}
        <div className="flex flex-col items-center gap-4 text-center  ">
          <div className="flex items-center gap-3">
            {/* Standard Branding Line Element */}
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#EF4444]   font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              contact us
            </span>
          </div>

          <h2 className="text-white   font-semibold text-3xl md:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
            Let’s Build the{" "}
            <span className="italic bg-clip-text text-transparent bg-[linear-gradient(90deg,#16A34A_0%,#16A34A_100%)]">
              Future Together
            </span>
          </h2>
        </div>

        {/* MAIN LAYOUT GRID MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* LEFT AREA: HEADQUARTERS & BUSINESS HOURS BOXES (SPAN 5) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Card 1: Headquarters Information Box */}
            <div className="w-full rounded-[24px] border border-[#16a34a]/20 bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(69,10,10,0.40)_100%)] backdrop-blur-[2px] p-6 md:p-8 flex flex-col gap-6">
              <h3 className="text-white   font-bold text-[20px] leading-[28px]">
                REDCon Headquarters
              </h3>

              <div className="flex flex-col gap-5">
                {/* Address Group */}
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-white   font-bold text-[14px] leading-[20px]">
                      Address
                    </h4>
                    <p className="text-white/70   font-medium text-[12px] leading-[16px]">
                      4/20 Happy House, Humayun Road,
                      <br />
                      Mohammadpur, Dhaka-1207
                    </p>
                  </div>
                </div>

                {/* Phone Group */}
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#34D399]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-white   font-bold text-[14px] leading-[20px]">
                      Phone
                    </h4>
                    <p className="text-white/70   font-medium text-[12px] leading-[16px] flex flex-col">
                      <a
                        href="tel:+8801989211290"
                        className="hover:text-[#34D399] transition-colors"
                      >
                        +8801989211290
                      </a>
                      <a
                        href="tel:+8801521213391"
                        className="hover:text-[#34D399] transition-colors"
                      >
                        +8801521213391
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email Group */}
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-white   font-bold text-[14px] leading-[20px]">
                      Email Address
                    </h4>
                    <p className="text-white/70   font-medium text-[12px] leading-[16px]">
                      <a
                        href="mailto:info.redconbd@gmail.com"
                        className="hover:text-[#EF4444] transition-colors"
                      >
                        info.redconbd@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Business Hours Box */}
            <div className="w-full rounded-[24px] border border-[#16a34a]/20 bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(69,10,10,0.40)_100%)] backdrop-blur-[2px] p-6 md:p-8 flex flex-col gap-3">
              <h3 className="text-white   font-bold text-[16px] leading-[24px]">
                Our Business Hours
              </h3>
              <div className="flex flex-col gap-1 text-white/70   font-medium text-[12px] leading-[16px]">
                <p>Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                <p>Friday & Saturday: Closed</p>
              </div>
            </div>
          </div>

          {/* RIGHT AREA: INTERACTIVE CONSULTATION FORM SYSTEM (SPAN 7) */}
          <form
            onSubmit={handleSubmit}
            className="col-span-1 lg:col-span-7 w-full rounded-[24px] border border-[rgba(22,163,74,0.40)] bg-[linear-gradient(270deg,rgba(0,151,56,0.35)_0%,rgba(255,0,0,0.35)_100%)] backdrop-blur-[2px] p-6 md:p-10 flex flex-col gap-6"
          >
            {/* Row 1: Full Name & Email Address Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-white/70   text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full rounded-[12px] border border-[#262626] bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white/70   text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.emailAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, emailAddress: e.target.value })
                  }
                  className="w-full rounded-[12px] border border-[#262626] bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Phone Number & Service Required Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-white/70   text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase mb-2 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+8801989211290"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="w-full rounded-[12px] border border-[#262626] bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white/70   text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase mb-2 block">
                  Service Required
                </label>
                <select
                  value={formData.serviceRequired}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      serviceRequired: e.target.value,
                    })
                  }
                  className="w-full rounded-[12px] border border-[#262626] px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#16a34a]/40 transition-colors cursor-pointer appearance-none bg-[url bg-[length:12px_12px] bg-[right_16px_center] bg-no-repeat"
                >
                  <option value="Survey & Monitoring" className="bg-neutral-900">
                    Survey & Monitoring
                  </option>
                  <option value="Feasibility Study" className="bg-neutral-900">Feasibility Study</option>
                  <option value="Structural Engineering" className="bg-neutral-900">
                    Structural Engineering
                  </option>
                  <option value="Traffic & Highway Design" className="bg-neutral-900">
                    Traffic & Highway Design
                  </option>
                </select>
              </div>
            </div>

            {/* Row 3: Project Details (Full Width) */}
            <div className="flex flex-col">
              <label className="text-white/70   text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase mb-2 block">
                Project Details
              </label>
              <input
                type="text"
                placeholder="Brief project scope or location"
                value={formData.projectDetails}
                onChange={(e) =>
                  setFormData({ ...formData, projectDetails: e.target.value })
                }
                className="w-full rounded-[12px] border border-[#262626] bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors"
              />
            </div>

            {/* Row 4: Message Textarea (Full Width) */}
            <div className="flex flex-col">
              <label className="text-white/70   text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase mb-2 block">
                Message
              </label>
              <textarea
                placeholder="How can our engineering consultants help you?"
                rows={4}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full rounded-[12px] border border-[#262626] bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors resize-none min-h-[120px]"
              />
            </div>

            {/* Form Submit Button Component with Gradient-to-Right Accent Mapping */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 text-center text-white   font-bold text-[14px] leading-[20px] rounded-[12px] bg-[linear-gradient(90deg,#16A34A_0%,#DC2626_100%)] shadow-[0_20px_25px_-5px_rgba(69,10,10,0.20),0_8px_10px_-6px_rgba(69,10,10,0.20)] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
            >
              Schedule a Consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
