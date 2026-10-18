"use client";

import * as THREE from "three";

/** Seeded 2D value noise + fractal sum, enough to grow stone, grain and trowel marks procedurally. */
function makeNoise(seed: number) {
  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const perm = new Uint8Array(512);
  const vals = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
    vals[i] = rand();
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];

  const v = (x: number, y: number) => vals[perm[perm[x & 255] + (y & 255)]];
  const noise = (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const u = xf * xf * (3 - 2 * xf);
    const w = yf * yf * (3 - 2 * yf);
    const a = v(xi, yi) + (v(xi + 1, yi) - v(xi, yi)) * u;
    const b = v(xi, yi + 1) + (v(xi + 1, yi + 1) - v(xi, yi + 1)) * u;
    return a + (b - a) * w;
  };
  const fbm = (x: number, y: number, octaves = 4) => {
    let sum = 0;
    let amp = 0.5;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += noise(x, y) * amp;
      norm += amp;
      x *= 2.03;
      y *= 2.03;
      amp *= 0.5;
    }
    return sum / norm;
  };
  return { noise, fbm, rand };
}

type RGB = [number, number, number];
const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

function paint(size: number, shade: (u: number, v: number) => RGB) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const [r, g, b] = shade(x / size, y / size);
      const i = (y * size + x) * 4;
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export type MaterialKind = "sandstone" | "teak" | "plaster" | "brass";

/** Colour map for each workshop sample; the same map doubles as a bump map for the porous ones. */
export function materialTexture(kind: MaterialKind, size = 384) {
  const { fbm, rand } = makeNoise(kind.length * 977 + kind.charCodeAt(0));

  switch (kind) {
    // Dholpur sandstone: dusty pink-beige with soft bedding bands and fine quartz speckle
    case "sandstone": {
      const a = hex("#c4977a");
      const b = hex("#e6c7ab");
      return paint(size, (u, v) => {
        const n = fbm(u * 5, v * 5, 5);
        const bands = Math.sin(v * 46 + fbm(u * 2, v * 2) * 7) * 0.06;
        const speck = (rand() - 0.5) * 0.14;
        return mix(a, b, clamp01(n * 1.25 - 0.1 + bands + speck));
      });
    }
    // Reclaimed teak: honey-dark flat-sawn grain with pores
    case "teak": {
      const dark = hex("#4e2c14");
      const honey = hex("#a8682f");
      return paint(size, (u, v) => {
        const warp = fbm(u * 1.5, v * 2.5, 4) * 2.4;
        const grain = Math.sin((u * 16 + warp) * Math.PI) * 0.5 + 0.5;
        const figure = fbm(u * 3, v * 1.2, 3) * 0.35; // broad colour drift across the board
        const pores = fbm(u * 90, v * 3, 2) * 0.18 + rand() * 0.05;
        return mix(dark, honey, clamp01(Math.pow(grain, 2.2) * 0.45 + figure + pores));
      });
    }
    // Slaked lime plaster: chalky warm white with broad trowel sweeps
    case "plaster": {
      const shade = hex("#bfb3a0");
      const lime = hex("#efe9dd");
      return paint(size, (u, v) => {
        const sweep = fbm(u * 3 + v * 1.5, v * 2.2, 5);
        const trowel = Math.pow(Math.abs(Math.sin((u * 5 + v * 3 + sweep * 2.5) * Math.PI)), 12) * 0.25;
        const mottle = fbm(u * 14, v * 14, 3) * 0.25;
        return mix(shade, lime, clamp01(0.15 + sweep * 0.8 + mottle - trowel + (rand() - 0.5) * 0.05));
      });
    }
    // Raw brass: brushed horizontal streaks with a few patina blooms
    case "brass": {
      const brass = hex("#caa057");
      const bright = hex("#ecca86");
      const patina = hex("#6d5a32");
      return paint(size, (u, v) => {
        const brushed = fbm(u * 1.2, v * 140, 3);
        let c = mix(brass, bright, clamp01(brushed * 1.2 - 0.2));
        const bloom = fbm(u * 4 + 9, v * 4 + 3, 4);
        c = mix(c, patina, clamp01((bloom - 0.62) * 3.2) * 0.7);
        return c;
      });
    }
  }
}
