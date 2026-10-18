"use client";

import * as THREE from "three";
import { gsap } from "@/lib/gsap";

export type Stage = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  width: number;
  height: number;
  dispose: () => void;
};

type StageOptions = {
  fov?: number;
  z?: number;
  maxDpr?: number;
  /** keep rendering even when scrolled out of view (e.g. the fixed loader) */
  alwaysRender?: boolean;
  onResize?: (width: number, height: number) => void;
  onFrame?: (time: number, delta: number) => void;
};

/**
 * A transparent WebGL canvas filling `container`, driven by the GSAP ticker (so it stays in step with Lenis)
 * and paused while off-screen or in a background tab. Returns null where WebGL is unavailable,
 * leaving the page's plain HTML version in place.
 */
export function createStage(container: HTMLElement, opts: StageOptions = {}): Stage | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.maxDpr ?? 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none";
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(opts.fov ?? 45, 1, 0.1, 100);
  camera.position.z = opts.z ?? 5;

  const stage: Stage = { renderer, scene, camera, width: 1, height: 1, dispose };

  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    stage.width = w;
    stage.height = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    opts.onResize?.(w, h);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  let visible = !!opts.alwaysRender;
  const io = opts.alwaysRender
    ? null
    : new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "120px" });
  io?.observe(container);

  const tick = (time: number, deltaMs: number) => {
    if (!visible || document.hidden) return;
    opts.onFrame?.(time, Math.min(deltaMs / 1000, 0.1));
    renderer.render(scene, camera);
  };
  gsap.ticker.add(tick);

  function dispose() {
    gsap.ticker.remove(tick);
    ro.disconnect();
    io?.disconnect();
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      mesh.geometry?.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
      mats.forEach((m) => {
        Object.values(m).forEach((v) => v instanceof THREE.Texture && v.dispose());
        m.dispose();
      });
    });
    if (scene.environment) scene.environment.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  }

  return stage;
}

/** Pointer position across the whole window, normalised to -1…1 (y up). */
export const pointer = new THREE.Vector2();
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => pointer.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1)),
    { passive: true },
  );
}
