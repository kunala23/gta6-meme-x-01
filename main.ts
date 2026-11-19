// gta6-meme-x-01 entrypoint — Node 22, standard library only.
//
// The entry itself is the X post: the house reads the post (its first picture
// and its text) straight from X and hands it to the judge. This program does
// exactly one small job so the gate can find the post: it copies POST.json
// from the repository root into the output directory.
//
// Locally, the grader's /bot and /output are stood in for with environment
// variables:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// On success it prints nothing and exits 0. Any failure to copy is fatal:
// it prints the reason to stderr and exits 1.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POST.json");

// Fail fast with a clear message when there is nothing to copy, instead of
// letting copyFileSync report a bare ENOENT from inside the try block.
if (!existsSync(source)) {
  console.error(`no POST.json found in ${botDir}; nothing to hand in`);
  process.exit(1);
}

try {
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(source, join(outputDir, "POST.json"));
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`could not copy POST.json out of ${botDir}: ${reason}`);
  process.exit(1);
}
