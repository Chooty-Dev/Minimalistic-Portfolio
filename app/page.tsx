import { BackgroundShader } from "@/components/portfolio/background-shader";
import { IntroProvider } from "@/components/portfolio/intro-provider";
import { IntroOverlay } from "@/components/portfolio/intro-overlay";
import { SiteHeader } from "@/components/portfolio/site-header";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { FoldersSection } from "@/components/portfolio/folders-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function HomePage() {
  const { personal, socials } = PORTFOLIO_DATA;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${personal.siteUrl}/#website`,
        url: personal.siteUrl,
        name: "supun.me — Tharaka Dharmasiri",
        alternateName: ["Supun Tharaka", "Tharaka Dharmasiri Portfolio", "supun.me"],
        description: personal.heroSummary,
        publisher: { "@id": `${personal.siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${personal.siteUrl}/#profilepage`,
        url: personal.siteUrl,
        name: `${personal.name} — ${personal.role}`,
        mainEntity: { "@id": `${personal.siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${personal.siteUrl}/#person`,
        name: personal.name,
        alternateName: ["Supun", "Supun Tharaka", "Tharaka Supun"],
        url: personal.siteUrl,
        image: `${personal.siteUrl}${personal.profileImage}`,
        email: `mailto:${personal.email}`,
        jobTitle: personal.role,
        worksFor: {
          "@type": "Organization",
          name: personal.company,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Sri Lanka Institute of Information Technology (SLIIT)",
        },
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "MongoDB",
          "SaaS Architecture",
          "Payment Gateway Integration",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Colombo",
          addressCountry: "LK",
        },
        sameAs: socials
          .filter((s) => s.name !== "Email")
          .map((s) => s.url),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BackgroundShader />
      <IntroProvider>
        <IntroOverlay />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <HeroSection />
            <AboutSection />
            <FoldersSection />
            <ContactSection />
          </main>
          <SiteFooter />
        </div>
      </IntroProvider>
    </>
  );
}
