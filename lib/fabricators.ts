export const fabricatorsPage = {
  title: "Fabricators",
  description:
    "Two solutions for a fabrication shop. Custom site-embedded text fabricator, or a link to Estuary-Fabricate.",
} as const;

export type FabricatorSolution = {
  title: string;
  price: string;
  description: string;
  status?: string;
};

export const fabricatorSolutions: readonly FabricatorSolution[] = [
  {
    title: "Custom site-embedded text fabricator",
    price: "$5,000",
    description:
      "The buyer enters a request in text on the shop's own site. The shop site collects that text. This solution does not compare options, make a 3D file, price from a rate card, or take payment.",
  },
  {
    title: "Connect to Estuary-Fabricate",
    price:
      "$500 setup and onboarding, plus a token fee equal to what OpenAI charges (pass-through, no markup), plus 10% of sales each month.",
    description:
      "Estuary-Fabricate is a hosted page, not code on the shop site. The shop places a link on its site. The link opens Estuary-Fabricate with that shop saved. The buyer types what they need. The page shows two options. The buyer picks A, B, or neither, and can add a note. This repeats until the buyer finalizes. The page then makes a 3D file, prices the part from that shop's rate card, and lets the buyer pay. The shop gets the file, the price, and the order.",
    status: "Labeled demo. One sample shop, sample rates, no real charge.",
  },
];

if (fabricatorSolutions.length !== 2) {
  throw new Error(`Expected 2 fabricator solutions, found ${fabricatorSolutions.length}`);
}
