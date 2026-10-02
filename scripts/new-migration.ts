// Usage: bun run migration add_due_date
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const name = process.argv[2]?.replace(/[^a-z0-9_]/gi, "_").toLowerCase();
if (!name) throw new Error("usage: bun run migration <name>");

const dir = "src-tauri/src/migrations";
const version = readdirSync(dir).filter((f) => /^\d{3}_/.test(f)).length + 1;
const id = `${String(version).padStart(3, "0")}_${name}`;

writeFileSync(
  `${dir}/${id}.rs`,
  `pub fn sql() -> &'static str {\n    ""\n}\n`,
);

const modPath = `${dir}/mod.rs`;
const mod = readFileSync(modPath, "utf8")
  .replace(
    "// @mods",
    `#[path = "${id}.rs"]\nmod m${id};\n// @mods`,
  )
  .replace(
    "// @entries",
    `Migration {\n            version: ${version},\n            description: "${name}",\n            sql: m${id}::sql(),\n            kind: MigrationKind::Up,\n        },\n        // @entries`,
  );
writeFileSync(modPath, mod);
console.log(`created ${id}.rs and registered it in mod.rs`);
