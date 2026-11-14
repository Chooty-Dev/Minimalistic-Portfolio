"use client";

import * as React from "react";

export type ArtPreset = "forest" | "sage" | "sand" | "moss" | "cream";

export type ArtRecipe = {
  style: "marble" | "streak";
  colors: string[];
  scale?: number;
  warp?: number;
  angle?: number;
  gloss?: number;
  veins?: number;
};

export type FolderArt = ArtPreset | ArtRecipe | "none";

export type FolderFile = {
  name: string;
  meta?: string;
  art?: ArtPreset | ArtRecipe;
  image?: string;
};

export type FolderMenuItem = {
  label: string;
  onSelect?: () => void;
};

export type GlassFolderProps = {
  label: string;
  meta?: string;
  art?: FolderArt;
  seed?: number;
  image?: string;
  files: FolderFile[];
  action?: "more" | "none";
  menu?: FolderMenuItem[];
  labelPlacement?: "bottom-left" | "top-left" | "top-right";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFileSelect?: (file: FolderFile, index: number) => void;
  width?: number;
  appear?: boolean;
  appearDelay?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Palette-harmonized liquid artwork recipes for the folder back panels:
 * Derived strictly from #0D1B15, #1E3B2F, #7F8C6A, #C8B48A, #F5F0E6.
 */
export const ART_PRESETS: Record<ArtPreset, ArtRecipe> = {
  forest: {
    style: "marble",
    colors: ["#0D1B15", "#1E3B2F", "#476252", "#7F8C6A", "#C8B48A"],
    scale: 0.65,
    warp: 3.1,
    angle: -0.5,
    gloss: 0.42,
    veins: 0.45,
  },
  sage: {
    style: "streak",
    colors: ["#0D1B15", "#1E3B2F", "#7F8C6A", "#A8B194", "#F5F0E6"],
    scale: 0.72,
    warp: 1.5,
    angle: -0.6,
    gloss: 0.2,
    veins: 0,
  },
  sand: {
    style: "marble",
    colors: ["#14241C", "#1E3B2F", "#7F8C6A", "#C8B48A", "#F5F0E6"],
    scale: 0.7,
    warp: 3.4,
    angle: 0.85,
    gloss: 0.48,
    veins: 0.4,
  },
  moss: {
    style: "marble",
    colors: ["#0D1B15", "#1E3B2F", "#385746", "#7F8C6A", "#C8B48A"],
    scale: 0.68,
    warp: 3.2,
    angle: 2.0,
    gloss: 0.45,
    veins: 0.45,
  },
  cream: {
    style: "streak",
    colors: ["#162C22", "#345242", "#7F8C6A", "#C8B48A", "#F5F0E6"],
    scale: 0.7,
    warp: 1.6,
    angle: 0.35,
    gloss: 0.25,
    veins: 0,
  },
};

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = /^[0-9a-f]{6}$/i.test(h) ? parseInt(h, 16) : 0x1e3b2f;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function makeFbm(seed: number): (x: number, y: number, octaves: number) => number {
  const r = rng(seed);
  const perm = new Uint8Array(512);
  const grad = new Float32Array(512);
  const p: number[] = [];
  for (let i = 0; i < 256; i++) p.push(i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    const t = p[i];
    p[i] = p[j];
    p[j] = t;
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  for (let i = 0; i < 256; i++) {
    const a = r() * Math.PI * 2;
    grad[i * 2] = Math.cos(a);
    grad[i * 2 + 1] = Math.sin(a);
  }
  const noise = (x: number, y: number): number => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const X = xi & 255;
    const Y = yi & 255;
    const h00 = perm[X + perm[Y]] * 2;
    const h10 = perm[X + 1 + perm[Y]] * 2;
    const h01 = perm[X + perm[Y + 1]] * 2;
    const h11 = perm[X + 1 + perm[Y + 1]] * 2;
    const d00 = grad[h00] * xf + grad[h00 + 1] * yf;
    const d10 = grad[h10] * (xf - 1) + grad[h10 + 1] * yf;
    const d01 = grad[h01] * xf + grad[h01 + 1] * (yf - 1);
    const d11 = grad[h11] * (xf - 1) + grad[h11 + 1] * (yf - 1);
    const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10);
    const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
    return d00 + u * (d10 - d00) + v * (d01 - d00 + u * (d11 - d01 - d10 + d00));
  };
  return (x, y, octaves) => {
    let sum = 0;
    let amp = 0.5;
    for (let i = 0; i < octaves; i++) {
      sum += amp * noise(x, y);
      const nx = 1.6 * x + 1.2 * y + 7.1;
      y = -1.2 * x + 1.6 * y + 3.3;
      x = nx;
      amp *= 0.5;
    }
    return sum;
  };
}

type ArtJob = {
  width: number;
  height: number;
  pixels: Uint8ClampedArray;
  step: (rows: number) => boolean;
};

function createArtJob(width: number, height: number, recipe: ArtRecipe, seed: number): ArtJob {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const colors = recipe.colors.length >= 2 ? recipe.colors : ["#1E3B2F", "#C8B48A"];
  const stops = colors.map((c, i) => ({ t: i / (colors.length - 1), c: hexToRgb(c) }));
  const scale = recipe.scale ?? 0.7;
  const warp = recipe.warp ?? 3;
  const gloss = recipe.gloss ?? 0.4;
  const veins = recipe.veins ?? 0;
  const streak = recipe.style === "streak";
  const fbm = makeFbm(seed * 977 + 13);
  const r = rng(seed + 1);
  const ox = r() * 50;
  const oy = r() * 50;
  const angle = (recipe.angle ?? 0) + (r() - 0.5) * 0.5;
  const ca = Math.cos(angle);
  const sa = Math.sin(angle);
  const m = Math.min(w, h);
  const gw = Math.ceil(w / 2) + 3;
  const gh = Math.ceil(h / 2) + 3;
  const G = new Float32Array(gw * gh);
  const GQ = new Float32Array(gw * gh);
  const F = new Float32Array(w * h);
  const Q = new Float32Array(w * h);
  const pixels = new Uint8ClampedArray(w * h * 4);
  let row = 0;

  const field = (gy: number) => {
    for (let gx = 0; gx < gw; gx++) {
      const u = ((gx - 1) * 2 - w / 2) / m;
      const v = ((gy - 1) * 2 - h / 2) / m;
      let px = (u * ca - v * sa) * scale;
      let py = (u * sa + v * ca) * scale;
      if (streak) {
        px *= 0.14;
        py *= 2.2;
      }
      px += ox;
      py += oy;
      const qx = fbm(px, py, 3);
      const qy = fbm(px + 5.2, py + 1.3, 3);
      const rx = fbm(px + warp * qx + 1.7, py + warp * qy + 9.2, 3);
      const ry = fbm(px + warp * qx + 8.3, py + warp * qy + 2.8, 3);
      G[gy * gw + gx] = fbm(px + warp * rx, py + warp * ry, 4);
      GQ[gy * gw + gx] = Math.sqrt(qx * qx + qy * qy);
    }
  };

  const upsample = () => {
    const cr = (a: number, b: number, c: number, d: number) => (-a + 9 * b + 9 * c - d) / 16;
    const T = new Float32Array(w * gh);
    for (let gy = 0; gy < gh; gy++) {
      const rIdx = gy * gw;
      for (let x = 0; x < w; x++) {
        const c = (x >> 1) + 1;
        T[gy * w + x] =
          x & 1 ? cr(G[rIdx + c - 1], G[rIdx + c], G[rIdx + c + 1], G[rIdx + c + 2]) : G[rIdx + c];
      }
    }
    for (let y = 0; y < h; y++) {
      const c = (y >> 1) + 1;
      for (let x = 0; x < w; x++) {
        F[y * w + x] =
          y & 1
            ? cr(T[(c - 1) * w + x], T[c * w + x], T[(c + 1) * w + x], T[(c + 2) * w + x])
            : T[c * w + x];
        const gx = (x >> 1) + 1;
        const q0 = GQ[c * gw + gx];
        const qx = x & 1 ? (q0 + GQ[c * gw + gx + 1]) / 2 : q0;
        const q1 =
          y & 1
            ? x & 1
              ? (GQ[(c + 1) * gw + gx] + GQ[(c + 1) * gw + gx + 1]) / 2
              : GQ[(c + 1) * gw + gx]
            : qx;
        Q[y * w + x] = (qx + q1) / 2;
      }
    }
  };

  const colorize = () => {
    const sample: number[] = [];
    const stride = Math.max(1, Math.floor(F.length / 4096));
    for (let i = 0; i < F.length; i += stride) sample.push(F[i]);
    sample.sort((a, b) => a - b);
    const lo = sample[Math.floor(sample.length * 0.02)];
    const hi = sample[Math.floor(sample.length * 0.98)];
    const k = 1 / (hi - lo || 1);
    const lx = -0.55;
    const ly = -0.65;
    const lz = 0.52;
    const slope = k * m * 0.012;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        let t = (F[i] - lo) * k;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        let j = 1;
        while (j < stops.length - 1 && stops[j].t < t) j++;
        const a = stops[j - 1];
        const b = stops[j];
        let f = (t - a.t) / (b.t - a.t || 1);
        f = f < 0 ? 0 : f > 1 ? 1 : f;
        f = f * f * (3 - 2 * f);
        const gx = (F[x < w - 1 ? i + 1 : i] - F[x > 0 ? i - 1 : i]) * slope;
        const gy = (F[y < h - 1 ? i + w : i] - F[y > 0 ? i - w : i]) * slope;
        const nd = (-gx * lx - gy * ly + lz) / Math.sqrt(gx * gx + gy * gy + 1);
        const spec = Math.pow(nd > 0 ? nd : 0, 24) * gloss * 255;
        const silk = 1 + 0.035 * Math.sin(t * 150 + Q[i] * 24);
        const vein = veins * Math.max(0, 1 - Math.abs(Q[i] - 0.42) * 14) * 0.6;
        const lit = (0.82 + 0.28 * nd) * silk * (1 - vein);
        pixels[i * 4] = (a.c[0] + (b.c[0] - a.c[0]) * f) * lit + spec;
        pixels[i * 4 + 1] = (a.c[1] + (b.c[1] - a.c[1]) * f) * lit + spec;
        pixels[i * 4 + 2] = (a.c[2] + (b.c[2] - a.c[2]) * f) * lit + spec;
        pixels[i * 4 + 3] = 255;
      }
    }
  };

  const step = (rows: number): boolean => {
    if (row >= gh) return true;
    const end = Math.min(gh, row + Math.max(1, rows));
    while (row < end) field(row++);
    if (row < gh) return false;
    upsample();
    colorize();
    return true;
  };

  return { width: w, height: h, pixels, step };
}

function fanSlot(index: number, count: number): number {
  return count <= 1 ? 0 : (index / (count - 1)) * 2 - 1;
}

const recipeOf = (art: ArtPreset | ArtRecipe): ArtRecipe =>
  typeof art === "string" ? ART_PRESETS[art] : art;

type Painted = HTMLCanvasElement;
const artCache = new Map<string, Promise<Painted>>();
const queue: { job: ArtJob; priority: number; done: (c: Painted) => void }[] = [];
let pumping = false;

function pump() {
  if (pumping) return;
  pumping = true;
  const tick = () => {
    const until = performance.now() + 4.5;
    while (queue.length && performance.now() < until) {
      const head = queue[0];
      if (head.job.step(4)) {
        queue.shift();
        const c = document.createElement("canvas");
        c.width = head.job.width;
        c.height = head.job.height;
        c.getContext("2d")?.putImageData(
          new ImageData(
            head.job.pixels as Uint8ClampedArray<ArrayBuffer>,
            c.width,
            c.height
          ),
          0,
          0
        );
        head.done(c);
      }
    }
    if (queue.length) requestAnimationFrame(tick);
    else pumping = false;
  };
  requestAnimationFrame(tick);
}

function paint(
  recipe: ArtRecipe,
  seed: number,
  w: number,
  h: number,
  priority: number
): Promise<Painted> {
  const key = JSON.stringify([recipe, seed, w, h]);
  let p = artCache.get(key);
  if (!p) {
    p = new Promise<Painted>((done) => {
      let at = queue.length;
      while (at > 1 && queue[at - 1].priority > priority) at--;
      queue.splice(at, 0, { job: createArtJob(w, h, recipe, seed), priority, done });
      pump();
    });
    artCache.set(key, p);
  }
  return p;
}

function ArtCanvas({
  art,
  seed,
  w,
  h,
  density,
  priority,
  fluid,
  className,
}: {
  art: ArtPreset | ArtRecipe;
  seed: number;
  w: number;
  h: number;
  density: number;
  priority: number;
  fluid?: boolean;
  className?: string;
}) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const recipe = recipeOf(art);
  const key = JSON.stringify(recipe);
  const pw = Math.round(w * density);
  const ph = Math.round(h * density);
  const jobKey = `${key}|${seed}|${pw}|${ph}|${priority}`;
  const [readyJobKey, setReadyJobKey] = React.useState<string | null>(null);
  const ready = readyJobKey === jobKey;

  React.useEffect(() => {
    let live = true;
    paint(JSON.parse(key) as ArtRecipe, seed, pw, ph, priority).then((src) => {
      const c = ref.current;
      if (!live || !c) return;
      c.width = src.width;
      c.height = src.height;
      c.getContext("2d")?.drawImage(src, 0, 0);
      setReadyJobKey(jobKey);
    });
    return () => {
      live = false;
    };
  }, [key, seed, pw, ph, priority, jobKey]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      data-ready={ready || undefined}
      style={
        fluid
          ? { width: "100%", height: "100%", maxWidth: "none" }
          : { width: w, height: h, maxWidth: "none" }
      }
    />
  );
}

const W = 340;
const H = 272;
const FRONT_TOP = 74;
const FRONT_H = H - FRONT_TOP;
const SHEET_W = 272;
const SHEET_H = 162;

function SheetArtwork({
  file,
  density,
}: {
  file: FolderFile;
  density: number;
}) {
  const [failedSrc, setFailedSrc] = React.useState<string | null>(null);
  const src = file.image?.trim() || "";
  const canRenderImage = src.length > 0 && failedSrc !== src;

  if (canRenderImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="gf-sheet-art"
        src={src}
        alt=""
        width={SHEET_W}
        height={SHEET_H}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailedSrc(src)}
      />
    );
  }

  if (file.art) {
    return (
      <ArtCanvas
        className="gf-sheet-art"
        art={file.art}
        seed={hashString(file.name) % 997}
        w={SHEET_W}
        h={SHEET_H}
        density={Math.min(density, 0.45)}
        priority={1}
        fluid
      />
    );
  }

  return (
    <span className="gf-lines" aria-hidden="true">
      <i style={{ width: "84%" }} />
      <i style={{ width: "92%" }} />
      <i style={{ width: "66%" }} />
      <i style={{ width: "86%" }} />
      <i style={{ width: "44%" }} />
    </span>
  );
}

const BACK_PATH =
  "M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z";
const FRONT_PATH =
  "M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 " +
  (FRONT_H - 22) +
  "A22 22 0 0 1 318 " +
  FRONT_H +
  "L22 " +
  FRONT_H +
  "A22 22 0 0 1 0 " +
  (FRONT_H - 22) +
  "Z";

const MAX_VISIBLE = 5;

export default function GlassFolder({
  label,
  meta,
  art = "forest",
  seed = 3,
  image,
  files,
  action = "more",
  menu = [],
  labelPlacement = "bottom-left",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onFileSelect,
  width,
  appear = true,
  appearDelay = 0,
  className,
  style,
}: GlassFolderProps) {
  const uid = React.useId().replace(/:/g, "");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const filesRef = React.useRef<HTMLDivElement>(null);
  const hitRef = React.useRef<HTMLButtonElement>(null);
  const keyRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = openProp ?? openState;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenState(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [entered, setEntered] = React.useState(!appear);

  const density = 0.45;

  React.useEffect(() => {
    if (!appear) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setEntered(true);
      return;
    }
    let t = 0;
    const fallbackTimer = window.setTimeout(() => setEntered(true), 500 + appearDelay);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        window.clearTimeout(fallbackTimer);
        t = window.setTimeout(() => setEntered(true), appearDelay);
      },
      { threshold: 0.01, rootMargin: "160px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
      window.clearTimeout(fallbackTimer);
    };
  }, [appear, appearDelay]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const write = () => {
      raf = 0;
      el.style.setProperty("--gf-px", px.toFixed(3));
      el.style.setProperty("--gf-py", py.toFixed(3));
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(write);
    };
    const leave = () => {
      px = 0;
      py = 0;
      if (!raf) raf = requestAnimationFrame(write);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  React.useEffect(() => {
    filesRef.current?.toggleAttribute("inert", !open);
  }, [open]);

  React.useEffect(() => {
    if (!open && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // If a floating multi-modal overlay is active, let the modal handle Escape first.
      if (document.querySelector("[data-folder-modal]")) return;
      if (menuOpen) {
        setMenuOpen(false);
        keyRef.current?.focus();
      } else {
        setOpen(false);
        hitRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (t instanceof Element && t.closest("[data-folder-modal]")) return;
      if (menuOpen && !menuRef.current?.contains(t) && !keyRef.current?.contains(t)) {
        setMenuOpen(false);
      }
      if (open && !menuOpen && !rootRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, menuOpen, setOpen]);

  React.useEffect(() => {
    if (menuOpen && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      menuRef.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus({ preventScroll: true });
    }
  }, [menuOpen]);

  const menuItems: FolderMenuItem[] = [
    { label: open ? "Close folder" : "Open folder", onSelect: () => setOpen(!open) },
    ...menu,
  ];

  const onMenuKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? []
    );
    const at = items.indexOf(document.activeElement as HTMLElement);
    const go = (i: number) => {
      e.preventDefault();
      items[(i + items.length) % items.length]?.focus();
    };
    if (e.key === "ArrowDown") go(at + 1);
    else if (e.key === "ArrowUp") go(at - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(items.length - 1);
    else if (e.key === "Tab") setMenuOpen(false);
  };

  const visible = files.slice(0, MAX_VISIBLE);
  const count = files.length;
  const metaLine = meta ?? count + (count === 1 ? " file" : " files");

  return (
    <div
      ref={rootRef}
      className={"gf-root" + (className ? " " + className : "")}
      data-open={open || undefined}
      data-entered={entered || undefined}
      data-place={labelPlacement}
      style={
        width !== undefined
          ? ({ "--gf-k": String(width / W), ...style } as React.CSSProperties)
          : style
      }
    >
      <div className="gf-stage">
        <div className="gf-layer-back" aria-hidden="true">
          <div className="gf-tilt">
            <div className="gf-shadow" />

            <div
              className="gf-back"
              style={{ clipPath: "path('" + BACK_PATH + "')" }}
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="gf-art"
                  src={image}
                  alt=""
                  width={W + 24}
                  height={H + 24}
                  draggable={false}
                />
              ) : art !== "none" ? (
                <ArtCanvas
                  className="gf-art"
                  art={art}
                  seed={seed}
                  w={W + 24}
                  h={H + 24}
                  density={density}
                  priority={0}
                />
              ) : null}
              <div className="gf-back-sheen" />
            </div>
            <svg
              className="gf-rim gf-back-rim"
              viewBox={"0 0 " + W + " " + H}
            >
              <path d={BACK_PATH} />
            </svg>
          </div>
        </div>

        <div
          ref={filesRef}
          className="gf-files"
          aria-label={label + " contents"}
        >
          {visible.map((file, v) => {
            const slot = fanSlot(v, visible.length);
            const jitter = rng(hashString(file.name) + v);
            const picture = !!(file.art || (file.image && file.image.trim().length > 0));

            return (
              <button
                key={file.name + v}
                type="button"
                className={"gf-sheet" + (picture ? " gf-sheet--art" : "")}
                style={
                  {
                    "--gf-slot": slot,
                    "--gf-depth": visible.length - 1 - v,
                    "--gf-jx": ((jitter() - 0.5) * 10).toFixed(2) + "px",
                    "--gf-jr": ((jitter() - 0.5) * 3.2).toFixed(2) + "deg",
                    zIndex: v + 1,
                  } as React.CSSProperties
                }
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect?.(file, v);
                }}
              >
                <span className="gf-sheet-inner">
                  <SheetArtwork file={file} density={density} />
                  <span className="gf-sheet-head">
                    <span className="gf-sheet-name">{file.name}</span>
                    {file.meta ? <span className="gf-sheet-meta">{file.meta}</span> : null}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="gf-layer-front" aria-hidden="true">
          <div className="gf-tilt">
            <div className="gf-front">
              <div className="gf-tint" />
              <div className="gf-spec" />
              <svg
                className="gf-rim gf-front-rim"
                viewBox={"0 0 " + W + " " + FRONT_H}
              >
                <path className="gf-front-svg-fill" d={FRONT_PATH} />
                <path d={FRONT_PATH} />
              </svg>
              <div className="gf-label">
                <span className="gf-title">{label}</span>
                <span className="gf-meta">{metaLine}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          ref={hitRef}
          type="button"
          className="gf-hit"
          aria-expanded={open}
          aria-label={
            (open ? "Close " : "Open ") +
            label +
            ", " +
            count +
            (count === 1 ? " file" : " files")
          }
          onClick={() => {
            setMenuOpen(false);
            setOpen(!open);
          }}
        >
          <span className="sr-only">{open ? "Close " + label : "Open " + label}</span>
        </button>

        {action === "more" ? (
          <>
            <button
              ref={keyRef}
              type="button"
              className="gf-key gf-key--more"
              aria-label={"Options for " + label}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-controls={"gf-menu-" + uid}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((m) => !m);
              }}
            >
              <svg className="gf-glyph gf-glyph--more" viewBox="0 0 24 6" aria-hidden="true">
                <circle cx="4" cy="3" r="2.1" />
                <circle cx="12" cy="3" r="2.1" />
                <circle cx="20" cy="3" r="2.1" />
              </svg>
            </button>

            <div
              ref={menuRef}
              id={"gf-menu-" + uid}
              role="menu"
              aria-label={label + " options"}
              aria-hidden={!menuOpen || undefined}
              className="gf-menu"
              data-open={menuOpen || undefined}
              onKeyDown={onMenuKey}
            >
              {menuItems.map((item, i) => (
                <button
                  key={item.label + i}
                  type="button"
                  role="menuitem"
                  tabIndex={menuOpen ? 0 : -1}
                  disabled={!menuOpen}
                  className="gf-menu-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    keyRef.current?.focus({ preventScroll: true });
                    item.onSelect?.();
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

