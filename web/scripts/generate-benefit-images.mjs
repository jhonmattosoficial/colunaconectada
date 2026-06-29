#!/usr/bin/env node
/**
 * Generate the 6 benefit card images via Higgsfield Soul API.
 *
 * Setup:
 *   1. Top up credits at https://higgsfield.ai
 *   2. Confirm web/.env.local has HIGGSFIELD_API_KEY_ID and HIGGSFIELD_API_KEY_SECRET
 *   3. Run: node scripts/generate-benefit-images.mjs
 *
 * Output:
 *   web/public/img/benefit-1.png ... benefit-6.png
 *
 * Cost reference: Soul 720p batch=1 is the cheapest tier. Each call = 1 image.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// --- Load credentials from .env.local
function loadEnv() {
  const envPath = resolve(root, ".env.local");
  if (!existsSync(envPath)) {
    console.error("❌ Missing .env.local at", envPath);
    process.exit(1);
  }
  const text = readFileSync(envPath, "utf8");
  const env = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

const env = loadEnv();
const KEY = env.HIGGSFIELD_API_KEY_ID;
const SECRET = env.HIGGSFIELD_API_KEY_SECRET;

if (!KEY || !SECRET) {
  console.error("❌ HIGGSFIELD_API_KEY_ID and HIGGSFIELD_API_KEY_SECRET required in .env.local");
  process.exit(1);
}

const BRAND_STYLE =
  "editorial wellness photography, deep navy blue and lime green color palette, " +
  "soft natural light, modern minimalist composition, photorealistic, " +
  "no text, no faces close-up, calming and trustworthy atmosphere";

const TASKS = [
  {
    file: "benefit-1.png",
    prompt: `A person mid-stretch with fluid graceful movement against soft morning light, sense of lightness and ease. ${BRAND_STYLE}`,
  },
  {
    file: "benefit-2.png",
    prompt: `Soft blue light dissolving tension from relaxed shoulders, dreamy abstract steam-like particles, release of muscle tension. ${BRAND_STYLE}`,
  },
  {
    file: "benefit-3.png",
    prompt: `A person walking confidently outdoors at sunrise with strong energy and vitality, golden-cool light. ${BRAND_STYLE}`,
  },
  {
    file: "benefit-4.png",
    prompt: `Abstract human silhouette in mindful balance pose with glowing blue and lime energy lines along the spine, body awareness. ${BRAND_STYLE}`,
  },
  {
    file: "benefit-5.png",
    prompt: `Soft blue water waves dissolving into lime green light, metaphor for pain release, abstract calming flow. ${BRAND_STYLE}`,
  },
  {
    file: "benefit-6.png",
    prompt: `Two people laughing while walking on a wooded path in late afternoon, freedom of movement, lifestyle. ${BRAND_STYLE}`,
  },
];

const BASE_URL = "https://platform.higgsfield.ai";
const HEADERS = {
  "hf-api-key": KEY,
  "hf-secret": SECRET,
  "Content-Type": "application/json",
};

async function generate(prompt) {
  const res = await fetch(`${BASE_URL}/v1/text2image/soul`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      params: {
        prompt,
        width_and_height: "1696x960", // landscape ~16:9 fits the card image area
        quality: "720p",
        batch_size: 1,
      },
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Generate failed (${res.status}): ${detail}`);
  }
  return res.json();
}

async function pollJobSet(jobSetId, maxWaitMs = 300_000, intervalMs = 3000) {
  const deadline = Date.now() + maxWaitMs;
  while (Date.now() < deadline) {
    const res = await fetch(`${BASE_URL}/v1/job-sets/${jobSetId}`, {
      headers: HEADERS,
    });
    if (!res.ok) throw new Error(`Poll failed: ${res.status}`);
    const data = await res.json();
    const status = data.status || data.state;
    if (status === "completed" || status === "succeeded") return data;
    if (status === "failed" || status === "error") {
      throw new Error(`Job failed: ${JSON.stringify(data)}`);
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error("Polling timed out");
}

function findImageUrl(jobSet) {
  // Walk a few common shapes the API may return
  const candidates = [
    jobSet?.jobs?.[0]?.results?.raw?.url,
    jobSet?.jobs?.[0]?.result?.url,
    jobSet?.jobs?.[0]?.output?.[0]?.url,
    jobSet?.output?.[0]?.url,
    jobSet?.result?.url,
  ];
  return candidates.find((u) => typeof u === "string" && u.startsWith("http"));
}

async function downloadTo(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
}

async function run() {
  const outDir = resolve(root, "public", "img");
  mkdirSync(outDir, { recursive: true });

  for (const task of TASKS) {
    const dest = resolve(outDir, task.file);
    if (existsSync(dest)) {
      console.log(`⏭  Skipping ${task.file} (already exists)`);
      continue;
    }
    console.log(`⏳ ${task.file}: requesting...`);
    try {
      const jobSet = await generate(task.prompt);
      const jobSetId = jobSet.id || jobSet.job_set_id;
      console.log(`   job_set=${jobSetId} — polling`);
      const finished = await pollJobSet(jobSetId);
      const url = findImageUrl(finished);
      if (!url) throw new Error(`No image URL found: ${JSON.stringify(finished).slice(0, 200)}`);
      console.log(`   downloading ${url}`);
      await downloadTo(url, dest);
      console.log(`✅ ${task.file} → ${dest}`);
    } catch (e) {
      console.error(`❌ ${task.file}: ${e.message}`);
      // Continue with the rest so partial runs are useful
    }
  }
  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
