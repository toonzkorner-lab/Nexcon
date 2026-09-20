import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseMetrics, parsePostBody, slugify } from "./parse.ts";

describe("cms parse", () => {
  it("slugifies titles", () => {
    assert.equal(slugify("Elite Crete Systems"), "elite-crete-systems");
  });

  it("parses metrics lines", () => {
    const rows = parseMetrics("6w | Brief to launch\n3 | Inquiry fields");
    assert.equal(rows[0]?.value, "6w");
    assert.equal(rows[1]?.label, "Inquiry fields");
  });

  it("parses journal body", () => {
    const blocks = parsePostBody("Intro paragraph.\n\n# Heading\n\nBody copy.");
    assert.equal(blocks[0]?.paragraphs[0], "Intro paragraph.");
    assert.equal(blocks[1]?.heading, "Heading");
  });
});
