import fs from "node:fs";
import path from "node:path";

const REMOTE = "https://asterobgyn.com/wp-content/uploads/";

/** Uses the local copy in /public/images/old-site when it exists, else the old site's URL. */
export function oldSite(rel: string) {
  const name = path.basename(rel);
  const local = path.join(process.cwd(), "public/images/old-site", name);
  return fs.existsSync(local) ? `/images/old-site/${name}` : REMOTE + rel;
}

/** Returns a logo path if you dropped a file in /public/images/logos, else null. */
export function logoFile(base: string) {
  for (const ext of ["svg", "png", "webp", "jpg"]) {
    const p = path.join(process.cwd(), "public/images/logos", `${base}.${ext}`);
    if (fs.existsSync(p)) return `/images/logos/${base}.${ext}`;
  }
  return null;
}
