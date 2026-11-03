export type Stat = { value: number; suffix?: string; label: string };

/** Home page impact stats. Exactly 6: the section shows 3 on each side of the map. */
export const DEFAULT_STATS: Stat[] = [
  { value: 8, suffix: "+", label: "Years of Experience" },
  { value: 29, label: "Projects Completed" },
  { value: 25, suffix: "+", label: "Professional Experts" },
  { value: 30, suffix: "+", label: "Clients Served" },
  { value: 20, suffix: "+", label: "Ongoing Projects" },
  { value: 35, suffix: "+", label: "Districts Coverage" },
];
