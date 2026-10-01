import {
  useCasePackages,
  type UseCaseModule,
  type UseCasePackage,
} from "@/lib/use-cases";

function ModuleCopy({
  item,
  dense = false,
}: {
  item: UseCaseModule;
  dense?: boolean;
}) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3
          className={`font-medium tracking-[-0.03em] text-[var(--uc-bone)] ${
            dense ? "text-base" : "text-lg md:text-xl"
          }`}
        >
          {item.title}
        </h3>
        {item.badge ? (
          <span className="border border-[var(--uc-line)] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--uc-ash)]">
            {item.badge}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[var(--uc-ash)]">{item.example}</p>
    </>
  );
}

function ModuleCard({
  item,
  accent,
  className = "",
  dense = false,
}: {
  item: UseCaseModule;
  accent: string;
  className?: string;
  dense?: boolean;
}) {
  return (
    <article
      className={`use-cases-panel border-l-[3px] px-5 ${dense ? "py-4" : "py-5"} ${className}`}
      style={{ borderLeftColor: accent }}
    >
      <ModuleCopy item={item} dense={dense} />
    </article>
  );
}

function cardChunks(modules: readonly UseCaseModule[]) {
  const chunks: UseCaseModule[][] = [];
  let buffer: UseCaseModule[] = [];

  const flush = () => {
    if (buffer.length === 0) return;
    chunks.push(buffer);
    buffer = [];
  };

  for (let index = 0; index < modules.length; index += 1) {
    const current = modules[index];
    const next = modules[index + 1];
    if (current.pair && next?.pair === current.pair) {
      flush();
      chunks.push([current, next]);
      index += 1;
      continue;
    }
    buffer.push(current);
  }

  flush();
  return chunks;
}

function PackageCards({ pkg }: { pkg: UseCasePackage }) {
  const chunks = cardChunks(pkg.modules);
  const dense = pkg.density === "tight";

  return (
    <div className={dense ? "grid gap-2 sm:grid-cols-2" : "grid gap-3 md:grid-cols-2"}>
      {chunks.flatMap((items) =>
        items.map((item, index) => {
          const spansRow =
            !dense &&
            (items.length === 1 ||
              (items.length % 2 === 1 && index === items.length - 1));
          return (
            <ModuleCard
              key={item.title}
              item={item}
              accent={pkg.accent}
              dense={dense}
              className={spansRow ? "md:col-span-2" : ""}
            />
          );
        }),
      )}
    </div>
  );
}

function PackageFlow({ pkg }: { pkg: UseCasePackage }) {
  return (
    <div
      className="use-cases-panel border-l-[3px]"
      style={{ borderLeftColor: pkg.accent }}
    >
      {pkg.line ? (
        <p className="border-b border-[var(--uc-line)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--uc-ash)]">
          {pkg.line}
        </p>
      ) : null}
      <ol>
        {pkg.modules.map((item, index) => (
          <li
            key={item.title}
            className="use-cases-step grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 border-t border-[var(--uc-line)] px-5 py-5 first:border-t-0 md:gap-x-5"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <span className="pt-1 font-mono text-xs tabular-nums text-[var(--uc-signal)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <ModuleCopy item={item} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function UseCaseCatalog() {
  return (
    <div className="mt-14 md:mt-16">
      {useCasePackages.map((pkg, index) => (
        <section
          key={pkg.id}
          aria-labelledby={`${pkg.id}-heading`}
          className="grid grid-cols-1 gap-6 border-t border-[var(--uc-line)] py-10 md:grid-cols-12 md:gap-8 md:py-12"
        >
          <div className="md:sticky md:top-24 md:col-span-3 md:self-start">
            <p className="font-mono text-xs tabular-nums text-[var(--uc-signal)]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span
                className="size-1.5 shrink-0"
                style={{ backgroundColor: pkg.accent }}
                aria-hidden
              />
              <h2
                id={`${pkg.id}-heading`}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--uc-bone)]"
              >
                {pkg.name}
              </h2>
            </div>
          </div>
          <div className="md:col-span-9">
            {pkg.presentation === "flow" ? (
              <PackageFlow pkg={pkg} />
            ) : (
              <PackageCards pkg={pkg} />
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
