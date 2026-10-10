// Expected Image Files in /public
// /public/images/hero-portrait.png (transparent cutout, waist-up)
// /public/images/about-speaking.jpg
// /public/images/world-entrepreneur.jpg, world-social-worker.jpg, world-cyber-expert.jpg, world-speaker.jpg
// /public/images/tedx-imi.jpg, tedx-shivaji.jpg, tedx-asn.jpg
// /public/images/instagram-phone.png
// /public/images/cyber-warriors.jpg
// /public/images/media/dainik-bhaskar.png, news18.png, ani.png, times-of-india.png, hindustan-times.png, tribune.png, pioneer.png, mid-day.png, nbt.png, dna.png, etv-bharat.png, punjab-kesari.png

// /public/images/industry/jubin.png
// /public/images/industry/ravi.png
// /public/images/industry/deepak.png

export type ImageMap = Record<string, string | null>;

export const IMAGES: ImageMap = {
  heroPortrait: "/images/hero.png",
  aboutSpeaking: "/images/ankurspeak.png",
  worldEntrepreneur: null,
  worldSocialWorker: null,
  worldCyberExpert: null,
  worldSpeaker: null,
  tedxImi: null,
  tedxShivaji: null,
  tedxAsn: null,
  instagramPhone: "/images/insta.jpeg",
  cyberWarriors: null,
  mediaDainikBhaskar: null,
  mediaNews18: null,
  mediaAni: null,
  mediaToi: null,
  mediaHt: null,
  mediaTribune: null,
  mediaPioneer: null,
  mediaMidDay: null,
  mediaNbt: null,
  mediaDna: null,
  mediaEtv: null,
  mediaPunjabKesari: null,
  industryJubin: "/images/industry/jubin.png",
  industryRavi: "/images/industry/ravi.png",
  industryDeepak: "/images/industry/deepak.png",
};

export const LINKS = {
  instagram: "https://www.instagram.com/ankurdecodes",
  linkedin: "https://www.linkedin.com/in/ankurchandrakant/",
  youtube: "https://www.youtube.com/@AnkurDecodes",
  facebook: "https://www.facebook.com/share/1C4ySR8kvo/?mibextid=wwXIfr",
  contact: "mailto:info@ankurchandrakant.com",
};

export const CONTENT = {
  hero: {
    eyebrow: "Cybersecurity Expert | Social Entrepreneur | Founder, The Better Planet Society",
    headlineLine1: "DECODING DIGITAL THREATS.",
    headlineLine2: "Protecting People. Creating Impact.",
    sub: "Ankur Chandrakant is a cybersecurity and digital forensics specialist, speaker and social entrepreneur working at the intersection of digital safety, technology and social change.",
    badges: ["800+ Cases Solved", "TEDx Speaker", "Ethical Hacker of the Year 2016"],
  },
  voiceStats: {
    paragraph: "From corporate environments and educational institutions to TEDx stages and national media, Ankur's work has reached professionals, students, organisations and communities across India.",
    stats: [
      { value: 15, suffix: "+", label: "Years of Industry Experience" },
      { value: 800, suffix: "+", label: "Cybercrime & Digital Fraud Cases" },
      { value: 2000, suffix: "+", label: "Seminars, Workshops and Keynotes" },
      { value: 100, suffix: "K+", label: "People Addressed" },
      { value: 38, suffix: "+", label: "Certifications & Affiliations" },
      { value: 23, suffix: "K+", label: "Women Trained in Digital Safety" },
    ]
  },
  technologist: {
    title: "A TECHNOLOGIST. A CHANGEMAKER.",
    paragraph: "Ankur Chandrakant is a cybersecurity and digital forensics specialist whose work began with solving complex digital investigations and training professionals to respond to emerging threats. Over time, his work expanded beyond investigation into public education, cybersecurity awareness and community-led social initiatives. Today, he brings together three worlds: technical expertise, public education and social impact.",
    worlds: ["Technical Expertise", "Public Education", "Social Impact"],
  },
  credibility: {
    title: "CREDIBILITY BUILT THROUGH THE WORK",
    intro: "Ankur's work in cybersecurity and digital safety has received recognition across professional and public forums.",
    timeline: [
      { year: "2016", title: "Ethical Hacker of the Year", description: "Hacker Halted, USA. Also Microsoft Certified Trainer and Most Valuable Person (Cyber Net Australia Chapter)." },
      { year: "2018", title: "Uttarakhand Excellence Award", description: "Special Contribution Towards Cyber Security" },
      { year: "2018", title: "Excellence & Achievers Award", description: "" },
      { year: "2020", title: "Uttarakhand Excellence Award", description: "Special Contribution Towards Cyber Security" },
    ]
  },
  threeWorlds: {
    title: "FROM INVESTIGATION TO EDUCATION TO ACTION",
    intro: "Ankur's work spans the complete journey from understanding digital threats to helping people and organisations respond to them.",
    cards: [
      { title: "As a Serial Entrepreneur", description: "Building solutions for modern challenges.", imageKey: "worldEntrepreneur" },
      { title: "As a Social Worker", description: "Empowering communities with digital safety.", imageKey: "worldSocialWorker" },
      { title: "As a Cyber Security Expert", description: "Solving complex digital investigations.", imageKey: "worldCyberExpert" },
      { title: "As a Public Speaker", description: "Educating masses on emerging threats.", imageKey: "worldSpeaker" },
    ]
  },
  contentReach: {
    title: "MAKING CYBERSECURITY EASIER TO UNDERSTAND",
    copy: "Through short-form content, real-world cases and approachable Hinglish explainers, Ankur brings cybersecurity conversations to a much wider audience.",
    stats: [
      { value: 185, suffix: "K+", label: "Followers" },
      { value: 5, suffix: "M+", label: "Monthly Reach" }
    ]
  },
  tedx: {
    title: "FROM CYBER INVESTIGATIONS TO THE TEDx STAGE",
    cards: [
      { title: "THE RHYTHM OF DECEPTION - Deepfakes & The Illusion of Safety", location: "TEDx IMI Delhi", imageKey: "tedxImi", videoUrl: "https://www.youtube.com/watch?v=ycJTWn3D_b8" },
      { title: "THINK BEFORE YOU CLICK - The Reality of Cyber Threats", location: "TEDx Shivaji College", imageKey: "tedxShivaji", videoUrl: "https://www.youtube.com/watch?v=zNo7CZZT3-g" },
      { title: "CYBER SOVEREIGNTY - Building awareness around institutional and personal digital safety.", location: "TEDx ASN School Youth", imageKey: "tedxAsn", videoUrl: "https://www.youtube.com/watch?v=ZvyCHuOuemU" },
    ]
  },
  impactStrip: [
    { value: 50, suffix: "+", label: "Sessions Conducted" },
    { value: 100, suffix: "K+", label: "Students Reached" },
    { value: 30, suffix: "+", label: "Institutions Engaged" },
    { value: 8, suffix: "+", label: "Yrs. of Driving Execution" },
  ],
  cyberWarriors: {
    number: "1 MILLION",
    title: "CYBER WARRIORS",
    tagline: "BUILDING A SAFER DIGITAL INDIA, ONE INFORMED USER AT A TIME.",
    body: "Project Cyber Warriors is a mission under The Better Planet Society focused on equipping vulnerable internet users, particularly college students and women, with the knowledge to identify, prevent and legally report online blackmail, extortion and financial fraud.",
    badge: "103K+ Registrations received for Cybersecurity & AI Training in just 90 days.",
  },
  mediaOutlets: [
    { name: "Dainik Bhaskar", imageKey: "mediaDainikBhaskar" },
    { name: "News18", imageKey: "mediaNews18" },
    { name: "ANI", imageKey: "mediaAni" },
    { name: "Times of India", imageKey: "mediaToi" },
    { name: "Hindustan Times", imageKey: "mediaHt" },
    { name: "Tribune", imageKey: "mediaTribune" },
    { name: "Pioneer", imageKey: "mediaPioneer" },
    { name: "Mid-Day", imageKey: "mediaMidDay" },
    { name: "NBT", imageKey: "mediaNbt" },
    { name: "DNA", imageKey: "mediaDna" },
    { name: "ETV Bharat", imageKey: "mediaEtv" },
    { name: "Punjab Kesari", imageKey: "mediaPunjabKesari" },
  ],
  industryVoices: [
    { name: "Jubin Nautiyal", quote: "Ankur's work methods and insights are well appreciated.", imageKey: "industryJubin" },
    { name: "Ravi Bagdi", quote: "Ankur has been a very helpful and genuine person.", imageKey: "industryRavi" },
    { name: "Deepak Kalra", quote: "I'm really inspired by his great vision and initiatives.", imageKey: "industryDeepak" },
  ],
};
