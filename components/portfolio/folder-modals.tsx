"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SafeMedia } from "@/components/portfolio/safe-media";
import type {
  BlogItem,
  ExperienceItem,
  ProjectItem,
  SoftSkillItem,
  TechnicalSkillItem,
} from "@/data/portfolio";

export type FolderId =
  | "projects"
  | "experience"
  | "blogs"
  | "softSkills"
  | "technicalSkills";

export interface ActiveFileSelection {
  folderId: FolderId;
  folderLabel: string;
  index: number;
  total: number;
  data:
    | ProjectItem
    | ExperienceItem
    | BlogItem
    | SoftSkillItem
    | TechnicalSkillItem;
}

interface FolderModalsProps {
  selection: ActiveFileSelection | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

const cardMotion = (delay: number) => ({
  initial: { opacity: 0, y: 22, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: {
    duration: 0.42,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

function stopProp(e: React.MouseEvent) {
  e.stopPropagation();
}

/* ---------------------------------------------------------------------------
   1. PROJECTS — 3 Isolated Modals (Left Tall + Right Top + Right Bottom)
   --------------------------------------------------------------------------- */
function ProjectModalsLayout({ item }: { item: ProjectItem }) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
      {/* Modal 1: Left Tall Case Study */}
      <motion.div {...cardMotion(0.02)} className="lg:col-span-7 flex" onClick={stopProp}>
        <Card className="flex w-full flex-col justify-between bg-card/85 backdrop-blur-2xl">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="accent">{item.status}</Badge>
              <Badge variant="secondary">{item.period}</Badge>
            </div>
            <div>
              <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {item.title}
              </CardTitle>
              <p className="mt-2 text-base font-medium text-primary">
                {item.tagline}
              </p>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
          </CardHeader>

          <CardContent className="flex-1">
            <ScrollArea className="h-[220px] pr-4 sm:h-[250px]">
              <div className="space-y-3.5">
                {item.story.map((step, i) => (
                  <div
                    key={step.heading}
                    className="rounded-2xl border border-border bg-background/45 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-semibold text-primary">
                        0{i + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-foreground">
                        {step.heading}
                      </h4>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          <CardContent className="flex flex-wrap items-center gap-3 pt-2">
            {item.links.live ? (
              <Button
                nativeButton={false}
                variant="default"
                size="lg"
                render={
                  <a
                    href={item.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="group"
              >
                <span>Launch Live</span>
                <ArrowUpRight className="size-4 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            ) : null}
            {item.links.github ? (
              <Button
                nativeButton={false}
                variant="glass"
                size="lg"
                render={
                  <a
                    href={item.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="group"
              >
                <span>GitHub</span>
                <ArrowUpRight className="size-4 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </motion.div>

      {/* Right Column: 2 Isolated Stacked Windows */}
      <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
        {/* Modal 2: Right-Top Visual (Full-Bleed Top) & Metrics */}
        <motion.div {...cardMotion(0.08)} onClick={stopProp}>
          <Card className="gap-5 pt-0 pb-6 bg-card/85 backdrop-blur-2xl overflow-hidden">
            <SafeMedia
              src={item.image}
              alt={item.title}
              fallbackLabel={item.title}
              contain
              className="w-full rounded-none border-0 border-b border-border bg-muted/20 flex items-center justify-center overflow-hidden"
              imgClassName="w-full h-auto max-h-[480px] object-contain"
            />
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {item.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-border bg-background/45 p-3.5"
                  >
                    <span className="block text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="mt-1 block text-xl font-semibold tracking-tight text-primary">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Modal 3: Right-Bottom Capabilities & Stack */}
        <motion.div {...cardMotion(0.14)} className="flex-1 flex" onClick={stopProp}>
          <Card className="w-full bg-card/85 backdrop-blur-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold uppercase tracking-wider text-primary">
                Stack & Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {item.capabilities.slice(0, 4).map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 text-sm text-foreground/90"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary stroke-[1.75]" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
              <Separator className="bg-border" />
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   2. WORK EXPERIENCE — 2 Isolated Modals (Diagonal Staggered Left & Right)
   --------------------------------------------------------------------------- */
function ExperienceModalsLayout({ item }: { item: ExperienceItem }) {
  const companyInitials = item.company
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Modal 1: Left-Upper Company Identity */}
      <motion.div {...cardMotion(0.03)} className="lg:col-span-5" onClick={stopProp}>
        <Card className="bg-card/85 backdrop-blur-2xl">
          <CardHeader className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-14 border border-border">
                {item.companyLogo ? (
                  <AvatarImage src={item.companyLogo} alt={item.company} />
                ) : null}
                <AvatarFallback className="bg-primary/15 text-base font-semibold text-primary">
                  {companyInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {item.company}
                </h3>
                <p className="text-sm font-medium text-primary">{item.position}</p>
              </div>
            </div>

            {item.image ? (
              <SafeMedia
                src={item.image}
                alt={item.company}
                fallbackLabel={item.company}
                contain
                className="w-full max-h-[360px] bg-muted/20 flex items-center justify-center overflow-hidden"
                imgClassName="w-full h-auto max-h-[360px] object-contain"
              />
            ) : null}

            <div className="flex flex-wrap gap-2">
              <Badge variant="accent" className="gap-1.5">
                <Clock className="size-3.5 stroke-[1.75]" />
                <span>{item.duration}</span>
              </Badge>
              <Badge variant="secondary" className="gap-1.5">
                <MapPin className="size-3.5 stroke-[1.75]" />
                <span>{item.location}</span>
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-base leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal 2: Right-Lower Staggered Impact & Stack */}
      <motion.div
        {...cardMotion(0.11)}
        className="lg:col-span-7 lg:mt-16"
        onClick={stopProp}
      >
        <Card className="bg-card/85 backdrop-blur-2xl">
          <CardHeader>
            <Badge variant="sage" className="mb-2 uppercase tracking-wider">
              Key Deliverables
            </Badge>
            <CardTitle className="text-2xl font-semibold">
              Engineering Impact
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {item.achievements.map((ach, idx) => (
                <div
                  key={ach}
                  className="rounded-2xl border border-border bg-background/45 p-4"
                >
                  <span className="block text-xs font-semibold text-primary">
                    0{idx + 1}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/95">
                    {ach}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="bg-border" />

            <div>
              <span className="mb-3 block text-xs font-medium tracking-wider uppercase text-muted-foreground">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   3. BLOGS — 3 Isolated Modals (Top Wide Header + Bottom Left Reader + Bottom Right Takeaways)
   --------------------------------------------------------------------------- */
function BlogModalsLayout({ item }: { item: BlogItem }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
      {/* Modal 1: Top Full-Width Article Header */}
      <motion.div {...cardMotion(0.02)} className="lg:col-span-12" onClick={stopProp}>
        <Card className="bg-card/85 backdrop-blur-2xl">
          <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{item.category}</Badge>
                <Badge variant="secondary">{item.readTime}</Badge>
                <Badge variant="outline">{item.date}</Badge>
              </div>
              <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {item.title}
              </h3>
            </div>

            {item.image ? (
              <SafeMedia
                src={item.image}
                alt={item.title}
                fallbackLabel={item.category}
                contain
                className="w-full shrink-0 md:w-72 max-h-[260px] bg-muted/20 flex items-center justify-center overflow-hidden"
                imgClassName="w-full h-auto max-h-[260px] object-contain"
              />
            ) : null}
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal 2: Bottom-Left Editorial Reader */}
      <motion.div {...cardMotion(0.09)} className="lg:col-span-7 flex" onClick={stopProp}>
        <Card className="w-full bg-card/85 backdrop-blur-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-primary">
              {item.summary}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                {item.body.map((para) => (
                  <p
                    key={para}
                    className="text-base leading-relaxed text-foreground/90"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal 3: Bottom-Right Takeaways & Action */}
      <motion.div {...cardMotion(0.15)} className="lg:col-span-5 flex" onClick={stopProp}>
        <Card className="flex w-full flex-col justify-between bg-card/85 backdrop-blur-2xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold uppercase tracking-wider text-primary">
              Key Takeaways
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <ul className="space-y-2.5">
              {item.takeaways.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary stroke-[1.75]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Separator className="bg-border" />

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {item.href ? (
              <Button
                nativeButton={false}
                variant="default"
                size="lg"
                render={
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="group w-full"
              >
                <span>Read Full Article</span>
                <ArrowUpRight className="size-4 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   4. SOFT SKILLS — 3 Isolated Modals (Left-Top + Left-Bottom + Right Tall)
   --------------------------------------------------------------------------- */
function SoftSkillModalsLayout({ item }: { item: SoftSkillItem }) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
      {/* Left Column: 2 Isolated Stacked Cards */}
      <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
        {/* Modal 1: Left-Top Mindset Header */}
        <motion.div {...cardMotion(0.02)} onClick={stopProp}>
          <Card className="bg-card/85 backdrop-blur-2xl">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-semibold text-primary">
                  {item.num}
                </span>
                <Badge variant="accent">{item.tagline}</Badge>
              </div>
              {item.image ? (
                <SafeMedia
                  src={item.image}
                  alt={item.title}
                  fallbackLabel={item.title}
                  contain
                  className="w-full max-h-[260px] bg-muted/20 flex items-center justify-center overflow-hidden"
                  imgClassName="w-full h-auto max-h-[260px] object-contain"
                />
              ) : null}
              <CardTitle className="text-3xl font-semibold tracking-tight">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Modal 2: Left-Bottom Strengths Tags */}
        <motion.div {...cardMotion(0.09)} className="flex-1 flex" onClick={stopProp}>
          <Card className="w-full bg-card/85 backdrop-blur-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-primary">
                <Sparkles className="size-4 stroke-[1.75]" />
                <span>Core Focus</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-4 py-1.5 text-sm">
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal 3: Right-Tall Workflow Breakdown */}
      <motion.div {...cardMotion(0.14)} className="lg:col-span-7 flex" onClick={stopProp}>
        <Card className="w-full bg-card/85 backdrop-blur-2xl">
          <CardHeader className="space-y-2">
            <Badge variant="sage" className="uppercase tracking-wider">
              {item.workflowSubtitle}
            </Badge>
            <CardTitle className="text-3xl font-semibold tracking-tight">
              {item.workflowTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {item.points.map((pt, i) => (
              <div
                key={pt.heading}
                className="rounded-2xl border border-border bg-background/45 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    0{i + 1}
                  </span>
                  <h4 className="text-base font-semibold text-foreground">
                    {pt.heading}
                  </h4>
                </div>
                <p className="mt-2 pl-10 text-sm leading-relaxed text-muted-foreground">
                  {pt.detail}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   5. TECHNICAL SKILLS — 4 Isolated Modals (2×2 Spatial Bento Constellation)
   --------------------------------------------------------------------------- */
function TechnicalSkillModalsLayout({ item }: { item: TechnicalSkillItem }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
      {/* Modal 1: Top-Left Domain Overview */}
      <motion.div {...cardMotion(0.02)} className="flex" onClick={stopProp}>
        <Card className="w-full bg-card/85 backdrop-blur-2xl">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="accent">{item.eyebrow}</Badge>
              <Badge variant="sage">{item.experienceLevel}</Badge>
            </div>
            <CardTitle className="text-3xl font-semibold tracking-tight">
              {item.category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal 2: Top-Right Primary Stack Grid */}
      <motion.div {...cardMotion(0.08)} className="flex" onClick={stopProp}>
        <Card className="w-full bg-card/85 backdrop-blur-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-primary">
              <Layers className="size-4 stroke-[1.75]" />
              <span>Core Stack</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {item.primaryStack.map((tech) => (
              <div
                key={tech}
                className="flex items-center justify-center rounded-2xl border border-border bg-background/50 px-3 py-3.5 text-center text-sm font-medium text-foreground"
              >
                {tech}
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal 3: Bottom-Left Architecture Focus */}
      <motion.div {...cardMotion(0.14)} className="flex" onClick={stopProp}>
        <Card className="w-full bg-card/85 backdrop-blur-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold tracking-wider uppercase text-primary">
              Architecture Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {item.architectureFocus.map((focus) => (
                <li
                  key={focus}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary stroke-[1.75]" />
                  <span>{focus}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal 4: Bottom-Right Ecosystem & Companion Tools */}
      <motion.div {...cardMotion(0.2)} className="flex" onClick={stopProp}>
        <Card className="w-full bg-card/85 backdrop-blur-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold tracking-wider uppercase text-primary">
              Ecosystem & Tooling
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2.5">
            {item.ecosystemTools.map((tool) => (
              <Badge
                key={tool}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium"
              >
                {tool}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   MAIN MULTI-WINDOW PORTAL CONTAINER
   --------------------------------------------------------------------------- */
export function FolderModals({
  selection,
  onClose,
  onNavigate,
}: FolderModalsProps) {
  return (
    <Dialog open={Boolean(selection)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
          data-folder-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto outline-none"
          onClick={onClose}
        >
          <DialogPrimitive.Title className="sr-only">
            {selection ? `${selection.folderLabel} file preview` : "File preview"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Isolated floating detail cards for the selected portfolio item.
          </DialogPrimitive.Description>

          {selection ? (
            <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-4 py-6 sm:px-8 sm:py-10">
              {/* Top Floating Control Pill Bar */}
              <div
                className="mb-6 flex flex-wrap items-center justify-between gap-3"
                onClick={stopProp}
              >
                <div className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 backdrop-blur-2xl">
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                    {selection.folderLabel}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {String(selection.index + 1).padStart(2, "0")} /{" "}
                    {String(selection.total).padStart(2, "0")}
                  </span>

                  {selection.total > 1 ? (
                    <div className="ml-2 flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Previous file"
                        onClick={() =>
                          onNavigate(
                            (selection.index - 1 + selection.total) %
                              selection.total
                          )
                        }
                      >
                        <ArrowLeft className="size-4 stroke-[1.75]" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Next file"
                        onClick={() =>
                          onNavigate((selection.index + 1) % selection.total)
                        }
                      >
                        <ArrowRight className="size-4 stroke-[1.75]" />
                      </Button>
                    </div>
                  ) : null}
                </div>

                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  onClick={onClose}
                  className="gap-2"
                >
                  <X className="size-4 stroke-[2]" />
                  <span>Close All</span>
                </Button>
              </div>

              {/* Render Folder-Unique Isolated Multi-Modal Composition */}
              <div key={`${selection.folderId}-${selection.index}`}>
                {selection.folderId === "projects" ? (
                  <ProjectModalsLayout item={selection.data as ProjectItem} />
                ) : null}
                {selection.folderId === "experience" ? (
                  <ExperienceModalsLayout
                    item={selection.data as ExperienceItem}
                  />
                ) : null}
                {selection.folderId === "blogs" ? (
                  <BlogModalsLayout item={selection.data as BlogItem} />
                ) : null}
                {selection.folderId === "softSkills" ? (
                  <SoftSkillModalsLayout
                    item={selection.data as SoftSkillItem}
                  />
                ) : null}
                {selection.folderId === "technicalSkills" ? (
                  <TechnicalSkillModalsLayout
                    item={selection.data as TechnicalSkillItem}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

