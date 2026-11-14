import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function AboutSection() {
  const { about, personal } = PORTFOLIO_DATA;

  return (
    <section
      id="about"
      className="scroll-mt-24 relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {about.headline}
        </h2>

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
          className="group self-start sm:self-auto"
        >
          <FileText className="size-4 stroke-[1.75]" />
          <span>Resume / CV</span>
          <ArrowRight className="size-4 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>

      <Card className="p-2 sm:p-4">
        <CardContent className="space-y-10 pt-2">
          <p className="max-w-4xl text-xl font-normal leading-relaxed text-foreground/95 sm:text-2xl lg:text-[1.75rem]">
            {about.bio}
          </p>

          <Separator className="bg-border" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-background/40 p-5 backdrop-blur-md transition-colors duration-300 hover:border-primary/40"
              >
                <span className="block text-xs font-medium tracking-wider uppercase text-primary">
                  {item.label}
                </span>
                <span className="mt-2 block text-lg font-medium tracking-tight text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
