// The Moon Gets One Star (Node 22, standard library only): writes a single
// one-star review of the Moon — a rating, a grievance, a reason the Moon
// earned its single star — to /output/entry.txt.
//
// Design: the review turns on three specific Moon-only complaints — it shows
// up late every night, takes credit for the Sun's work, and hasn't changed
// its outfit in four billion years. Reads like a real review, lands on a
// single read, and the punchline arrives before the 120-character limit.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "1/5 stars. Turns up late, takes credit for the Sun's work, and hasn't changed its outfit in 4 billion years.";

// The sealed scorer only accepts MIN_ENTRY_CHARS–MAX_ENTRY_CHARS UTF-8
// characters, not only whitespace: fail loudly here instead of writing an
// entry the judge would never see.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 120;

if (
  LINE.length < MIN_ENTRY_CHARS ||
  LINE.length > MAX_ENTRY_CHARS ||
  LINE.trim().length === 0
) {
  throw new Error(
    `entry line must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${LINE.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
