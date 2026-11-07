// Copy PGLite's WASM data file into the server bundle output.
//
// @electric-sql/pglite loads its Postgres data file at runtime via
// `new URL("./pglite.data", import.meta.url)` — i.e. it expects the file to
// sit next to the bundled `electric-sql__pglite.mjs` chunk. Rollup bundles
// the JS but never emits the `.data` file, so any production build without a
// real DATABASE_URL crashes the whole server process the first time a route
// touches the database (the PWA manifest was the first to trip it on Vercel).
// This runs as `postbuild` so the file lands in the deployed output on every
// build, including Vercel's.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "node_modules", "@electric-sql", "pglite", "dist");
// The WASM loader reads these at runtime, next to the bundled chunk.
const files = ["pglite.data", "pglite.wasm", "initdb.wasm"];

// Server-bundle layouts that put the pglite chunk under a `_libs` dir.
const dests = [
  join(root, ".vercel", "output", "functions", "__server.func", "_libs"),
  join(root, ".output", "server", "_libs"),
];

let copied = 0;
for (const dir of dests) {
  if (!existsSync(dir)) continue;
  for (const file of files) {
    const src = join(dist, file);
    if (!existsSync(src)) continue;
    copyFileSync(src, join(dir, file));
    console.log(`[copy-pglite-data] copied ${file} -> ${dir}`);
    copied++;
  }
}
if (copied === 0) {
  console.log("[copy-pglite-data] no server output dir found, skipping");
}
