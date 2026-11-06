// Run on your own computer:  npm run images:fetch
// Downloads old-site photos into public/images/old-site so the site stops hot-linking asterobgyn.com.
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import list from "../src/data/old-site-images.json" with { type: "json" };

const BASE = "https://asterobgyn.com/wp-content/uploads/";
const OUT = path.resolve("public/images/old-site");
await mkdir(OUT, { recursive: true });

const files = [...new Set([...list.babies, ...list.ourBabies]), list.acrSeal, list.certificate];
for (const rel of files) {
  const name = path.basename(rel);
  const dest = path.join(OUT, name);
  if (existsSync(dest)) { console.log("skip", name); continue; }
  const res = await fetch(BASE + rel);
  if (!res.ok) { console.warn("FAILED", res.status, rel); continue; }
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log("saved", name);
}
