export interface GalleryCategoryMeta {
  id: string; // matches folder slug: "awards", "tedx", etc. or "all"
  label: string;
  description: string;
}

export interface GalleryStat {
  end: number;
  suffix: string;
  label: string;
  highlight?: boolean;
}

export const GALLERY_CATEGORIES: GalleryCategoryMeta[] = [
  {
    id: "all",
    label: "All",
    description: "A complete visual chronicle of keynotes, awards, expeditions, and training bootcamps.",
  },
  {
    id: "awards",
    label: "Awards & Recognition",
    description: "National honors, governor recognitions, and cybersecurity leadership awards.",
  },
  {
    id: "tedx",
    label: "TEDx & Stage",
    description: "Keynotes on TEDx stages and global cybersecurity summits inspiring digital vigilance.",
  },
  {
    id: "social-impact",
    label: "Social Impact (TBPS)",
    description: "Grassroots drives, The Better Planet Ride across 11 nations, and menstrual health outreach.",
  },
  {
    id: "training",
    label: "Training & Workshops",
    description: "Hands-on forensic investigations, ethical hacking bootcamps, and institutional drills.",
  },
  {
    id: "podcasts",
    label: "Podcasts & Media",
    description: "In-depth video conversations, broadcast interviews, and roundtables with industry leaders.",
  },
  {
    id: "moments",
    label: "Moments",
    description: "Behind-the-scenes milestones, field encounters, and personal chapters on the road.",
  },
];

export const GALLERY_STATS: GalleryStat[] = [
  {
    end: 2000,
    suffix: "+",
    label: "Seminars & Workshops",
  },
  {
    end: 100,
    suffix: "K+",
    label: "People Addressed",
  },
  {
    end: 23,
    suffix: "K+",
    label: "Women Trained",
    highlight: true,
  },
  {
    end: 80,
    suffix: "+",
    label: "Schools & Colleges Partnered",
  },
];
