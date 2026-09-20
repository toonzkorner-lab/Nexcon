export function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v));
  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      return asStringArray(parsed);
    } catch {
      return value ? [value] : [];
    }
  }
  return [];
}

export function asMetrics(value: unknown): { value: string; label: string }[] {
  if (!Array.isArray(value)) {
    if (typeof value === "string") {
      try {
        return asMetrics(JSON.parse(value));
      } catch {
        return [];
      }
    }
    return [];
  }
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as { value?: unknown; label?: unknown };
      return { value: String(row.value ?? ""), label: String(row.label ?? "") };
    })
    .filter((m): m is { value: string; label: string } => Boolean(m));
}

export function asPostBody(value: unknown): { heading?: string; paragraphs: string[] }[] {
  if (typeof value === "string") {
    try {
      return asPostBody(JSON.parse(value));
    } catch {
      return [{ paragraphs: [value] }];
    }
  }
  if (!Array.isArray(value)) return [];
  const blocks: { heading?: string; paragraphs: string[] }[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as { heading?: unknown; paragraphs?: unknown };
    const paragraphs = asStringArray(row.paragraphs);
    if (!paragraphs.length && !row.heading) continue;
    blocks.push({
      heading: row.heading ? String(row.heading) : undefined,
      paragraphs: paragraphs.length ? paragraphs : [""],
    });
  }
  return blocks;
}

export function asOrderItems(value: unknown): { name: string; qty: number; price: number }[] {
  if (!Array.isArray(value)) {
    if (typeof value === "string") {
      try {
        return asOrderItems(JSON.parse(value));
      } catch {
        return [];
      }
    }
    return [];
  }
  const items: { name: string; qty: number; price: number }[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as { name?: unknown; qty?: unknown; price?: unknown };
    const name = String(row.name ?? "");
    if (!name) continue;
    items.push({ name, qty: Number(row.qty) || 0, price: Number(row.price) || 0 });
  }
  return items;
}

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function lines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function parseMetrics(text: string): { value: string; label: string }[] {
  return lines(text).map((line) => {
    const [value, ...rest] = line.split("|");
    return { value: (value ?? "").trim(), label: rest.join("|").trim() };
  });
}

export function serializeMetrics(rows: { value: string; label: string }[]): string {
  return rows.map((r) => `${r.value} | ${r.label}`).join("\n");
}

export function parsePostBody(text: string): { heading?: string; paragraphs: string[] }[] {
  const chunks = text.split(/\n{2,}/);
  const blocks: { heading?: string; paragraphs: string[] }[] = [];
  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("# ")) {
      const [first, ...rest] = trimmed.split("\n");
      const heading = (first ?? "").replace(/^#\s+/, "").trim();
      const paragraphs = rest.join("\n").trim();
      blocks.push({ heading, paragraphs: paragraphs ? [paragraphs] : [""] });
    } else {
      const last = blocks[blocks.length - 1];
      if (last && !last.heading && last.paragraphs.length) {
        last.paragraphs.push(trimmed);
      } else {
        blocks.push({ paragraphs: [trimmed] });
      }
    }
  }
  return blocks.length ? blocks : [{ paragraphs: [""] }];
}

export function serializePostBody(blocks: { heading?: string; paragraphs: string[] }[]): string {
  return blocks
    .map((b) => {
      const body = b.paragraphs.join("\n\n");
      return b.heading ? `# ${b.heading}\n\n${body}` : body;
    })
    .join("\n\n");
}

export function asCommands(value: unknown): { cmd: string; hint: string }[] {
  if (!Array.isArray(value)) {
    if (typeof value === "string") {
      try {
        return asCommands(JSON.parse(value));
      } catch {
        return [];
      }
    }
    return [];
  }
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as { cmd?: unknown; hint?: unknown };
      const cmd = String(row.cmd ?? "").trim();
      if (!cmd) return null;
      return { cmd, hint: String(row.hint ?? "") };
    })
    .filter((m): m is { cmd: string; hint: string } => Boolean(m));
}

export function serializeCommands(rows: { cmd: string; hint: string }[]): string {
  return rows.map((r) => (r.hint ? `${r.cmd} | ${r.hint}` : r.cmd)).join("\n");
}

export function parseCommands(text: string): { cmd: string; hint: string }[] {
  return lines(text).map((line) => {
    const [cmd, ...rest] = line.split("|");
    return { cmd: (cmd ?? "").trim(), hint: rest.join("|").trim() };
  });
}
