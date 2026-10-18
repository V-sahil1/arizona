"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { createStage, pointer } from "@/lib/three/stage";
import { materialTexture, type MaterialKind } from "@/lib/three/textures";

type Sample = { code: string; title: string; right: string };

const KINDS: MaterialKind[] = ["sandstone", "teak", "plaster", "brass"];

/**
 * The workshop's sample board, rendered live: four slabs (sandstone, teak, lime plaster, brass) rise out of the dark
 * as a stacked deck, fan out as the section scrolls in, lean toward the cursor, and lift forward when inspected.
 */
export default function MaterialBoard({ samples }: { samples: Sample[] }) {
  const mount = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = mount.current!;
    let cleanup: (() => void) | undefined;
    // build only as the board approaches, so painting the textures never competes with the page intro
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        cleanup = buildBoard(el, setActive);
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (!caption.current) return;
    gsap.fromTo(
      caption.current.children,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", overwrite: true },
    );
  }, [active]);

  const sample = active === null ? null : samples[active];

  return (
    <div data-reveal className="relative mb-10 h-120 overflow-hidden bg-primary md:mb-16 md:h-140">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(253,223,169,0.14), transparent 70%)" }}
      />
      <div ref={mount} className="absolute inset-0 touch-pan-y" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-8">
        <span className="text-label-sm tracking-[0.2em] text-secondary-fixed uppercase">Sample Board · Live Render</span>
        <span className="text-label-sm tracking-[0.2em] text-surface-variant/60 uppercase">
          <span className="hidden md:inline">Hover</span>
          <span className="md:hidden">Tap</span> a sample
        </span>
      </div>

      <div ref={caption} className="pointer-events-none absolute bottom-0 left-0 p-5 md:p-8">
        <span className="block text-label-sm tracking-[0.2em] text-secondary-fixed-dim uppercase">
          {sample ? `${sample.code} · ${sample.right}` : "Four materials · Aged in our workshop"}
        </span>
        <span className="mt-2 block font-serif text-headline-sm text-surface md:text-headline-md">
          {sample ? sample.title : "Stone, timber, lime & brass"}
        </span>
      </div>
    </div>
  );
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const damp = (dt: number, rate: number) => 1 - Math.pow(rate, dt);

function buildBoard(el: HTMLElement, onActive: (i: number | null) => void) {
  const group = new THREE.Group();
  const slabs: THREE.Mesh[] = [];
  const lift = KINDS.map(() => 0);
  const local = new THREE.Vector2(9, 9); // pointer over the board in NDC (9 = outside)
  const tilt = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let layout: "fan" | "grid" = "fan";
  let progress = 0;
  let shown = 0;
  let hovered: number | null = null;

  const stage = createStage(el, {
    fov: 32,
    z: 8,
    onResize: (w, h) => {
      const aspect = w / h;
      layout = aspect < 1.1 ? "grid" : "fan";
      const visH = 2 * 8 * Math.tan(THREE.MathUtils.degToRad(16));
      const visW = visH * aspect;
      group.scale.setScalar(layout === "fan" ? Math.min(1, (visW * 0.92) / 6.2) : Math.min(1, (visW * 0.8) / 2.9, (visH * 0.66) / 3.9));
    },
    onFrame: (time, dt) => {
      shown += (progress - shown) * damp(dt, 0.004);
      const target = local.x < 2 ? local : pointer;
      tilt.lerp(target, damp(dt, 0.02));
      group.rotation.y = tilt.x * 0.28;
      group.rotation.x = -tilt.y * 0.16;

      slabs.forEach((slab, i) => {
        lift[i] += ((hovered === i ? 1 : 0) - lift[i]) * damp(dt, 0.0008);
        const k = i - 1.5;
        const rise = smooth(i * 0.05, 0.32 + i * 0.05, shown);
        const spread = smooth(0.3, 0.9, shown);

        // stacked deck → final arrangement
        const sx = k * 0.14;
        const sz = -i * 0.22;
        const [tx, ty, tz, ry] =
          layout === "fan"
            ? [k * 1.6, 0, -Math.abs(k) * 0.3, -k * 0.22]
            : [((i % 2) - 0.5) * 1.5, (i < 2 ? 1 : -1) * 0.98, 0, ((i % 2) - 0.5) * -0.3];

        slab.position.set(
          THREE.MathUtils.lerp(sx, tx, spread),
          THREE.MathUtils.lerp(-0.03 * i, ty, spread) - (1 - rise) * 4 + Math.sin(time * 0.9 + i * 1.3) * 0.05,
          THREE.MathUtils.lerp(sz, tz, spread) + lift[i] * 0.6,
        );
        slab.rotation.set(
          Math.sin(time * 0.6 + i) * 0.04 + (1 - rise) * 0.6,
          THREE.MathUtils.lerp(0.55, ry, spread) * (1 - lift[i] * 0.8),
          THREE.MathUtils.lerp(0.07 * k, 0, spread) + (1 - rise) * k * 0.2,
        );
        slab.scale.setScalar(1 + lift[i] * 0.06);
      });
    },
  });
  if (!stage) return;

  const { renderer, scene, camera } = stage;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  scene.environmentIntensity = 0.55;
  room.dispose();
  pmrem.dispose();

  const key = new THREE.DirectionalLight("#ffe1b0", 2.4);
  key.position.set(3, 4, 5);
  const rim = new THREE.DirectionalLight("#fddfa9", 1.4);
  rim.position.set(-4, 2, -3);
  scene.add(key, rim, group);

  const geometry = new RoundedBoxGeometry(1.3, 1.8, 0.12, 4, 0.04);
  KINDS.forEach((kind) => {
    const map = materialTexture(kind);
    const material =
      kind === "brass"
        ? new THREE.MeshPhysicalMaterial({ map, metalness: 1, roughness: 0.32 })
        : new THREE.MeshPhysicalMaterial({
            map,
            bumpMap: map,
            bumpScale: kind === "teak" ? 1.5 : 3,
            roughness: kind === "teak" ? 0.5 : kind === "plaster" ? 0.97 : 0.9,
            clearcoat: kind === "teak" ? 0.35 : 0, // linseed oil sheen
            clearcoatRoughness: 0.4,
          });
    const slab = new THREE.Mesh(geometry, material);
    slabs.push(slab);
    group.add(slab);
  });

  const st = ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    end: "center 50%",
    onUpdate: (self) => (progress = self.progress),
  });
  progress = st.progress;

  const pick = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    local.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    raycaster.setFromCamera(local, camera);
    const hit = raycaster.intersectObjects(slabs, false)[0];
    const idx = hit ? slabs.indexOf(hit.object as THREE.Mesh) : null;
    if (idx !== hovered) {
      hovered = idx;
      el.style.cursor = idx === null ? "" : "pointer";
      onActive(idx);
    }
  };
  const leave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return; // a tapped sample stays lifted on touch screens
    local.set(9, 9);
    hovered = null;
    onActive(null);
  };
  el.addEventListener("pointermove", pick);
  el.addEventListener("pointerdown", pick);
  el.addEventListener("pointerleave", leave);

  return () => {
    st.kill();
    el.removeEventListener("pointermove", pick);
    el.removeEventListener("pointerdown", pick);
    el.removeEventListener("pointerleave", leave);
    stage.dispose();
  };
}
