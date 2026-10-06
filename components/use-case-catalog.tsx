import { UseCaseIcon } from "@/components/use-case-icons";
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
          <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {section.modules.map((item) => (
              <article
                key={item.title}
                id={moduleId(item.title)}
                className="use-case-card scroll-mt-24"
              >
                <span className="use-case-card-fill" aria-hidden="true" />
                <div className="use-case-card-body">
                  <div className="use-case-card-icon">
                    <UseCaseIcon title={item.title} />
                  </div>
                  <div className="use-case-card-copy">
                    <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
