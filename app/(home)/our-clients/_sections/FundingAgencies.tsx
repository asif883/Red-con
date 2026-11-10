import Image from "next/image";
import { fundingAgencies } from "../../_sections/clients-data";

const FundingAgencies = () => {
  return (
    <section
      id="funding-agencies"
      className="relative w-full pb-14 md:pb-16 lg:pb-24 overflow-hidden bg-black scroll-mt-24"
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 relative z-10 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#16A34A] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              development partners
            </span>
          </div>
          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
            Major <span className="text-[#16A34A]">Funding Agencies</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {fundingAgencies.map((agency) => (
            <div
              key={agency.logo}
              className="h-[150px] rounded-[20px] border border-[#16a34a]/20 bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(2,44,34,0.40)_100%)] backdrop-blur-[2px flex items-center justify-center p-6"
            >
              <div className="relative w-full h-full">
                <Image
                  src={agency.logo}
                  alt={agency.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundingAgencies;
