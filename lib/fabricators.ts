export const fabricatorsPage = {
  title: "Fabricators",
  description:
    "Your customer wants a price before you cut. You need the thickness, the material, the quantity, and the correct revision. The shop file is STEP and DXF. STL is a preview only. A change to the part cancels the old price. A shape outside the shop range goes to a person. Do not invent a dimension. Schedule a demo.",
} as const;

export type FabricatorSolution = {
  title: string;
  price: string;
  status?: string;
};

export const fabricatorSolutions: readonly FabricatorSolution[] = [
  {
    title: "Part form on your website",
    price: "$5,000",
  },
  {
    title: "Shared shop tool",
    price:
      "$500 setup. You pay the model supplier its own price. Estuary adds no markup on that cost. Estuary takes 10% of sales each month.",
    status: "Demo only. One sample shop. Sample rates. No charge. This is not a cut order.",
  },
];

if (fabricatorSolutions.length !== 2) {
  throw new Error(`Expected 2 fabricator solutions, found ${fabricatorSolutions.length}`);
}
