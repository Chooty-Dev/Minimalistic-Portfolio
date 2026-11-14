import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function SiteFooter() {
  const { personal, socials } = PORTFOLIO_DATA;

  return (
    <footer className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-10 pb-14 sm:px-8 lg:px-12">
      <div className="rounded-3xl border border-border bg-card/55 p-6 backdrop-blur-xl sm:p-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-medium tracking-wider uppercase text-primary">
              {personal.role}
            </span>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {personal.name}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {socials.map((social) => (
              <Button
                key={social.name}
                nativeButton={false}
                variant="ghost"
                size="sm"
                render={
                  <a
                    href={social.url}
                    target={social.name === "Email" ? undefined : "_blank"}
                    rel={
                      social.name === "Email" ? undefined : "noopener noreferrer"
                    }
                  />
                }
                className="group"
              >
                <span>{social.name}</span>
                <ArrowUpRight className="size-3.5 stroke-[1.75] opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            ))}

            <Button
              nativeButton={false}
              variant="glass"
              size="sm"
              render={<a href="#home" />}
              className="group"
            >
              <span>Top</span>
              <ArrowUp className="size-3.5 stroke-[1.75] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col justify-between gap-3 text-xs tracking-wider uppercase text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {personal.copyrightYear} {personal.name}
          </span>
          <span>{personal.location}</span>
        </div>
      </div>
    </footer>
  );
}

