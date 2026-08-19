type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
};

type LegalPageProps = {
  title: string;
  sections: readonly LegalSection[];
};

function isEmail(value: string) {
  return value.includes("@") && !value.includes(" ");
}

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl space-y-12 px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">{title}</h1>
        {sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-2xl font-medium tracking-tight">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-2xl text-lg text-muted">
                {isEmail(paragraph) ? (
                  <a
                    href={`mailto:${paragraph}`}
                    className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
                  >
                    {paragraph}
                  </a>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
