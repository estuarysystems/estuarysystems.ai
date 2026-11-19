export const playgroundPage = {
  title: "Playground",
  description: "Try a tool in the browser. Then build it yourself.",
} as const;

export type PlaygroundItem = {
  href: string;
  title: string;
  description: string;
};

export const playgroundItems: readonly PlaygroundItem[] = [
  {
    href: "/playground/voice-song",
    title: "Voice Song Maker",
    description: "Record your notes. Play a song with those notes.",
  },
];
