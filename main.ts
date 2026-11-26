// The Moon Gets One Star — a deterministic one-liner entry.
//
// The program validates a single one-star review of the Moon and writes it
// to entry.txt inside the output directory. It uses only the Node 22
// standard library, makes no network calls, and reads no clock, random
// source, or environment value other than the output directory override.
//
// The review itself packs three Moon-specific complaints into one line: the
// Moon shows up late every night, takes credit for the Sun's work, and has
// not changed its outfit in four billion years. The rating, the grievance,
// and the punchline all land well inside the 120-character limit.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Every run writes identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ONE_LINER =
  "1/5 stars. Turns up late, takes credit for the Sun's work, and hasn't changed its outfit in 4 billion years.";

// The sealed scorer only accepts entries of MIN_ENTRY_CHARS to
// MAX_ENTRY_CHARS UTF-8 characters that are not only whitespace. Reject a
// bad line here, loudly, instead of writing an entry the judge would
// never see.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 120;

function validateEntry(line: string): void {
  if (
    line.length < MIN_ENTRY_CHARS ||
    line.length > MAX_ENTRY_CHARS ||
    line.trim().length === 0
  ) {
    throw new Error(
      `entry line must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${line.length}`,
    );
  }
}

validateEntry(ONE_LINER);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ONE_LINER + '\n', 'utf8');
