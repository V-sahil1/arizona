"use client";

import * as THREE from "three";
import { gsap } from "@/lib/gsap";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uCover;
  uniform vec2 uMouse;
  uniform vec2 uVel;
  uniform float uHover;
  uniform float uTime;
  uniform float uAspect;
  varying vec2 vUv;

  void main() {
    vec2 d = vUv - uMouse;
    d.x *= uAspect;
    float dist = length(d);
    vec2 dir = normalize(d + 1e-5);

    // rings spreading from the cursor like a drop on still water, plus the surface dragged along with it
    float ring = sin(dist * 34.0 - uTime * 5.0) * exp(-dist * 6.0);
    vec2 offs = dir * ring * 0.01 * uHover + clamp(uVel, -0.05, 0.05) * exp(-dist * 4.0) * 0.06;

    // object-fit: cover, with the gentle hover zoom the cards always had
    vec2 uv = (vUv - 0.5) * uCover / (1.0 + 0.06 * uHover) + 0.5 + offs;

    // light splits into its colours where the surface moves fastest
    vec2 split = normalize(uVel + 1e-5) * (min(length(uVel), 0.04) * 0.25 + 0.002 * uHover) * exp(-dist * 4.0);
    vec3 col = vec3(texture2D(uTex, uv + split).r, texture2D(uTex, uv).g, texture2D(uTex, uv - split).b);

    // a soft pool of brass light follows the cursor
    col += vec3(0.99, 0.87, 0.66) * 0.1 * uHover * exp(-dist * 5.0);
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

/**
 * Liquid hover for image cards inside `root`: one WebGL canvas is slipped behind the hovered card's overlays
 * and renders its photo with ripples, drag and chromatic split. Desktop pointers only; no-op elsewhere.
 */
export function attachRipple(root: HTMLElement, selector: string) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};

  let renderer: THREE.WebGLRenderer | null = null;
  let material: THREE.ShaderMaterial;
  let scene: THREE.Scene;
  const camera = new THREE.Camera();
  const textures = new Map<string, Promise<THREE.Texture>>();
  const loader = new THREE.TextureLoader().setCrossOrigin("anonymous");
  const mouse = new THREE.Vector2(0.5, 0.5);
  const target = new THREE.Vector2(0.5, 0.5);
  const vel = new THREE.Vector2();
  let current: HTMLElement | null = null;
  let running = false;

  const uniforms = {
    uTex: { value: null as THREE.Texture | null },
    uCover: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: mouse },
    uVel: { value: vel },
    uHover: { value: 0 },
    uTime: { value: 0 },
    uAspect: { value: 1 },
  };

  const init = () => {
    if (renderer) return true;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    } catch {
      return false;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0";
    material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene = new THREE.Scene();
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
    return true;
  };

  const texture = (src: string) => {
    if (!textures.has(src)) {
      textures.set(
        src,
        loader.loadAsync(src).then((t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          return t;
        }),
      );
    }
    return textures.get(src)!;
  };

  const tick = (time: number, deltaMs: number) => {
    if (!renderer) return;
    const dt = Math.min(deltaMs / 1000, 0.1);
    uniforms.uTime.value = time;
    const prev = mouse.clone();
    mouse.lerp(target, 1 - Math.pow(0.0005, dt));
    vel.lerp(mouse.clone().sub(prev).multiplyScalar(4), 1 - Math.pow(0.01, dt));
    renderer.render(scene, camera);
  };
  const start = () => {
    if (running) return;
    running = true;
    gsap.ticker.add(tick);
  };
  const stop = () => {
    running = false;
    gsap.ticker.remove(tick);
  };

  const enter = (box: HTMLElement) => {
    const img = box.querySelector("img");
    if (!img || !init() || !renderer) return;
    current = box;
    const canvas = renderer.domElement;
    const { width, height } = box.getBoundingClientRect();
    renderer.setSize(width, height, false);
    uniforms.uAspect.value = width / height;
    img.after(canvas); // above the photo, beneath the card's labels and overlays

    texture(img.currentSrc || img.src).then(
      (tex) => {
        if (current !== box) return;
        const { width: iw, height: ih } = tex.image as HTMLImageElement;
        const imgAspect = iw / ih;
        const boxAspect = width / height;
        uniforms.uCover.value.set(Math.min(boxAspect / imgAspect, 1), Math.min(imgAspect / boxAspect, 1));
        uniforms.uTex.value = tex;
        start();
        gsap.to(canvas, { opacity: 1, duration: 0.25, overwrite: true });
        gsap.to(uniforms.uHover, { value: 1, duration: 0.9, ease: "power3.out", overwrite: true });
      },
      () => {}, // the image host refused cross-origin use: leave the plain CSS hover
    );
  };

  const leave = () => {
    if (!current || !renderer) return;
    current = null;
    const canvas = renderer.domElement;
    gsap.to(uniforms.uHover, { value: 0, duration: 0.5, ease: "power2.out", overwrite: true });
    gsap.to(canvas, {
      opacity: 0,
      duration: 0.45,
      delay: 0.1,
      overwrite: true,
      onComplete: () => {
        if (current) return;
        stop();
        canvas.remove();
      },
    });
  };

  const move = (e: PointerEvent) => {
    const box = (e.target as Element).closest<HTMLElement>(selector);
    if (box !== current) {
      leave();
      if (box) {
        const r = box.getBoundingClientRect();
        target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
        mouse.copy(target);
        enter(box);
      }
    }
    if (box) {
      const r = box.getBoundingClientRect();
      target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    }
  };

  root.addEventListener("pointermove", move);
  root.addEventListener("pointerleave", leave);

  return () => {
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerleave", leave);
    stop();
    textures.forEach((p) => p.then((t) => t.dispose(), () => {}));
    if (renderer) {
      renderer.domElement.remove();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    }
  };
}
