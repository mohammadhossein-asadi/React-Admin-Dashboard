const fs = require("fs");
const c = fs.readFileSync("stats.html", "utf8");
const i = c.indexOf("const data = ");
const start = c.indexOf("=", i) + 1;
let depth = 0,
  end = -1,
  inStr = false,
  esc = false;
for (let j = start; j < c.length; j++) {
  const ch = c[j];
  if (inStr) {
    if (esc) esc = false;
    else if (ch === "\\") esc = true;
    else if (ch === '"') inStr = false;
    continue;
  }
  if (ch === '"') {
    inStr = true;
    continue;
  }
  if (ch === "{") depth++;
  else if (ch === "}") {
    depth--;
    if (depth === 0) {
      end = j + 1;
      break;
    }
  }
}
const data = JSON.parse(c.slice(start, end));
console.log("top-level keys:", Object.keys(data));
const meta = data.nodeParts || data.parts || {};
console.log("meta sample:", JSON.stringify(Object.entries(meta)[0] || null).slice(0, 200));
const root = data.tree;
const flat = [];
(function walk(n, path, uid) {
  const p = path.concat(n.name || "");
  const part = n.uid ? meta[n.uid] : null;
  if (!n.children || n.children.length === 0) {
    const parsed = part ? part.renderedLength || 0 : n.parsedSize || 0;
    const stat = part ? part.gzipLength || 0 : n.statSize || 0;
    flat.push({ path: p.join(" | "), parsed, stat });
  } else {
    n.children.forEach((k) => walk(k, p, k.uid));
  }
})(root, [], root.uid);
flat.sort((a, b) => b.parsed - a.parsed);
console.log("TOP 40 modules by parsed size:");
flat.slice(0, 40).forEach((f) => console.log((f.parsed / 1024).toFixed(1).padStart(8) + " kB  " + f.path));
const byPkg = {};
flat.forEach((f) => {
  const m = f.path.match(/node_modules[/\\]((?:@[^/\\]+[/\\])?[^/\\]+)/);
  const key = m ? m[1].replace(/\\/g, "/") : "(app)";
  byPkg[key] = (byPkg[key] || 0) + f.parsed;
});
console.log("\nBY PACKAGE:");
Object.entries(byPkg)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 25)
  .forEach(([k, v]) => console.log((v / 1024).toFixed(1).padStart(8) + " kB  " + k));
