import PageHero from "@/components/PageHero/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How REDCon Ltd. collects, uses and protects information submitted through this website.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "What We Collect",
    body: "We collect personal information you voluntarily provide through our website, forms, events, registrations, communications and service interactions. This may include name, contact details, preferences and engagement information.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to:",
    list: [
      "Respond to your inquiries and requests",
      "Provide products, services and information you ask for",
      "Improve our website and offerings",
      "Share relevant updates about REDCon.",
    ],
  },
  {
    title: "Website and Cookies",
    body: "Our website may use cookies and similar technologies to enhance your experience, analyze usage and improve functionality. This information is collected in a way that does not identify you personally.",
  },
  {
    title: "Data Protection and Access",
    body: "We take appropriate measures to safeguard your data. You can request access, correction or removal of your personal information by contacting us.",
  },
  {
    title: "Changes to Policy",
    body: "We may update this policy occasionally. Updates will be posted on our official website.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHero tag="legal" title="Privacy Policy" />

      <section className="w-full py-12 md:py-14 lg:py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4 flex flex-col gap-10">
          <p className="text-white/80 text-[18px] leading-[30px]">
            At REDCon, we respect your privacy and are committed to protecting your personal information.
          </p>

          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3 border-t border-white/10 pt-8">
              <h2 className="text-white text-[20px] font-semibold">{section.title}</h2>
              <p className="text-white/65 text-[15px] leading-[26px]">{section.body}</p>
              {section.list && (
                <ul className="flex flex-col gap-2 pl-1">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/65 text-[15px] leading-[24px]">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
