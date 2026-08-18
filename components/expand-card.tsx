type ExpandCardProps = {
  title: string;
  line: string;
  size?: "large" | "small";
};

export function ExpandCard({ title, line, size = "small" }: ExpandCardProps) {
  const isLarge = size === "large";

  return (
    <details className="h-full border border-line bg-paper open:bg-slot">
      <summary
        className={
          isLarge
            ? "min-h-48 cursor-pointer list-none px-6 py-10 text-3xl font-medium tracking-tight md:px-8 md:py-14 md:text-4xl"
            : "cursor-pointer list-none px-5 py-6 text-base font-medium tracking-tight"
        }
      >
        {title}
      </summary>
      <p
        className={
          isLarge
            ? "px-6 pb-10 text-base leading-relaxed text-muted md:px-8"
            : "px-5 pb-6 text-sm leading-relaxed text-muted"
        }
      >
        {line}
      </p>
    </details>
  );
}
