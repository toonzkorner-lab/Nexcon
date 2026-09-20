import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Review } from "@/data/reviews";
import { SEED_REVIEWS } from "@/data/reviews";
import { uid } from "@/lib/utils";

export type Message = {
  id: string;
  name: string;
  email: string;
  topic: string;
  body: string;
  at: string;
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
  at: string;
};

export type Order = {
  id: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  email: string;
  channel: string;
  at: string;
};

type Inbox = {
  messages: Message[];
  briefs: Brief[];
  orders: Order[];
  reviews: Review[];
  addMessage: (m: Omit<Message, "id" | "at">) => Message;
  addBrief: (b: Omit<Brief, "id" | "at">) => Brief;
  addOrder: (o: Omit<Order, "id" | "at">) => Order;
  addReview: (r: Omit<Review, "id" | "date">) => Review;
};

export const useInbox = create<Inbox>()(
  persist(
    (set, get) => ({
      messages: [],
      briefs: [],
      orders: [],
      reviews: SEED_REVIEWS,
      addMessage: (m) => {
        const row: Message = { ...m, id: uid("msg"), at: new Date().toISOString() };
        set({ messages: [row, ...get().messages] });
        return row;
      },
      addBrief: (b) => {
        const row: Brief = { ...b, id: uid("brf"), at: new Date().toISOString() };
        set({ briefs: [row, ...get().briefs] });
        return row;
      },
      addOrder: (o) => {
        const row: Order = { ...o, id: uid("ord"), at: new Date().toISOString() };
        set({ orders: [row, ...get().orders] });
        return row;
      },
      addReview: (r) => {
        const row: Review = {
          ...r,
          id: uid("rev"),
          date: new Date().toISOString().slice(0, 10),
        };
        set({ reviews: [row, ...get().reviews] });
        return row;
      },
    }),
    { name: "nk-inbox" },
  ),
);
