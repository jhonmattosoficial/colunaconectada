#!/usr/bin/env node
/**
 * Converte os PNGs dos benefícios em JPGs otimizados.
 * PNG não comprime bem com gradient suave → vira 700KB-1MB cada.
 * Mesma imagem em JPG quality 82 → ~100-200KB cada.
 * Não tem alpha que importe (os PNGs do Antigravity têm fundo opaco).
 */

import { readdir, stat, unlink } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Jimp } from "jimp";

const root = dirname(fileURLToPath(import.meta.url)).replace(/\\scripts$/, "");
const IMG_DIR = join(root, "public", "img");

const fmt = (b) =>
  b > 1024 * 1024
    ? `${(b / 1024 / 1024).toFixed(2)} MB`
    : `${(b / 1024).toFixed(1)} KB`;

async function run() {
  const files = (await readdir(IMG_DIR)).filter((f) =>
    /^benefit-\d+\.png$/i.test(f),
  );

  console.log(`📸 Convertendo ${files.length} PNGs pra JPG...\n`);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of files) {
    const pngPath = join(IMG_DIR, name);
    const jpgPath = pngPath.replace(/\.png$/i, ".jpg");
    const before = (await stat(pngPath)).size;

    const img = await Jimp.read(pngPath);
    // Resize se for muito grande (max 1200px wide pros cards)
    if (img.width > 1200) img.resize({ w: 1200 });
    await img.write(jpgPath, { quality: 82 });
    await unlink(pngPath);

    const after = (await stat(jpgPath)).size;
    totalBefore += before;
    totalAfter += after;
    console.log(
      `✅ ${name} → ${name.replace(".png", ".jpg")}: ${fmt(before)} → ${fmt(after)} (-${Math.round((1 - after / before) * 100)}%)`,
    );
  }

  console.log(`\n─────`);
  console.log(`Total: ${fmt(totalBefore)} → ${fmt(totalAfter)}`);
  console.log(`Economia: ${fmt(totalBefore - totalAfter)} (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
