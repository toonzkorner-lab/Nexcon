export type Billing = "one-off" | "monthly";

export type Settings = {
  studioName: string;
  studioShort: string;
  tagline: string;
  email: string;
  discordUrl: string;
  telegramUrl: string;
  founderName: string;
  founderTitle: string;
  founderBio: string;
  genesis: string;
  deskDays: string;
  deskHours: string;
  sla: string;
  zone: string;
  stack: string[];
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  city: string;
  region: string;
  country: string;
  twitterHandle: string;
  googleVerification: string;
  indexable: boolean;
};

export type Faq = { id: string; question: string; answer: string; sortOrder: number };
export type Principle = { id: string; num: string; title: string; body: string; sortOrder: number };
export type PipelineStep = { id: string; num: string; title: string; body: string; sortOrder: number };
export type Engagement = {
  id: string;
  name: string;
  rangeLabel: string;
  body: string;
  includes: string[];
  sortOrder: number;
};
export type Capability = { id: string; area: string; inScope: boolean; sortOrder: number };

export type Service = {
  slug: string;
  name: string;
  group: "Build" | "Automate" | "Host" | "Amplify" | string;
  summary: string;
  description: string;
  price: number;
  billing: Billing;
  hoursNote?: string;
  features: string[];
  deliverables: string[];
  timeline: string;
  sortOrder: number;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  /** ISO timestamp of the last content update (DB `updated_at`). Optional until the row mapper populates it. */
  updatedAt?: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  kind: "Client" | "Studio" | string;
  year: string;
  duration: string;
  role: string;
  tags: string[];
  stack: string[];
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  image: string;
  imageAlt: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
  /** ISO timestamp of the last content update (DB `updated_at`). Optional until the row mapper populates it. */
  updatedAt?: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  blurb: string;
  description: string;
  includes: string[];
  stack: string[];
  published: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
  /** ISO timestamp of the last content update (DB `updated_at`). Optional until the row mapper populates it. */
  updatedAt?: string;
};

export type PostBlock = { heading?: string; paragraphs: string[] };
export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  reading: string;
  body: PostBlock[];
  image: string;
  imageAlt: string;
  published: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
  /** ISO timestamp of the last content update (DB `updated_at`). Optional until the row mapper populates it. */
  updatedAt?: string;
};

export type Review = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  date: string;
  published: boolean;
};

export type Brief = {
  id: string;
  name: string;
  email: string;
  channel: string;
  groups: string[];
  budget: string;
  timeline: string;
  notes: string;
  status: string;
  createdAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  topic: string;
  body: string;
  status: string;
  createdAt: string;
};

export type Order = {
  id: string;
  email: string;
  channel: string;
  total: number;
  items: { name: string; qty: number; price: number }[];
  status: string;
  createdAt: string;
};

export type BotCommand = { cmd: string; hint: string };

export type ShowcaseBot = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  kind: "chat" | "economy" | string;
  channel: string;
  welcome: string;
  persona: string;
  starters: string[];
  commands: BotCommand[];
  productSlug: string;
  published: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
  /** ISO timestamp of the last content update (DB `updated_at`). Optional until the row mapper populates it. */
  updatedAt?: string;
};

export type Site = {
  settings: Settings;
  faqs: Faq[];
  principles: Principle[];
  pipeline: PipelineStep[];
  engagements: Engagement[];
  capabilities: Capability[];
  services: Service[];
  projects: Project[];
  products: Product[];
  posts: Post[];
  reviews: Review[];
  bots: ShowcaseBot[];
};

export type Inbox = {
  briefs: Brief[];
  messages: Message[];
  orders: Order[];
};

export type OwnerInfo = { userId: string; email: string | null };
