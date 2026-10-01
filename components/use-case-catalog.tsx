import {
  useCasePackages,
  type UseCaseModule,
  type UseCasePackage,
} from "@/lib/use-cases";

function ModuleCopy({ item }: { item: UseCaseModule }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
        {item.badge ? (
          <span className="border border-line px-1.5 py-0.5 text-xs text-muted">
            {item.badge}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.example}</p>
      <p className="mt-1 text-sm leading-relaxed">{item.whatItDoes}</p>
    </>
  );
}

function ModuleCard({
  item,
  accent,
}: {
  item: UseCaseModule;
  accent: string;
}) {
  return (
    <article
      className="border border-line border-l-2 bg-paper px-5 py-5"
      style={{ borderLeftColor: accent }}
    >
      <ModuleCopy item={item} />
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

  return (
    <div className="mt-6 space-y-3">
      {chunks.map((items) => (
        <div
          key={items.map((item) => item.title).join("|")}
          className="grid gap-3 md:grid-cols-2"
        >
          {items.map((item) => (
            <ModuleCard key={item.title} item={item} accent={pkg.accent} />
          ))}
        </div>
      ))}
    </div>
  );
}

function PackageFlow({ pkg }: { pkg: UseCasePackage }) {
  return (
    <div
      className="mt-6 border border-line border-t-2 bg-paper px-5 md:px-8"
      style={{ borderTopColor: pkg.accent }}
    >
      <ol>
        {pkg.modules.map((item, index) => (
          <li
            key={item.title}
            className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 border-t border-line py-5 first:border-t-0"
          >
            <span className="pt-0.5 text-sm text-muted tabular-nums">
              {index + 1}
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
    <div className="mt-16 space-y-16">
      {useCasePackages.map((pkg) => (
        <section key={pkg.id} aria-labelledby={`${pkg.id}-heading`}>
          <div className="flex items-center gap-3">
            <span
              className="size-2.5 shrink-0"
              style={{ backgroundColor: pkg.accent }}
              aria-hidden
            />
            <h2
              id={`${pkg.id}-heading`}
              className="text-2xl font-medium tracking-tight"
            >
              {pkg.name}
            </h2>
          </div>
          {"line" in pkg && pkg.line ? (
            <p className="mt-3 text-sm text-muted">{pkg.line}</p>
          ) : null}
          {pkg.presentation === "flow" ? (
            <PackageFlow pkg={pkg} />
          ) : (
            <PackageCards pkg={pkg} />
          )}
        </section>
      ))}
    </div>
  );
}
