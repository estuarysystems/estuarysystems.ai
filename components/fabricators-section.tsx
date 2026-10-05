import { fabricatorSolutions } from "@/lib/fabricators";

export function FabricatorsSection() {
  return (
    <div className="mt-8 grid items-start gap-2 md:mt-10 md:grid-cols-2">
      {fabricatorSolutions.map((solution) => (
        <article key={solution.title} className="border border-line bg-slot px-4 py-3.5 md:px-5 md:py-4">
          <h2 className="text-base font-medium tracking-tight">{solution.title}</h2>
          <p className="mt-1 text-sm font-medium leading-relaxed">{solution.price}</p>
        </article>
      ))}
    </div>
  );
}
