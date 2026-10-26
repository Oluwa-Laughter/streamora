import { cpSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
cpSync("apps/web/dist", "dist", { recursive: true });
console.log("Copied apps/web/dist -> dist");
