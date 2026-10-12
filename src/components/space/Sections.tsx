import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiSend, FiTwitter, FiAward } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { certifications, experience, profile, projects, sections, skills } from "@/data/profile";
import { scrollToId } from "./Experience";
import { Magnetic, Reveal, SectionHead, TiltCard, btnGhost, btnPrimary } from "./fx";

export function Nav() {
  const [small, setSmall] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setSmall(v > 60));
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => { const el = document.getElementById(s); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <motion.nav
      aria-label="Primary"
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full glass"
      animate={{ paddingTop: small ? 6 : 10, paddingBottom: small ? 6 : 10, scale: small ? 0.94 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <ul className="flex items-center gap-1 px-2">
        {sections.filter((s) => s !== "certifications").map((s) => (
          <li key={s} className={cn(s === "experience" || s === "skills" ? "hidden sm:block" : "")}>
            <button
              onClick={() => scrollToId(s)}
              className={cn("relative rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors sm:text-sm", active === s ? "text-background" : "text-ink/70 hover:text-ink")}
              aria-current={active === s ? "true" : undefined}
            >
              {active === s && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
              {s}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

function RotatingTitle() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % profile.titles.length), 2200); return () => clearInterval(id); }, []);
  return (
    <span className="relative inline-block h-[1.2em] min-w-[12ch] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span key={i} className="absolute left-0 text-glow" initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 22 }}>
          {profile.titles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const words = profile.name.split(" ");
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-24 sm:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>
          ◉ System online — {profile.location}
        </motion.p>
        <h1 className="mt-6 text-[15vw] font-extrabold leading-[0.85] sm:text-[10vw] lg:text-[8.5rem]">
          {words.map((w, wi) => (
            <span key={w} className="block overflow-hidden">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 2.7 + wi * 0.12, type: "spring", stiffness: 60, damping: 16 }}>
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="mt-8 max-w-xl text-lg text-ink/70 sm:text-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.1 }}>
          <RotatingTitle />
          <br />crafting intelligent systems for the web.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.3 }}>
          <Magnetic><button className={btnPrimary} onClick={() => scrollToId("projects")}>View Projects <FiArrowUpRight /></button></Magnetic>
          <Magnetic><a className={btnGhost} href={profile.resume}><FiDownload /> Download Resume</a></Magnetic>
          <Magnetic><button className={btnGhost} onClick={() => scrollToId("contact")}><FiMail /> Contact Me</button></Magnetic>
        </motion.div>
      </div>
      <motion.div aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-ink/50" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        SCROLL TO LAUNCH ↓
      </motion.div>
    </section>
  );
}

const wrap = "relative mx-auto max-w-7xl px-6 py-32 sm:px-12";

export function About() {
  return (
    <section id="about" className={wrap}>
      <SectionHead eyebrow="01 — Pilot log" title="About me" />
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3"><TiltCard className="h-full">
          <p className="text-xl leading-relaxed sm:text-2xl">{profile.about}</p>
          <p className="mt-8 font-mono text-xs text-ink/60">“{profile.quote}”</p>
        </TiltCard></Reveal>
        <Reveal delay={0.1} className="lg:col-span-2"><TiltCard className="h-full">
          <p className="eyebrow">Education</p>
          <h3 className="mt-3 text-2xl font-bold">{profile.education.degree}</h3>
          <p className="mt-1 text-ink/70">{profile.education.college}</p>
          <p className="mt-1 font-mono text-sm text-ink/60">{profile.education.year} · CGPA {profile.education.cgpa}</p>
          <p className="eyebrow mt-8">Achievements</p>
          <ul className="mt-3 space-y-2">{profile.achievements.map((a) => <li key={a} className="flex gap-2"><FiAward className="mt-1 text-glow" />{a}</li>)}</ul>
        </TiltCard></Reveal>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
        {profile.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}><TiltCard>
            <p className="font-display text-5xl font-bold gradient-text">{s.value}</p>
            <p className="mt-2 text-sm text-ink/60">{s.label}</p>
          </TiltCard></Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  const [open, setOpen] = useState(0);
  const s = skills[open];
  return (
    <section id="skills" className={wrap}>
      <SectionHead eyebrow="02 — Star system" title="Skills" />
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative flex min-h-[420px] flex-wrap items-center justify-center gap-8">
          {skills.map((p, i) => (
            <motion.button
              key={p.name}
              aria-label={`${p.name} skills`}
              aria-pressed={open === i}
              onPointerEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
              className="relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ width: p.size, height: p.size }}
              animate={{ y: [0, -14, 0], scale: open === i ? 1.12 : 1 }}
              transition={{ y: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" }, scale: { type: "spring", stiffness: 200 } }}
            >
              <span className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, oklch(0.85 0.12 ${p.hue}), oklch(0.45 0.18 ${p.hue}) 60%, oklch(0.2 0.08 ${p.hue}))`, boxShadow: `0 0 40px -4px oklch(0.6 0.18 ${p.hue} / 0.7)` }} />
              <motion.span className="absolute -inset-4 rounded-full border border-ink/20" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8 + i * 2, ease: "linear" }}>
                <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-glow" />
              </motion.span>
              <span className="relative font-display text-xs font-bold text-primary-foreground">{p.name}</span>
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={s.name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
            <TiltCard>
              <p className="eyebrow">Planet</p>
              <h3 className="mt-2 text-4xl font-bold">{s.name}</h3>
              <p className="mt-4 text-lg text-ink/75">{s.desc}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-sm">
                <div><p className="text-ink/50">Experience</p><p className="text-xl">{s.exp}</p></div>
                <div><p className="text-ink/50">Projects</p><p className="text-xl">{s.projects}</p></div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">{s.stack.map((t) => <span key={t} className="rounded-full glass px-3 py-1 text-xs">{t}</span>)}</div>
            </TiltCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className={wrap}>
      <SectionHead eyebrow="03 — Missions" title="Projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
            <TiltCard className={cn("h-full", i === 0 && "sm:p-10")}>
              <div className={cn("flex flex-col gap-8", i === 0 && "lg:flex-row lg:items-center")}>
                <motion.div aria-hidden className={cn("relative aspect-video overflow-hidden rounded-2xl bg-space", i === 0 && "lg:w-1/2")} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
                  <div className="absolute inset-0 bg-core opacity-60 blur-2xl" style={{ transform: `translate(${i * 20 - 20}%, ${i * 10}%)` }} />
                  <span className="absolute bottom-4 left-4 font-mono text-xs text-glow">MISSION_0{i + 1}</span>
                </motion.div>
                <div className="flex-1">
                  {i === 0 && <p className="eyebrow mb-3">★ Featured</p>}
                  <h3 className={cn("font-bold", i === 0 ? "text-4xl sm:text-5xl" : "text-3xl")}>{p.name}</h3>
                  <p className="mt-3 text-ink/70">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{p.stack.map((t) => <span key={t} className="rounded-full glass px-3 py-1 font-mono text-xs">{t}</span>)}</div>
                  <div className="mt-6 flex gap-3">
                    <Magnetic><a className={btnGhost} href={p.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a></Magnetic>
                    <Magnetic><a className={btnPrimary} href={p.live} target="_blank" rel="noreferrer">Live Demo <FiArrowUpRight /></a></Magnetic>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className={wrap}>
      <SectionHead eyebrow="04 — Flight path" title="Experience" />
      <ol className="relative ml-3 border-l border-ink/20">
        {experience.map((e, i) => (
          <li key={e.company} className="relative mb-10 pl-8">
            <motion.span className="absolute -left-[7px] top-6 h-3.5 w-3.5 rounded-full bg-glow shadow-glow" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: i * 0.1 }} />
            <Reveal delay={i * 0.1}><TiltCard>
              <p className="font-mono text-xs text-glow">{e.duration}</p>
              <h3 className="mt-2 text-2xl font-bold">{e.role}</h3>
              <p className="text-ink/60">{e.company}</p>
              <p className="mt-3 text-ink/75">{e.desc}</p>
            </TiltCard></Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className={wrap}>
      <SectionHead eyebrow="05 — Clearances" title="Certifications" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.06}><TiltCard className="h-full">
            <motion.div whileHover={{ rotate: 180 }} transition={{ type: "spring" }} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-core"><FiAward className="text-primary-foreground" /></motion.div>
            <h3 className="mt-5 text-lg font-bold leading-tight">{c.name}</h3>
            <p className="mt-2 text-sm text-ink/60">{c.issuer} · {c.year}</p>
          </TiltCard></Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const [state, setState] = useState<"idle" | "launch" | "sent">("idle");
  const field = "w-full rounded-2xl bg-ink/5 border border-ink/15 px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <section id="contact" className={wrap}>
      <SectionHead eyebrow="06 — Mission control" title="Let’s build something." />
      <Reveal><TiltCard className="sm:p-10">
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            setState("launch");
            setTimeout(() => {
              window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${f.get("name")}`)}&body=${encodeURIComponent(String(f.get("message")))}`;
              setState("sent");
            }, 1100);
          }}
        >
          <label className="sr-only" htmlFor="name">Name</label>
          <input id="name" name="name" required maxLength={100} placeholder="Your name" className={field} />
          <label className="sr-only" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required maxLength={255} placeholder="Your email" className={field} />
          <label className="sr-only" htmlFor="message">Message</label>
          <textarea id="message" name="message" required maxLength={1000} rows={5} placeholder="Transmit your message…" className={cn(field, "sm:col-span-2")} />
          <div className="flex items-center justify-between gap-4 sm:col-span-2">
            <a href={`mailto:${profile.email}`} className="font-mono text-sm text-ink/60 hover:text-glow">{profile.email}</a>
            <Magnetic>
              <button type="submit" className={btnPrimary} disabled={state === "launch"}>
                {state === "sent" ? "Transmitted ✓" : "Launch"}
                <motion.span animate={state === "launch" ? { x: 160, y: -160, opacity: 0, rotate: -20 } : { x: 0, y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.6, 0, 0.4, 1] }}>
                  <FiSend />
                </motion.span>
              </button>
            </Magnetic>
          </div>
        </form>
      </TiltCard></Reveal>
    </section>
  );
}

export function Footer() {
  const links = [
    { href: profile.socials.github, icon: FiGithub, label: "GitHub" },
    { href: profile.socials.linkedin, icon: FiLinkedin, label: "LinkedIn" },
    { href: profile.socials.twitter, icon: FiTwitter, label: "Twitter" },
    { href: `mailto:${profile.email}`, icon: FiMail, label: "Email" },
  ];
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-12 pt-24 sm:px-12">
      <p className="font-display text-[14vw] font-extrabold leading-none text-ink/10 lg:text-[10rem]">{profile.name.split(" ")[0]}</p>
      <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-ink/15 pt-8 sm:flex-row sm:items-center">
        <p className="text-sm text-ink/50">© {2026} {profile.name}. Drifting through deep space.</p>
        <ul className="flex gap-3">
          {links.map(({ href, icon: Icon, label }) => (
            <li key={label}><Magnetic><motion.a whileHover={{ rotate: 15 }} href={href} aria-label={label} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full glass hover:shadow-glow"><Icon /></motion.a></Magnetic></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
