export interface ThreatCard {
  id: string;
  code: string;
  title: string;
  description: string;
  threatLevel: "CRITICAL" | "HIGH";
  iconName: "ShieldAlert" | "Video" | "Bot" | "Smartphone" | "Landmark" | "Fingerprint";
}

export interface PathStep {
  step: number;
  code: string;
  title: string;
  tagline: string;
  description: string;
}

export interface MissionStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  detail: string;
  highlight?: boolean;
}

export interface RegistrationPayload {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  profession: string;
  city: string;
  education: string;
  consent: boolean;
  honeypot?: string;
}

export const CYBER_CONTENT = {
  hero: {
    eyebrow: "A Mission by The Better Planet Society (TBPS)",
    headlineNum: "1 MILLION",
    headlineText: "CYBER WARRIORS",
    tagline: "BUILDING A SAFER DIGITAL INDIA, ONE INFORMED USER AT A TIME.",
    body: "Project Cyber Warriors is a mission under The Better Planet Society focused on equipping vulnerable internet users, particularly college students and women, with the knowledge to identify, prevent and legally report online blackmail, extortion and financial fraud.",
    ctaPrimary: "REGISTER NOW",
    ctaSecondary: "See the Mission",
    liveBadge: "103K+ Registrations received for Cybersecurity & AI Training in just 90 days.",
    terminalLines: [
      "> initializing mission command protocol...",
      "> 103,000+ defenders enlisted across India",
      "> your seat is waiting // sector: defence",
      "> secure your family's digital footprint",
      "> status: actively recruiting cyber warriors",
    ],
  },
  mission: {
    target: 1000000,
    currentRegistrations: 103000,
    progressPercentage: 10.3,
    progressLabel: "Mission progress",
    stats: [
      {
        id: "stat-reg",
        value: 103,
        suffix: "K+",
        label: "Registrations in 90 days",
        detail: "Rapid citizen adoption for AI & Cyber training",
        highlight: true,
      },
      {
        id: "stat-women",
        value: 23,
        suffix: "K+",
        label: "Women Trained in Digital Safety",
        detail: "Empowered against blackmail & extortion",
      },
      {
        id: "stat-people",
        value: 100,
        suffix: "K+",
        label: "People Addressed",
        detail: "Direct community impact across institutional tiers",
      },
      {
        id: "stat-cases",
        value: 800,
        suffix: "+",
        label: "Cybercrime & Fraud Cases Handled",
        detail: "Digital forensics & rapid investigative support",
      },
      {
        id: "stat-seminars",
        value: 2000,
        suffix: "+",
        label: "Seminars, Workshops & Keynotes",
        detail: "Conducted at colleges, corporations & police hubs",
      },
      {
        id: "stat-affiliations",
        value: 38,
        suffix: "+",
        label: "Certifications & Affiliations",
        detail: "Recognized by top cybersecurity bodies",
      },
    ] as MissionStat[],
  },
  threatMatrix: {
    heading: "KNOW THE THREATS. BECOME THE DEFENCE.",
    subheading: "Ankur Chandrakant's frontline threat assessment on digital syndicates operating against Indian netizens.",
    cards: [
      {
        id: "thr-01",
        code: "THR // 01",
        title: "Digital Arrest Fraud",
        description: "Impersonation of law enforcement agencies to extort victims through psychological coercion and fake video warrants.",
        threatLevel: "CRITICAL",
        iconName: "ShieldAlert",
      },
      {
        id: "thr-02",
        code: "THR // 02",
        title: "Sextortion & Blackmail",
        description: "Targeted video-call trap syndicates blackmailing citizens using manipulated compromise recordings.",
        threatLevel: "CRITICAL",
        iconName: "Video",
      },
      {
        id: "thr-03",
        code: "THR // 03",
        title: "Deepfakes & AI Voice Clones",
        description: "Hyper-realistic synthetic media and cloned family voices engineered to bypass trust and authorize fraudulent transfers.",
        threatLevel: "HIGH",
        iconName: "Bot",
      },
      {
        id: "thr-04",
        code: "THR // 04",
        title: "UPI & Loan Scams",
        description: "Instant-loan malware, fake payment gateways, and malicious APK overlays draining accounts in seconds.",
        threatLevel: "HIGH",
        iconName: "Smartphone",
      },
      {
        id: "thr-05",
        code: "THR // 05",
        title: "Money Laundering Syndicates",
        description: "Exploitation of mule accounts and decentralized crypto pipelines to launder stolen public funds.",
        threatLevel: "HIGH",
        iconName: "Landmark",
      },
      {
        id: "thr-06",
        code: "THR // 06",
        title: "Stolen Digital Footprints",
        description: "Credential stuffing, SIM swapping, and weaponized personal data harvested from public digital exposures.",
        threatLevel: "HIGH",
        iconName: "Fingerprint",
      },
    ] as ThreatCard[],
  },
  warriorPath: {
    heading: "YOUR PATH TO BECOME A CYBER WARRIOR",
    subheading: "A systematic 4-phase transformation from vulnerable user to certified digital defender.",
    steps: [
      {
        step: 1,
        code: "PHASE // 01",
        title: "Register",
        tagline: "Enlist in under a minute",
        description: "Join the mission in under a minute with zero fees or complicated pre-requisites.",
      },
      {
        step: 2,
        code: "PHASE // 02",
        title: "Learn",
        tagline: "Master cyber self-defense",
        description: "Access curated, free cybersecurity & AI training designed for real-world defence.",
      },
      {
        step: 3,
        code: "PHASE // 03",
        title: "Defend",
        tagline: "Neutralize active attacks",
        description: "Identify, deflect and legally report online blackmail, fraud and impersonation.",
      },
      {
        step: 4,
        code: "PHASE // 04",
        title: "Spread",
        tagline: "Protect your community",
        description: "Help your family, colleagues and community build resilient digital safeguards.",
      },
    ] as PathStep[],
  },
  mediaMentions: {
    badge: "// NATIONAL MEDIA COVERAGE",
    quote: "Ankur Chandrakant launches 'Mission 1 Million: Digital Kavach'",
    source: "Dainik Bhaskar",
    outlets: [
      "Dainik Bhaskar",
      "News18",
      "ANI News",
      "Times of India",
      "Hindustan Times",
      "Tribune India",
      "NBT",
      "Punjab Kesari",
    ],
  },
  form: {
    professions: [
      "Student",
      "Working Professional",
      "Business Owner / Entrepreneur",
      "Homemaker",
      "Government Employee",
      "Educator / Teacher",
      "Freelancer",
      "Other",
    ],
    educationLevels: [
      "Below 10th",
      "10th Pass",
      "12th Pass",
      "Diploma",
      "Undergraduate (pursuing)",
      "Graduate",
      "Postgraduate",
      "Doctorate",
      "Other",
    ],
    briefingPoints: [
      "100% Free Cybersecurity & AI defence training",
      "Learn to identify & legally report financial and identity fraud",
      "Join a nationwide community of 1 Million informed defenders",
    ],
  },
};

/**
 * Submits the registration payload.
 * 
 * TODO: Replace this simulated stub with real backend API integration (e.g. POST /api/register-warrior)
 * Currently runs a client-side simulated handshake resolving after 1400ms without logging or persisting private data.
 */
export async function submitRegistration(data: RegistrationPayload): Promise<{ success: boolean; warriorId: string }> {
  // Simulated network encryption & transmission delay (1.4s)
  await new Promise((resolve) => setTimeout(resolve, 1400));

  // Honeypot check: silently simulate success without processing
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return { success: true, warriorId: "CW-849201" };
  }

  // Generate a cosmetic decorative Warrior ID (CW-XXXXXX)
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return {
    success: true,
    warriorId: `CW-${randomSuffix}`,
  };
}
