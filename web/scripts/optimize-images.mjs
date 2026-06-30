#!/usr/bin/env node
/**
 * Otimiza imagens em /public/img/ com jimp (JS puro — sem binário nativo).
 * Redimensiona JPGs/PNGs grandes pra max 1920px e recomprime.
 * Faz backup em /public/img.original/ antes de modificar.
 *
 * Uso: node scripts/optimize-images.mjs
 */

import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Jimp } from "jimp";

const root = dirname(fileURLToPath(import.meta.url)).replace(/\\scripts$/, "");
const PUBLIC_IMG = join(root, "public", "img");
const BACKUP_DIR = join(root, "public", "img.original");

const MAX_WIDTH = 1920;
const JPG_QUALITY = 80;

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    const s = await stat(full);
    if (s.isDirectory()) {
      // Pula a pasta de backup
      if (full.includes("img.original")) continue;
      out.push(...(await walk(full)));
    } else out.push(full);
  }
  return out;
}

async function ensureBackup(file) {
  const rel = file.substring(PUBLIC_IMG.length + 1);
  const backupPath = join(BACKUP_DIR, rel);
  if (existsSync(backupPath)) return;
  await mkdir(dirname(backupPath), { recursive: true });
  await copyFile(file, backupPath);
}

function fmt(b) {
  if (b > 1024 * 1024) return `${(b / 1024 / 1024).toFixed(2)} MB`;
  if (b > 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${b} B`;
}

async function optimizeImage(file) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const before = (await stat(file)).size;
  await ensureBackup(file);

  const img = await Jimp.read(file);
  if (img.width > MAX_WIDTH) {
    img.resize({ w: MAX_WIDTH });
  }

  // Salva como JPG pros PNGs sem alpha relevante (hero, clinic photos)
  // Mantém PNG pros que podem ter alpha (benefits — porém estes são SVGs no fallback)
  if (ext === ".png" && file.includes("benefit-")) {
    // Benefits PNGs podem ter alpha — recomprime PNG
    await img.write(file);
  } else if (ext === ".png") {
    // Hero PNGs não precisam alpha — converte pra JPG
    const jpgPath = file.replace(/\.png$/i, ".jpg");
    await img.write(jpgPath, { quality: JPG_QUALITY });
    if (jpgPath !== file) {
      const { unlink } = await import("node:fs/promises");
      await unlink(file);
    }
    return { file: jpgPath, before, after: (await stat(jpgPath)).size, converted: true };
  } else {
    // JPGs — recomprime
    await img.write(file, { quality: JPG_QUALITY });
  }

  const after = (await stat(file)).size;
  return { file, before, after, converted: false };
}

async function run() {
  console.log("⏳ Procurando imagens em /public/img/ ...\n");
  const files = (await walk(PUBLIC_IMG)).filter((f) => {
    const e = extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png"].includes(e);
  });

  console.log(`📸 ${files.length} imagens encontradas\n`);
  let totalBefore = 0;
  let totalAfter = 0;
  let optimized = 0;

  for (const file of files) {
    try {
      const result = await optimizeImage(file);
      if (!result) continue;
      totalBefore += result.before;
      totalAfter += result.after;
      const pct = result.after < result.before
        ? `-${Math.round((1 - result.after / result.before) * 100)}%`
        : "0%";
      const tag = result.converted ? "🔄" : (result.after < result.before ? "✅" : "⏭️");
      const rel = file.substring(root.length + 1);
      console.log(`${tag} ${rel}: ${fmt(result.before)} → ${fmt(result.after)} (${pct})`);
      if (result.after < result.before) optimized++;
    } catch (e) {
      console.error(`❌ ${file}: ${e.message}`);
    }
  }

  console.log(`\n─────────`);
  console.log(`Otimizadas:  ${optimized}/${files.length}`);
  console.log(`Antes:       ${fmt(totalBefore)}`);
  console.log(`Depois:      ${fmt(totalAfter)}`);
  console.log(`Economia:    ${fmt(totalBefore - totalAfter)} (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
  console.log(`\nBackup dos originais: ${BACKUP_DIR}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
