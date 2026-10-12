import { ClientOnly } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

const SpaceScene = lazy(() => import("./SpaceScene"));

const stops = [0, 0.12, 0.3, 0.5, 0.72, 1];
const bgs = ["#ffffff", "#e8eaef", "#2f5fc7", "#0d1f4d", "#060a1c", "#020206"];
const inks = ["#0b0e17", "#0b0e17", "#f3f6ff", "#f3f6ff", "#eef1ff", "#eef1ff"];

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}

function ColorJourney() {
  const { scrollYProgress } = useScroll();
  const bg = useTransform(scrollYProgress, stops, bgs);
  const ink = useTransform(scrollYProgress, stops, inks);
  useMotionValueEvent(bg, "change", (v) => document.documentElement.style.setProperty("--bg", v));
  useMotionValueEvent(ink, "change", (v) => document.documentElement.style.setProperty("--ink", v));
  return null;
}

function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const lines = ["Initializing neural core", "Calibrating star map", "Activating particles", "Engines online"];
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 9 + 3);
      setPct(Math.floor(v));
      if (v >= 100) { clearInterval(id); setTimeout(onDone, 500); }
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-space text-ink"
      style={{ ["--ink" as string]: "#eef1ff" }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
      role="status"
      aria-label={`Loading ${pct}%`}
    >
      <motion.div
        className="relative h-24 w-24 rounded-full bg-core shadow-glow"
        animate={{ scale: [1, 1.12, 1], rotate: 360 }}
        transition={{ scale: { repeat: Infinity, duration: 1.6 }, rotate: { repeat: Infinity, duration: 6, ease: "linear" } }}
      >
        <div className="absolute -inset-4 rounded-full border border-glow/40" />
      </motion.div>
      <p className="mt-10 font-display text-6xl font-bold tabular-nums">{pct}%</p>
      <div className="mt-6 h-px w-64 overflow-hidden bg-ink/15">
        <motion.div className="h-full bg-glow" animate={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-6 space-y-1 font-mono text-xs text-ink/60">
        {lines.map((l, i) => (
          <li key={l} className={pct > i * 25 ? "text-glow" : ""}>
            {pct > i * 25 ? "✓" : "·"} {l}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const x = useSpring(-100, { stiffness: 300, damping: 26, mass: 0.6 });
  const y = useSpring(-100, { stiffness: 300, damping: 26, mass: 0.6 });
  const tx = useSpring(-100, { stiffness: 80, damping: 20 });
  const ty = useSpring(-100, { stiffness: 80, damping: 20 });
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("orb-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY); tx.set(e.clientX); ty.set(e.clientY);
      setPos({ x: e.clientX, y: e.clientY });
      setHover(!!(e.target as HTMLElement).closest("a,button,[data-cursor],input,textarea"));
    };
    window.addEventListener("pointermove", move);
    return () => { window.removeEventListener("pointermove", move); document.body.classList.remove("orb-cursor"); };
  }, [x, y, tx, ty]);
  if (pos.x < 0) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <motion.div style={{ x: tx, y: ty }} className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-glow/20 blur-md" />
      <motion.div
        style={{ x, y }}
        animate={{ scale: hover ? 2.6 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-core shadow-glow"
      >
        <motion.span
          className="absolute -right-1 top-0 h-1 w-1 rounded-full bg-glow"
          style={{ originX: "-6px", originY: "8px" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}

export function SpaceShell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  useLenis();
  return (
    <>
      <ColorJourney />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <ClientOnly fallback={null}>
          <Suspense fallback={null}>
            <SpaceScene />
          </Suspense>
        </ClientOnly>
      </div>
      <ClientOnly fallback={null}><Cursor /></ClientOnly>
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <div className="relative z-10">{children}</div>
    </>
  );
}
