"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useIntro } from "@/components/portfolio/intro-provider";
import { SafeMedia } from "@/components/portfolio/safe-media";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function HeroSection() {
  const { personal } = PORTFOLIO_DATA;
  const { revealed, prefersReduced } = useIntro();

  const fullQuote = `\u201C${personal.heroQuote}\u201D`;
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (!revealed || prefersReduced) return;

    let count = 0;
    let intervalId = 0;

    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        count += 1;
        setTypedCount(count);
        if (count >= fullQuote.length) {
          window.clearInterval(intervalId);
        }
      }, 28);
    }, 160);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(intervalId);
    };
  }, [revealed, prefersReduced, fullQuote.length]);

  const effectiveCount = prefersReduced ? fullQuote.length : typedCount;
  const isTypingDone = effectiveCount >= fullQuote.length;

  return (
    <section
      id="home"
      className="relative z-10 mx-auto flex min-h-[calc(100svh-5.25rem)] w-full max-w-7xl items-center px-5 pt-4 pb-12 sm:px-8 sm:py-10 lg:px-12"
    >
      <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Side: Typewriter hero quote with locked layout height (0 CLS) */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.55,
            delay: revealed ? 0.1 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="lg:col-span-7"
        >
          <blockquote className="grid max-w-2xl text-[2.15rem] leading-[1.06] font-semibold tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
            <span className="sr-only">{fullQuote}</span>
            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 select-none"
            >
              {fullQuote}
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {fullQuote.slice(0, effectiveCount)}
              {revealed && !prefersReduced ? (
                <motion.span
                  aria-hidden="true"
                  animate={
                    isTypingDone
                      ? { opacity: 0 }
                      : { opacity: [1, 1, 0, 0] }
                  }
                  transition={
                    isTypingDone
                      ? { duration: 0.35, delay: 0.45 }
                      : {
                          duration: 0.85,
                          repeat: Infinity,
                          times: [0, 0.48, 0.52, 1],
                        }
                  }
                  className="ml-1.5 inline-block h-[0.82em] w-[3px] translate-y-[0.06em] rounded-full bg-primary align-baseline"
                />
              ) : null}
            </span>
          </blockquote>
        </motion.div>

        {/* Right Side: Animated Profile Card entrance */}
        <motion.div
          initial={
            prefersReduced ? false : { opacity: 0, y: 28, scale: 0.96 }
          }
          animate={
            revealed
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 28, scale: 0.96 }
          }
          transition={{
            duration: 0.8,
            delay: revealed ? 0.22 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex w-full justify-center lg:col-span-5 lg:justify-end"
        >
          <Card className="w-full max-w-[360px] gap-5 pt-0 pb-6 sm:max-w-[390px]">
            <SafeMedia
              src={personal.profileImage}
              alt={`${personal.name} — ${personal.role}`}
              fallbackIcon="user"
              priority
              className="aspect-[5/4] w-full rounded-none border-0 border-b border-border bg-muted/40"
              imgClassName="object-cover object-top"
            />

            <CardContent className="space-y-1.5 pt-1">
              <h1 className="text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                {personal.name}
              </h1>
              <p className="text-sm font-medium text-primary sm:text-base">
                {personal.role} · {personal.company}
              </p>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-3 pt-1">
              <Button
                nativeButton={false}
                variant="default"
                size="lg"
                render={<a href="#contact" />}
                className="group w-full"
              >
                <span>Contact Me</span>
                <ArrowRight className="size-4 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                nativeButton={false}
                variant="glass"
                size="lg"
                render={
                  <a
                    href={personal.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="w-full"
              >
                <FileText className="size-4 stroke-[1.75]" />
                <span>View CV</span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
