"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SafeMedia } from "@/components/portfolio/safe-media";
import { PORTFOLIO_DATA, type SocialLink } from "@/data/portfolio";

function SocialBrandSvg({ name }: { name: SocialLink["name"] }) {
  const clipId = useId().replace(/:/g, "");

  if (name === "Facebook") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 666.667 666.667"
        className="size-full"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d="M0 700h700V0H0Z" />
          </clipPath>
        </defs>
        <g
          clipPath={`url(#${clipId})`}
          transform="matrix(1.33333 0 0 -1.33333 -133.333 800)"
        >
          <path
            d="M0 0c0 138.071-111.929 250-250 250S-500 138.071-500 0c0-117.245 80.715-215.622 189.606-242.638v166.242h-51.552V0h51.552v32.919c0 85.092 38.508 124.532 122.048 124.532 15.838 0 43.167-3.105 54.347-6.211V81.986c-5.901.621-16.149.932-28.882.932-40.993 0-56.832-15.528-56.832-55.9V0h81.659l-14.028-76.396h-67.631v-171.773C-95.927-233.218 0-127.818 0 0"
            style={{ fill: "#0866ff", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
            transform="translate(600 350)"
          />
          <path
            d="m0 0 14.029 76.396H-67.63v27.019c0 40.372 15.838 55.899 56.831 55.899 12.733 0 22.981-.31 28.882-.931v69.253c-11.18 3.106-38.509 6.212-54.347 6.212-83.539 0-122.048-39.441-122.048-124.533V76.396h-51.552V0h51.552v-166.242a250.559 250.559 0 0 1 60.394-7.362c10.254 0 20.358.632 30.288 1.831V0Z"
            style={{ fill: "#fff", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
            transform="translate(447.918 273.604)"
          />
        </g>
      </svg>
    );
  }

  if (name === "GitHub") {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
          transform="scale(64)"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (name === "LinkedIn") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 256"
        className="size-full"
        aria-hidden="true"
      >
        <path
          d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
          fill="#0A66C2"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 49.4 512 399.42"
      className="size-full"
      aria-hidden="true"
    >
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path
            fill="#4285f4"
            d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
          />
          <path
            fill="#34a853"
            d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
          />
          <path
            fill="#fbbc04"
            d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
          />
        </g>
        <path
          fill="#ea4335"
          d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
        />
        <path
          fill="#c5221f"
          fillRule="nonzero"
          d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
        />
      </g>
    </svg>
  );
}

export function ContactSection() {
  const { personal, socials } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard permissions restricted
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <Card className="p-3.5 sm:p-8 lg:p-10">
        <CardContent className="grid grid-cols-1 items-center gap-7 px-0.5 py-1 sm:gap-8 sm:px-1 sm:py-2 lg:grid-cols-12 lg:gap-10">
          {/* Left 1/3: Core headline preserved + quick copy & CV actions */}
          <div className="flex flex-col items-start gap-6 lg:col-span-4">
            <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl xl:text-[3.35rem] leading-[1.02] mt-4 md:mt-0">
              Let&apos;s build
              <br />
              something real.
            </h2>

            <div className="flex flex-wrap items-center gap-2.5">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      variant="glass"
                      size="default"
                      onClick={handleCopy}
                      aria-label="Copy email address"
                    />
                  }
                >
                  {copied ? (
                    <Check className="size-4 text-primary stroke-[2]" />
                  ) : (
                    <Copy className="size-4 stroke-[1.75]" />
                  )}
                  <span>{copied ? "Copied email" : "Copy Email"}</span>
                </TooltipTrigger>
                <TooltipContent>
                  {copied ? "Email copied to clipboard" : personal.email}
                </TooltipContent>
              </Tooltip>

              <Button
                nativeButton={false}
                variant="outline"
                size="default"
                render={
                  <a
                    href={personal.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="group"
              >
                <FileText className="size-4 stroke-[1.75]" />
                <span>View CV</span>
                <ArrowUpRight className="size-4 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </div>

          {/* Right 2/3: Verified Portrait + Direct Social & Email Channels */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 items-center gap-5 rounded-3xl border border-border bg-background/35 p-2.5 backdrop-blur-xl sm:gap-6 sm:p-6 md:grid-cols-12 md:gap-7">
              <div className="flex justify-center md:col-span-5">
                <SafeMedia
                  src={personal.contactImage}
                  alt={`${personal.name} (${personal.alternateName}) — Verified`}
                  fallbackIcon="user"
                  contain
                  frameless
                  className="h-56 w-52 p-2 sm:h-64 sm:w-60 lg:h-64 lg:w-60 xl:h-72 xl:w-[17rem]"
                  imgClassName="drop-shadow-md"
                />
              </div>

              <div className="flex flex-col mb-4 md:mb-0 gap-2.5 sm:gap-3 md:col-span-7">
                {socials.map((social) => {
                  const isMail = social.name === "Email";
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      className="group flex w-full items-center gap-2.5 rounded-full px-1.5 py-2 transition-all duration-300 hover:scale-[1.01] hover:border-primary/60 hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-4 sm:px-4 sm:py-3"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full sm:size-9">
                        <SocialBrandSvg name={social.name} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] font-medium tracking-wider uppercase text-muted-foreground sm:text-[11px]">
                          {social.name}
                        </span>
                        <span className="block truncate text-[12.5px] font-semibold tracking-tight text-foreground sm:text-sm xl:text-base">
                          {social.handle}
                        </span>
                      </span>

                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background/65 text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-primary-foreground sm:size-9">
                        <ArrowUpRight className="size-3.5 stroke-[1.8] sm:size-4" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
