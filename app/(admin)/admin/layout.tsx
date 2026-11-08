import type { Metadata } from "next";

// The admin panel is a client layout, so its noindex rule lives in this server layout
export const metadata: Metadata = {
  title: { absolute: "Admin | REDCon" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminSectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
