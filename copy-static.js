// 📦 Static file copier for build
import { copy } from "fs-extra";

async function main() {
  console.log("📦 Copying static files...");

  await copy("index.html", "dist/index.html");

  await copy("assets", "dist/assets");
  await copy("src", "dist/src");

  await copy("dist/style.css", "style.css");

  console.log("✅ Static files copied.");
}

main().catch((err) => {
  console.error("❌ Error copying static files:", err);
  process.exit(1);
});
