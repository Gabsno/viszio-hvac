// One-off migration: remap the original 30 articles from the early
// pillar taxonomy (core-engineering / equipment / ...) to the functional
// 10-section taxonomy. Matches each file by its frontmatter `id` and rewrites
// the `pillar:` (and where needed `topic:`) line. Safe to re-run — idempotent.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'src', 'content');

// id -> [pillar, topic?]   (topic omitted = leave topic unchanged)
const MAP = {
  'psy-01': ['fundamentals'],
  'psy-02': ['fundamentals'],
  'psy-03': ['fundamentals'],
  'psy-04': ['fundamentals'],
  'refr-01': ['fundamentals'],
  'load-01': ['load-calculations', 'load-methods'],
  'load-02': ['load-calculations', 'load-methods'],
  'duct-01': ['ducting'],
  'duct-02': ['ducting'],
  'ahu-01': ['ducting'],
  'fcu-01': ['ducting'],
  'chil-01': ['cooling'],
  'chil-02': ['cooling'],
  'vrf-01': ['cooling'],
  'vrf-02': ['cooling'],
  'ct-01': ['cooling'],
  'cold-01': ['cooling'],
  'pipe-01': ['piping'],
  'pump-01': ['piping', 'pumps'],
  'std-ashrae-621': ['standards'],
  'std-ashrae-901': ['standards'],
  'std-ashrae-55': ['standards'],
  'std-smacna-duct': ['standards'],
  'std-acca-manualj': ['standards'],
  'std-ahri-550590': ['standards'],
  'ctrl-01': ['controls'],
  'cx-01': ['controls'],
  'cx-02': ['controls'],
  'edge-01': ['sustainability'],
  'kig-01': ['sustainability'],
};

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.md')) out.push(full);
  }
  return out;
}

let changed = 0;
for (const file of walk(contentDir)) {
  let text = readFileSync(file, 'utf8');
  const idm = text.match(/^id:\s*(.+)$/m);
  if (!idm) continue;
  const id = idm[1].trim();
  const entry = MAP[id];
  if (!entry) continue;
  const [pillar, topic] = entry;
  const before = text;
  text = text.replace(/^pillar:.*$/m, `pillar: ${pillar}`);
  if (topic) text = text.replace(/^topic:.*$/m, `topic: ${topic}`);
  if (text !== before) {
    writeFileSync(file, text);
    changed++;
    console.log(`  ${id} -> ${pillar}${topic ? ' / ' + topic : ''}`);
  }
}
console.log(`Migrated ${changed} article(s).`);
