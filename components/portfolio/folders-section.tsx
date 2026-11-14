"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import GlassFolder, {
  type ArtPreset,
  type FolderFile,
} from "@/components/portfolio/glass-folder";
import {
  FolderModals,
  type ActiveFileSelection,
  type FolderId,
} from "@/components/portfolio/folder-modals";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface MobileEntry {
  title: string;
  subtitle: string;
  image?: string;
}

interface FolderConfig {
  id: FolderId;
  label: string;
  art: ArtPreset;
  seed: number;
  files: FolderFile[];
  mobileEntries: MobileEntry[];
  items: readonly ActiveFileSelection["data"][];
}

function MobileEntryThumb({
  src,
  alt,
  index,
}: {
  src?: string;
  alt: string;
  index: number;
}) {
  const [failedSrc, setFailedSrc] = React.useState<string | null>(null);
  const trimmed = src?.trim() || "";
  const canShowImage = trimmed.length > 0 && failedSrc !== trimmed;

  if (canShowImage) {
    return (
      <span className="flex size-12 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={trimmed}
          alt={alt}
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          onError={() => setFailedSrc(trimmed)}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background/55 text-xs font-semibold tracking-wider text-primary"
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

export function FoldersSection() {
  const [openFolderId, setOpenFolderId] = React.useState<FolderId | null>(null);
  const [selection, setSelection] = React.useState<ActiveFileSelection | null>(
    null
  );

  const folders: FolderConfig[] = React.useMemo(
    () => [
      {
        id: "projects",
        label: "Projects",
        art: "forest",
        seed: 7,
        items: PORTFOLIO_DATA.projects,
        files: PORTFOLIO_DATA.projects.map((p) => ({
          name: p.title,
          meta: p.status,
          image: p.image || undefined,
          art: "forest",
        })),
        mobileEntries: PORTFOLIO_DATA.projects.map((p) => ({
          title: p.title,
          subtitle: `${p.status} · ${p.period}`,
          image: p.image || undefined,
        })),
      },
      {
        id: "experience",
        label: "Work Experience",
        art: "sage",
        seed: 14,
        items: PORTFOLIO_DATA.experience,
        files: PORTFOLIO_DATA.experience.map((e) => ({
          name: e.company,
          meta: e.location,
          image: e.image || e.companyLogo || undefined,
          art: "sage",
        })),
        mobileEntries: PORTFOLIO_DATA.experience.map((e) => ({
          title: e.company,
          subtitle: `${e.position} · ${e.location}`,
          image: e.image || e.companyLogo || undefined,
        })),
      },
      {
        id: "blogs",
        label: "Blogs",
        art: "sand",
        seed: 23,
        items: PORTFOLIO_DATA.blogs,
        files: PORTFOLIO_DATA.blogs.map((b) => ({
          name: b.title,
          meta: b.readTime,
          image: b.image || undefined,
          art: "sand",
        })),
        mobileEntries: PORTFOLIO_DATA.blogs.map((b) => ({
          title: b.title,
          subtitle: `${b.category} · ${b.readTime}`,
          image: b.image || undefined,
        })),
      },
      {
        id: "softSkills",
        label: "Soft Skills",
        art: "moss",
        seed: 31,
        items: PORTFOLIO_DATA.softSkills,
        files: PORTFOLIO_DATA.softSkills.map((s) => ({
          name: s.title,
          meta: s.num.replace(".", ""),
          image: s.image || undefined,
          art: "moss",
        })),
        mobileEntries: PORTFOLIO_DATA.softSkills.map((s) => ({
          title: s.title,
          subtitle: s.tagline,
          image: s.image || undefined,
        })),
      },
      {
        id: "technicalSkills",
        label: "Technical Skills",
        art: "cream",
        seed: 42,
        items: PORTFOLIO_DATA.technicalSkills,
        files: PORTFOLIO_DATA.technicalSkills.map((t) => ({
          name: t.category,
          meta: `${t.primaryStack.length} tools`,
          art: "cream",
        })),
        mobileEntries: PORTFOLIO_DATA.technicalSkills.map((t) => ({
          title: t.category,
          subtitle: t.primaryStack.slice(0, 3).join(" · "),
        })),
      },
    ],
    []
  );

  const openFileModal = (folder: FolderConfig, index: number) => {
    const item = folder.items[index];
    if (!item) return;
    setSelection({
      folderId: folder.id,
      folderLabel: folder.label,
      index,
      total: folder.items.length,
      data: item,
    });
  };

  const handleNavigate = (nextIndex: number) => {
    if (!selection) return;
    const folder = folders.find((f) => f.id === selection.folderId);
    if (!folder) return;
    openFileModal(folder, nextIndex);
  };

  return (
    <section
      id="folders"
      className="scroll-mt-24 relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      {/* Mobile heading (< 768px): simple, clean, minimal sections */}
      <div className="mb-8 md:hidden">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Work &amp; craft.
        </h2>
      </div>

      {/* Desktop / tablet heading (>= 768px): interactive glass folders */}
      <div className="mb-12 hidden md:block">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Open a folder.
        </h2>
      </div>

      {/* Mobile Minimal Sections (< 768px — pure native buttons, zero folder hit-test bugs) */}
      <div className="space-y-9 md:hidden">
        {folders.map((folder) => (
          <div key={folder.id} className="space-y-3">
            <div className="flex items-center justify-between border-b border-border/70 pb-2.5">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-primary">
                {folder.label}
              </h3>
              <Badge variant="secondary" className="text-[11px]">
                {String(folder.mobileEntries.length).padStart(2, "0")}
              </Badge>
            </div>

            <div className="space-y-2.5">
              {folder.mobileEntries.map((entry, fileIdx) => (
                <button
                  key={`${folder.id}-${entry.title}-${fileIdx}`}
                  type="button"
                  onClick={() => openFileModal(folder, fileIdx)}
                  className="group flex w-full items-center gap-3.5 rounded-3xl border border-border bg-card/70 p-3.5 text-left backdrop-blur-xl transition-all duration-200 hover:border-primary/50 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MobileEntryThumb
                    src={entry.image}
                    alt={entry.title}
                    index={fileIdx}
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold tracking-tight text-foreground">
                      {entry.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-medium text-muted-foreground">
                      {entry.subtitle}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background/55 text-muted-foreground transition-colors duration-200 group-hover:border-primary/50 group-hover:text-primary"
                  >
                    <ArrowUpRight className="size-4 stroke-[1.75]" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Glass Folders (>= 768px) */}
      <div className="hidden md:flex flex-wrap items-end justify-center gap-x-14 gap-y-24 pt-16">
        {folders.map((folder, idx) => (
          <div key={folder.id} className="flex flex-col items-center">
            <GlassFolder
              label={folder.label}
              art={folder.art}
              seed={folder.seed}
              files={folder.files}
              appearDelay={idx * 70}
              open={openFolderId === folder.id}
              onOpenChange={(isOpen) =>
                setOpenFolderId(isOpen ? folder.id : null)
              }
              onFileSelect={(_, fileIdx) => openFileModal(folder, fileIdx)}
              menu={[
                {
                  label: "Inspect first file",
                  onSelect: () => {
                    setOpenFolderId(folder.id);
                    openFileModal(folder, 0);
                  },
                },
              ]}
            />
          </div>
        ))}
      </div>

      <FolderModals
        selection={selection}
        onClose={() => setSelection(null)}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
