import Navbar from "@/components/Navbar/Navbar";

interface PageHeroProps {
  tag: string;
  title: string;
  description?: string;
}

// Half-height hero used by the inner pages (matches ServiceHero / ProjectHero).
const PageHero = ({ tag, title, description }: PageHeroProps) => {
  return (
    <div
      className="relative min-h-[50vh] md:h-[55vh] md:min-h-[460px] w-full flex flex-col justify-between overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0.00) 31.65%, rgba(0, 0, 0, 0.50) 45%, rgba(0, 0, 0, 0.90) 100%), url('/images/hero.png')`,
      }}
    >
      <Navbar />

      <div className="w-full flex-grow flex items-center px-4 pt-32 pb-16">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-start gap-5 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#16A34A] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              {tag}
            </span>
          </div>

          <h1 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px] max-w-4xl">
            {title}
          </h1>

          {description && (
            <p className="text-[rgba(255,255,255,0.70)] text-base sm:text-lg lg:text-[20px] lg:leading-[28px] font-medium max-w-3xl mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
