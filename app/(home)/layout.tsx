import Footer from "@/components/Footer/Footer";
import SmoothScroller from "@/components/SmoothScroller/SmoothScroller";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SmoothScroller>
        {children}
        <Footer />
      </SmoothScroller>
    </div>
  );
}
