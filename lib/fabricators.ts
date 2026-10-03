export const fabricatorsPage = {
  title: "Fabricators",
  description: "Schedule a demo",
} as const;

export type FabricatorSolution = {
  title: string;
  price: string;
  status?: string;
};

export const fabricatorSolutions: readonly FabricatorSolution[] = [
  {
    title: "Custom site-embedded text fabricator",
    price: "$5,000",
  },
  {
    title: "Connect to Estuary-Fabricate",
    price:
      "$500 setup and onboarding, plus a token fee equal to what OpenAI charges (pass-through, no markup), plus 10% of sales each month.",
    status: "Labeled demo. One sample shop, sample rates, no real charge.",
  },
];

if (fabricatorSolutions.length !== 2) {
  throw new Error(`Expected 2 fabricator solutions, found ${fabricatorSolutions.length}`);
}
