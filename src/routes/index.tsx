import { createFileRoute } from "@tanstack/react-router";
import { SpaceShell } from "@/components/space/Experience";
import { About, Certifications, Contact, ExperienceSection, Footer, Hero, Nav, Projects, Skills } from "@/components/space/Sections";

const title = "Sushant Balunda — AI Engineer & Full Stack Developer";
const description = "Portfolio of Sushant Balunda: AI engineering, full stack development and machine learning, presented as a journey through deep space.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Sushant Balunda", jobTitle: "AI Engineer" }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SpaceShell>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExperienceSection />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </SpaceShell>
  );
}
