import { moduleId, useCaseSections } from "@/lib/use-cases";

export function UseCaseCatalog() {
  return (
    <div className="mt-8 md:mt-10">
      {useCaseSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="scroll-mt-24 border-t border-line py-6 md:py-8"
        >
          <div className="flex items-center gap-2">
            <span className="size-1.5 shrink-0 bg-signal" aria-hidden />
            <h2
              id={`${section.id}-heading`}
              className="font-mono text-[11px] uppercase tracking-[0.16em]"
            >
              {section.name}
            </h2>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {section.modules.map((item) => (
              <article
                key={item.title}
                id={moduleId(item.title)}
                className="scroll-mt-24 border border-line bg-slot px-4 py-3.5 md:px-5 md:py-4"
              >
                <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
