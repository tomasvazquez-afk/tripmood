import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <span className={invert ? "eyebrow" : "eyebrow-light"}>{eyebrow}</span> : null}
      <h2 className={cn("text-4xl font-semibold leading-tight sm:text-5xl", invert ? "text-white" : "text-text")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-base leading-7 sm:text-lg", invert ? "text-white/78" : "text-muted")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
