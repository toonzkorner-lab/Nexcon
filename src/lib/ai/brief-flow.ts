/**
 * Conversational brief flow for Core (support dock).
 *
 * Lets a visitor start a project right in the chat instead of going to
 * /book. Pure state machine — no React, no server calls — so it is easy to
 * test. The dock owns the state, drives the questions, and calls
 * `submitBrief` when the visitor confirms. The brief lands in the owner
 * inbox exactly like a /book submission, with channel "Core chat".
 */
import { normalizeQuery } from "./knowledge.ts";

export const BRIEF_BUDGETS = ["Under $500", "$500–2k", "$2k–8k", "$8k+", "Not sure"];
export const BRIEF_TIMES = ["ASAP", "This month", "This quarter", "Exploring"];

export type BriefStep = "groups" | "budget" | "timeline" | "name" | "email" | "notes" | "confirm";

export type BriefState = {
  step: BriefStep;
  groups: string[];
  budget: string;
  timeline: string;
  name: string;
  email: string;
  notes: string;
};

export type BriefResult = {
  state: BriefState;
  reply: string;
  /** Visitor confirmed at the confirm step — dock should call submitBrief. */
  submit: boolean;
  /** Visitor said cancel — dock should exit brief mode. */
  cancelled: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CANCEL_WORDS = /\b(cancel|stop|never mind|nevermind|quit|exit)\b/;

export function isBriefIntent(text: string): boolean {
  const q = normalizeQuery(text);
  // "How do I build..." is a coding question (knowledge base), not a booking.
  // "Can you build me..." / "build me a..." is a booking.
  return /\b(start (a )?project|book|hire|i want (a |an )?|i need (a |an )?|work with you|get started|open a brief|start a brief|can you build|build (me|us))\b/.test(q);
}

function emptyState(): BriefState {
  return { step: "groups", groups: [], budget: "", timeline: "", name: "", email: "", notes: "" };
}

function groupsQuestion(knownGroups: string[]): string {
  const list = knownGroups.length ? knownGroups.join(", ") : "Build, Automate, Host, Amplify";
  return `Let's start it. What do you need? Pick one or more: ${list} — or just describe it in your own words.`;
}

export function startBrief(knownGroups: string[]): { state: BriefState; reply: string } {
  return { state: emptyState(), reply: groupsQuestion(knownGroups) };
}

/** Match free text to one of the known options; fall back to the raw text. */
function matchOption(text: string, options: string[]): string {
  const q = normalizeQuery(text);
  const hit = options.find((o) => q.includes(normalizeQuery(o)) || normalizeQuery(o).includes(q));
  return hit ?? text.trim();
}

/** Match free text to service groups; fall back to the raw text as one group. */
function matchGroups(text: string, knownGroups: string[]): string[] {
  const q = normalizeQuery(text);
  const hits = knownGroups.filter((g) => q.includes(normalizeQuery(g)));
  if (hits.length) return hits;
  // A number picks from the list (groups shown in order).
  const num = Number.parseInt(q, 10);
  if (Number.isInteger(num) && num >= 1 && num <= knownGroups.length) return [knownGroups[num - 1]];
  const trimmed = text.trim();
  return trimmed ? [trimmed] : [];
}

export function briefSummary(state: BriefState): string {
  const lines = [
    `What: ${state.groups.join(", ") || "—"}`,
    `Budget: ${state.budget || "—"}`,
    `Timeline: ${state.timeline || "—"}`,
    `Name: ${state.name || "—"}`,
    `Email: ${state.email || "—"}`,
  ];
  if (state.notes) lines.push(`Notes: ${state.notes}`);
  return lines.join("\n");
}

export function advanceBrief(
  state: BriefState,
  answer: string,
  knownGroups: string[],
): BriefResult {
  const text = answer.trim();
  if (CANCEL_WORDS.test(normalizeQuery(text))) {
    return { state, reply: "No problem — the brief is dropped. Ask me anything else.", submit: false, cancelled: true };
  }

  switch (state.step) {
    case "groups": {
      const groups = matchGroups(text, knownGroups);
      if (!groups.length) {
        return { state, reply: groupsQuestion(knownGroups), submit: false, cancelled: false };
      }
      return {
        state: { ...state, groups, step: "budget" },
        reply: `Got it — ${groups.join(", ")}. What's your budget? ${BRIEF_BUDGETS.join(", ")}.`,
        submit: false,
        cancelled: false,
      };
    }
    case "budget": {
      if (!text) {
        return { state, reply: `What's your budget? ${BRIEF_BUDGETS.join(", ")}.`, submit: false, cancelled: false };
      }
      return {
        state: { ...state, budget: matchOption(text, BRIEF_BUDGETS), step: "timeline" },
        reply: `When do you need it? ${BRIEF_TIMES.join(", ")}.`,
        submit: false,
        cancelled: false,
      };
    }
    case "timeline": {
      if (!text) {
        return { state, reply: `When do you need it? ${BRIEF_TIMES.join(", ")}.`, submit: false, cancelled: false };
      }
      return {
        state: { ...state, timeline: matchOption(text, BRIEF_TIMES), step: "name" },
        reply: "What's your name?",
        submit: false,
        cancelled: false,
      };
    }
    case "name": {
      if (!text) {
        return { state, reply: "What's your name?", submit: false, cancelled: false };
      }
      return {
        state: { ...state, name: text, step: "email" },
        reply: "And your email? That's where the confirmation goes.",
        submit: false,
        cancelled: false,
      };
    }
    case "email": {
      if (!EMAIL_RE.test(text)) {
        return { state, reply: "That email doesn't look right — can you type it again?", submit: false, cancelled: false };
      }
      return {
        state: { ...state, email: text, step: "notes" },
        reply: "Anything else I should know? Type it here, or say 'skip'.",
        submit: false,
        cancelled: false,
      };
    }
    case "notes": {
      const notes = /^(skip|no|none|nothing)$/i.test(text) ? "" : text;
      const next = { ...state, notes, step: "confirm" as const };
      return {
        state: next,
        reply: `Here's the brief:\n${briefSummary(next)}\n\nSay "yes" to send it, or "cancel" to drop it.`,
        submit: false,
        cancelled: false,
      };
    }
    case "confirm": {
      const q = normalizeQuery(text);
      if (/^(yes|yeah|yep|send|confirm|ok|okay|sure)$/.test(q)) {
        return { state, reply: "", submit: true, cancelled: false };
      }
      if (/^(no|nope|change|edit)$/.test(q)) {
        return {
          state: { ...state, step: "groups" },
          reply: `No problem — let's redo it. ${groupsQuestion(knownGroups)}`,
          submit: false,
          cancelled: false,
        };
      }
      return {
        state,
        reply: `Say "yes" to send it, or "cancel" to drop it.\n${briefSummary(state)}`,
        submit: false,
        cancelled: false,
      };
    }
  }
}

/** Payload for submitBrief. Channel marks it as coming from Core chat. */
export function briefPayload(state: BriefState): {
  name: string;
  email: string;
  channel: string;
  groups: string[];
  budget: string;
  timeline: string;
  notes: string;
} {
  return {
    name: state.name,
    email: state.email,
    channel: "Core chat",
    groups: state.groups,
    budget: state.budget,
    timeline: state.timeline,
    notes: state.notes,
  };
}
