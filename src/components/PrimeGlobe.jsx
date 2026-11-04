import { readFile } from "node:fs/promises";
import path from "node:path";

// A server component keeps the detailed artwork out of the client JavaScript bundle.
// This is trusted, local SVG artwork supplied for this website, never user input.
export default async function PrimeGlobe() {
  const svg = await readFile(
    path.join(process.cwd(), "public/assets/prime-globe-layered.svg"),
    "utf8",
  );
  const inner = svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>"));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="prime-globe-svg"
      viewBox="-13 -15 290 290"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
