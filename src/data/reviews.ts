export type Review = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  date: string;
};

export const SEED_REVIEWS: Review[] = [
  {
    id: "marcus-t",
    name: "Marcus T.",
    role: "Founder",
    company: "CyberTrade",
    quote:
      "The platform they designed for us is quiet and fast. Dark, specific, no carnival. Performance held up under a real launch. I would hire them again for the next surface.",
    rating: 5,
    date: "2026-06-14",
  },
  {
    id: "sarah-j",
    name: "Sarah J.",
    role: "Community Manager",
    company: "Elite Gaming",
    quote:
      "The custom Discord bot replaced three public bots and a spreadsheet. Onboarding is automatic. Moderation logs are something I can actually read. Engagement went up because people stopped waiting on staff.",
    rating: 5,
    date: "2026-07-22",
  },
];
