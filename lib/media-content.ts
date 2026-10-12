export interface MediaOutlet {
  name: string;
  slug: string;
  category?: string;
}

export interface FeaturedEditorial {
  id: string;
  outlet: string;
  headline: string;
  summary: string;
  tag: string;
  href: string;
  highlight?: boolean;
}

export interface PressHeadline {
  id: string;
  outlet: string;
  headline: string;
  href: string;
}

export const MEDIA_OUTLETS: MediaOutlet[] = [
  { name: "Dainik Bhaskar", slug: "dainik-bhaskar" },
  { name: "News18", slug: "news18" },
  { name: "ANI News", slug: "ani-news" },
  { name: "Times of India", slug: "times-of-india" },
  { name: "Hindustan Times", slug: "hindustan-times" },
  { name: "The Tribune", slug: "the-tribune" },
  { name: "The Pioneer", slug: "the-pioneer" },
  { name: "Mid-day", slug: "mid-day" },
  { name: "Navbharat Times", slug: "navbharat-times" },
  { name: "DNA India", slug: "dna-india" },
  { name: "ETV Bharat", slug: "etv-bharat" },
  { name: "Punjab Kesari", slug: "punjab-kesari" },
  { name: "Patrika", slug: "patrika" },
  { name: "Live Hindustan", slug: "live-hindustan" },
  { name: "Hindi Khabar", slug: "hindi-khabar" },
  { name: "Telangana Today", slug: "telangana-today" },
  { name: "GNT TV", slug: "gnt-tv" },
  { name: "Hindustan Metro", slug: "hindustan-metro" },
];

export const FEATURED_COVERAGE: FeaturedEditorial[] = [
  {
    id: "ani-redefines-leadership",
    outlet: "ANI News",
    headline: "Ankur Chandrakant Redefines Leadership: From Cybersecurity to Social Transformation",
    summary:
      "A feature on bridging the critical gap between national cyber defense infrastructure and community empowerment across underserved regions.",
    tag: "National Feature",
    href: "#",
    highlight: true,
  },
  {
    id: "news18-better-planet",
    outlet: "News18",
    headline: "Ankur Chandrakant has embarked on The Better Planet Ride journey for menstrual awareness",
    summary:
      "Covering the 11-country motorcycle expedition driving grassroots menstrual hygiene education, digital safety, and community resilience.",
    tag: "Social Impact",
    href: "#",
  },
  {
    id: "bhaskar-digital-kavach",
    outlet: "Dainik Bhaskar",
    headline: "Ankur Chandrakant launches 'Mission 1 Million: Digital Kavach'",
    summary:
      "Documenting India's largest cybersecurity mass-literacy campaign to protect one million citizens against financial fraud, deepfakes, and identity theft.",
    tag: "Cyber Defense",
    href: "#",
  },
];

export const PRESS_HEADLINES: PressHeadline[] = [
  {
    id: "h-1",
    outlet: "Dainik Bhaskar",
    headline: "Ankur Chandrakant launches 'Mission 1 Million: Digital Kavach'",
    href: "#",
  },
  {
    id: "h-2",
    outlet: "News18",
    headline: "Ankur Chandrakant has embarked on The Better Planet Ride journey for menstrual awareness",
    href: "#",
  },
  {
    id: "h-3",
    outlet: "Times of India",
    headline: "Ankur Chandrakant, a cyber-security and forensics expert who runs a computer institute in Doon",
    href: "#",
  },
  {
    id: "h-4",
    outlet: "Telangana Today",
    headline: "Gaining crypto wealth and NFT fortune in the metaverse, Cyber Expert Ankur Chandrakant discusses all",
    href: "#",
  },
  {
    id: "h-5",
    outlet: "DNA India",
    headline: "Cybersecurity forensic expert Ankur Chandrakant issued a serious alert on GPS spoofing",
    href: "#",
  },
  {
    id: "h-6",
    outlet: "ANI News",
    headline: "Ankur Chandrakant Redefines Leadership: From Cybersecurity to Social Transformation",
    href: "#",
  },
  {
    id: "h-7",
    outlet: "ETV Bharat",
    headline: "Ankur Chandrakant said that the best way to avoid cyber attacks is that people should be aware of it",
    href: "#",
  },
  {
    id: "h-8",
    outlet: "GNT TV",
    headline: "Ankur Chandrakant's special campaign, showing measures to prevent online fraud in rural areas",
    href: "#",
  },
  {
    id: "h-9",
    outlet: "Hindi Khabar",
    headline: "Ankur Chandrakant sets out to build India's largest 'digital army', will attack cyber crime",
    href: "#",
  },
  {
    id: "h-10",
    outlet: "Punjab Kesari",
    headline: "Ankur Chandrakant, who is building India's largest 'digital army', will protect against cyber crime and online fraud",
    href: "#",
  },
  {
    id: "h-11",
    outlet: "Patrika",
    headline: "Ankur Chandrakant has announced an awareness campaign to protect people from online fraud",
    href: "#",
  },
  {
    id: "h-12",
    outlet: "Live Hindustan",
    headline: "Cyber security expert Ankur Chandrakant has announced the launch of a campaign named \"Mission 1 Million: Digital Kavach\"",
    href: "#",
  },
  {
    id: "h-13",
    outlet: "NBT",
    headline: "Ankur Chandrakant to impart cyber security classes to students across the country",
    href: "#",
  },
  {
    id: "h-14",
    outlet: "Tribune India",
    headline: "Ankur Chandrakant, the exceptional cyber security and forensic expert, yet again headlines by offering a cyber-counselling platform",
    href: "#",
  },
  {
    id: "h-15",
    outlet: "ANI News",
    headline: "Ankur Chandrakant, meet the forensic and cybersecurity expert who enthrals as producer in media and entertainment world",
    href: "#",
  },
  {
    id: "h-16",
    outlet: "Hindustan Metro",
    headline: "How to become a digital forensic expert by Ankur Chandrakant",
    href: "#",
  },
];
