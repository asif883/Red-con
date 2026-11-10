"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, ChevronDown, CheckCircle2, Loader2 } from "lucide-react";
import { servicesData } from "../services/_sections/services-data";

const initialFormData = {
  fullName: "",
  emailAddress: "",
  phoneNumber: "",
  serviceRequired: servicesData[0].title,
  projectDetails: "",
  message: "",
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAs, setSubmittedAs] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value.trim()));

    try {
      const res = await fetch("/api/contact", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not send your message. Please try again.");
      setSubmittedAs({ name: formData.fullName.trim(), email: formData.emailAddress.trim() });
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-neutral-950 py-12 md:py-14 lg:py-20 px-4 md:px-8 lg:px-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-[1440px] w-full flex flex-col gap-12">
        {/* SECTION HEADER CONTENT */}
        <div className="flex flex-col items-center gap-4 text-center  ">
          <div className="flex items-center gap-3">
            {/* Standard Branding Line Element */}
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#16A34A]   font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              contact us
            </span>
          </div>

          <h2 className="text-white   font-semibold text-3xl md:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
            Let’s Build the{" "}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#16A34A_0%,#16A34A_100%)]">
              Future Together
            </span>
          </h2>
        </div>

        {/* MAIN LAYOUT GRID MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* LEFT AREA: HEADQUARTERS & BUSINESS HOURS BOXES (SPAN 5) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Card 1: Headquarters Information Box */}
            <div className="w-full rounded-[24px] border border-[#16a34a]/20 bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(2,44,34,0.40)_100%)] backdrop-blur-[2px] p-6 md:p-8 flex flex-col gap-6">
              <h3 className="text-white font-bold text-[20px] leading-[28px]">
                REDCon Headquarters
              </h3>

              <div className="flex flex-col gap-5">
                {/* Address Group */}
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#16A34A]" />
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
                    <Mail className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-white   font-bold text-[14px] leading-[20px]">
                      Email Address
                    </h4>
                    <p className="text-white/70   font-medium text-[12px] leading-[16px]">
                      <a
                        href="mailto:info.redconbd@gmail.com"
                        className="hover:text-[#16A34A] transition-colors"
                      >
                        info.redconbd@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Business Hours Box */}
            <div className="w-full rounded-[24px] border border-[#16a34a]/20 bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(2,44,34,0.40)_100%)] backdrop-blur-[2px] p-6 md:p-8 flex flex-col gap-3">
              <h3 className="text-white   font-bold text-[16px] leading-[24px]">
                Our Business Hours
              </h3>
              <div className="flex flex-col gap-1 text-white/70   font-medium text-[12px] leading-[16px]">
                <p>Saturday - Thursday: 9:00 AM - 6:00 PM</p>
                <p>Friday: Closed</p>
              </div>
            </div>

            {/* Card 3: Office Location Map */}
            <div className="w-full h-[280px] md:h-[320px] rounded-[24px] overflow-hidden border border-[#16a34a]/20 bg-neutral-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.2122157921239!2d90.36810666626646!3d23.76892842491569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1004a4f7d25%3A0x28c656682afbddc5!2sHappy.%20House!5e0!3m2!1sen!2sbd!4v1793693584952!5m2!1sen!2sbd"
                title="REDCon Headquarters location on Google Maps"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* RIGHT AREA: INTERACTIVE CONSULTATION FORM SYSTEM (SPAN 7) */}
          {submittedAs ? (
            <div
              role="status"
              className="col-span-1 lg:col-span-7 w-full rounded-[24px] border border-[#16a34a]/20 bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(2,44,34,0.40)_100%)] backdrop-blur-[2px] p-6 md:p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[420px]"
            >
              <CheckCircle2 className="w-14 h-14 text-[#34D399]" />
              <h3 className="text-white text-[24px] font-bold">Thank you, {submittedAs.name}!</h3>
              <p className="text-white/60 text-[14px] leading-[24px] max-w-[420px]">
                We have received your message and one of our consultants will get back to you shortly. A
                confirmation email has been sent to <span className="text-white">{submittedAs.email}</span>.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedAs(null)}
                className="mt-2 rounded-full border border-white/15 px-6 py-2.5 text-[14px] font-semibold text-white/80 hover:bg-white/5 transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
          <form
            onSubmit={handleSubmit}
            className="col-span-1 lg:col-span-7 w-full rounded-[24px] border border-[#16a34a]/20 bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(2,44,34,0.40)_100%)] backdrop-blur-[2px] p-6 md:p-10 flex flex-col gap-6"
          >
            {error && (
              <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-300">
                {error}
              </p>
            )}

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
                  className="w-full rounded-[12px] border border-gray-600 bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors"
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
                  className="w-full rounded-[12px] border border-gray-600 bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors"
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
                  className="w-full rounded-[12px] border border-gray-600 bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white/70   text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase mb-2 block">
                  Service Required
                </label>
                <div className="relative">
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        serviceRequired: e.target.value,
                      })
                    }
                    className="w-full rounded-[12px] border border-gray-600 bg-[rgba(87,86,86,0.05)] pl-4 pr-10 py-3 text-white text-[14px] focus:outline-none focus:border-[#16a34a]/40 transition-colors cursor-pointer appearance-none"
                  >
                    {servicesData.map((service) => (
                      <option key={service.slug} value={service.title} className="bg-neutral-900">
                        {service.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                </div>
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
                className="w-full rounded-[12px] border border-gray-600 bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors"
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
                className="w-full rounded-[12px] border border-gray-600 bg-[rgba(87,86,86,0.05)] px-4 py-3 text-white text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#16a34a]/40 transition-colors resize-none min-h-[120px]"
              />
            </div>

            {/* Form Submit Button Component with Gradient-to-Right Accent Mapping */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 inline-flex items-center justify-center gap-2 text-center text-black font-bold text-[14px] leading-[20px] rounded-[12px] bg-[linear-gradient(270deg,#ffffff_0%,#00a63e_100%)] shadow-[0_20px_25px_-5px_rgba(2,44,34,0.20),0_8px_10px_-6px_rgba(2,44,34,0.20)] hover:opacity-95 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Sending..." : "Schedule a Consultation"}
            </button>
          </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
