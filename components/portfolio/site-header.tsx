"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntro } from "@/components/portfolio/intro-provider";
import {
  LiquidNavbar,
  PORTFOLIO_NAV_ITEMS,
} from "@/components/portfolio/liquid-navbar";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function SiteHeader() {
  const { personal } = PORTFOLIO_DATA;
  const { revealed, prefersReduced } = useIntro();
  const [activeIdx, setActiveIdx] = React.useState<number>(0);

  // Sync active nav item with scrolling position
  React.useEffect(() => {
    const sectionIds = ["about", "folders", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const topVisible = visible.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          const foundIndex = sectionIds.indexOf(topVisible.target.id);
          if (foundIndex !== -1) {
            setActiveIdx(foundIndex);
          }
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.15, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={prefersReduced ? false : { y: -64, opacity: 0 }}
      animate={revealed ? { y: 0, opacity: 1 } : { y: -64, opacity: 0 }}
      transition={{
        duration: 0.72,
        delay: revealed ? 0.08 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`sticky top-0 z-30 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12 ${
        revealed ? "" : "pointer-events-none"
      }`}
    >
      <a
        href="#home"
        aria-label={`${personal.name} home`}
        className="inline-flex items-center gap-2.5 rounded-full border border-transparent md:border-border/60 md:bg-card/65 py-1.5 pr-4 pl-1.5 md:backdrop-blur-xl md:shadow-[inset_0_1px_1.5px_0_rgba(245,240,230,0.25)] transition-all duration-300 hover:border-primary/50 sm:gap-3"
      >
        <span className="flex size-14 shrink-0 items-center justify-center overflow-visible sm:size-10">
          {personal.contactImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={personal.contactImage}
              alt={personal.name}
              width={56}
              height={56}
              decoding="async"
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-xs font-semibold tracking-wider text-primary-foreground sm:size-8">
              {personal.initials}
            </span>
          )}
        </span>
        <span className="text-xs hidden md:block font-medium tracking-tight text-foreground min-[360px]:text-sm">
          {personal.name}
        </span>
      </a>

      {/* Central Liquid Glass Navigation */}
      <div className="hidden md:flex">
        <LiquidNavbar
          items={PORTFOLIO_NAV_ITEMS}
          active={activeIdx}
          onChange={(index) => setActiveIdx(index)}
          tone="dark"
        />
      </div>

      {/* Right Action Buttons with Liquid Glass Tactile Highlights */}
      <div className="flex items-center gap-2.5">
        <Button
          nativeButton={false}
          variant="glass"
          size="default"
          render={
            <a
              href={personal.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          className="hidden sm:inline-flex"
        >
          <FileText className="size-4 stroke-[1.75]" />
          <span>CV</span>
        </Button>
        <Button
          nativeButton={false}
          variant="default"
          size="default"
          render={<a href="#contact" />}
          className="group"
        >
          <span>Contact</span>
          <ArrowUpRight className="size-4 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </motion.header>
  );
}
