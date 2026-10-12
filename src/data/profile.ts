// Placeholder content — replace with real details.
export const profile = {
  name: "Sushant Balunda",
  tagline: "AI Engineer · Full Stack Developer · ML Enthusiast",
  titles: ["AI Engineer", "Full Stack Developer", "ML Engineer", "Backend Developer", "Creator", "Builder"],
  email: "hello@sushant.dev",
  location: "India",
  resume: "#",
  about:
    "I design and build intelligent systems — from machine learning pipelines to the interfaces people touch. I care about craft, performance and the small details that make software feel alive. Currently exploring LLM agents, real-time 3D on the web and scalable backends.",
  education: { college: "Your College", degree: "B.Tech, Computer Science", year: "2022 – 2026", cgpa: "—" },
  stats: [
    { value: "20+", label: "Projects shipped" },
    { value: "3", label: "Internships" },
    { value: "12", label: "Certifications" },
    { value: "∞", label: "Curiosity" },
  ],
  achievements: ["Hackathon finalist", "Open-source contributor", "Top performer, coding contests"],
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://x.com/",
  },
  quote: "The best way to predict the future is to build it.",
};

export const skills = [
  { name: "AI / ML", hue: 235, size: 120, exp: "2+ yrs", desc: "Model training, LLM apps, computer vision.", stack: ["PyTorch", "TensorFlow", "LangChain", "OpenCV"], projects: 8 },
  { name: "Frontend", hue: 200, size: 104, exp: "3 yrs", desc: "Fluid, accessible, motion-rich interfaces.", stack: ["React", "TypeScript", "Tailwind", "Three.js"], projects: 12 },
  { name: "Backend", hue: 285, size: 112, exp: "2+ yrs", desc: "APIs, data pipelines and distributed services.", stack: ["Node.js", "FastAPI", "PostgreSQL", "Redis"], projects: 9 },
  { name: "Cloud", hue: 170, size: 88, exp: "1+ yr", desc: "Shipping and scaling in production.", stack: ["AWS", "Docker", "Vercel", "CI/CD"], projects: 6 },
  { name: "Languages", hue: 320, size: 96, exp: "4 yrs", desc: "The tools behind everything else.", stack: ["Python", "TypeScript", "C++", "SQL"], projects: 20 },
];

export const projects = [
  { name: "Nebula Mind", desc: "An autonomous research agent that reads, reasons and writes reports with citations, using multi-step LLM planning.", stack: ["Python", "LangChain", "FastAPI", "React"], github: "https://github.com/", live: "#" },
  { name: "Orbit Vision", desc: "Real-time object detection in the browser with on-device inference.", stack: ["TensorFlow.js", "WebGL", "TypeScript"], github: "https://github.com/", live: "#" },
  { name: "Pulse Analytics", desc: "Streaming analytics dashboard handling millions of events per day.", stack: ["Node.js", "Kafka", "PostgreSQL"], github: "https://github.com/", live: "#" },
];

export const experience = [
  { company: "Company One", role: "AI Engineering Intern", duration: "2025 — Present", desc: "Building LLM-powered internal tools and evaluation pipelines." },
  { company: "Company Two", role: "Full Stack Intern", duration: "2024", desc: "Shipped customer-facing features in React and Node across a monorepo." },
  { company: "Freelance", role: "Developer", duration: "2023 — 2024", desc: "Designed and built websites and automations for small businesses." },
];

export const certifications = [
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2025" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
  { name: "Meta Front-End Developer", issuer: "Meta", year: "2024" },
  { name: "Machine Learning", issuer: "Stanford Online", year: "2023" },
];

export const sections = ["home", "about", "skills", "projects", "experience", "certifications", "contact"] as const;
