"use client";

import * as THREE from "three";
import { createStage, pointer } from "./stage";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWarp;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  attribute float aSeed;
  attribute float aScale;
  varying float vAlpha;

  void main() {
    vec3 p = position;

    // a slow updraft, wrapped so the field never empties
    p.y = mod(p.y + uTime * (0.05 + aSeed * 0.08) + 3.2, 6.4) - 3.2;
    p.x += sin(uTime * 0.35 + aSeed * 31.0 + p.y * 0.8) * 0.28;
    p.z += cos(uTime * 0.27 + aSeed * 17.0) * 0.22;

    // parallax: nearer motes drift further with the pointer
    float depth = clamp((p.z + 5.0) / 7.5, 0.0, 1.0);
    p.xy += uMouse * (0.12 + depth * 0.45);

    // warp: the whole field is drawn through the doorway toward the viewer
    p.z += uWarp * (4.0 + aSeed * 9.0);
    p.xy *= 1.0 + uWarp * 0.6 * aSeed;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 + uWarp * 1.5) / max(-mv.z, 0.1);

    float twinkle = 0.55 + 0.45 * sin(uTime * (1.2 + aSeed * 2.5) + aSeed * 40.0);
    vAlpha = twinkle * smoothstep(0.0, 1.2, -mv.z) * smoothstep(12.0, 6.0, -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, d);
    glow *= glow;
    float core = smoothstep(0.16, 0.0, d);
    gl_FragColor = vec4(mix(uColor, vec3(1.0), core * 0.6), (glow * 0.8 + core * 0.4) * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

type DustOptions = { count: number; size: number; opacity?: number; alwaysRender?: boolean; color?: string };

/** Brass dust motes hanging in a shaft of light: a GPU point field with pointer parallax and a "warp" rush. */
export function createDust(container: HTMLElement, { count, size, opacity = 1, alwaysRender, color = "#fddfa9" }: DustOptions) {
  const mouse = new THREE.Vector2();
  const uniforms = {
    uTime: { value: 0 },
    uWarp: { value: 0 },
    uSize: { value: size },
    uOpacity: { value: opacity },
    uPixelRatio: { value: 1 },
    uMouse: { value: mouse },
    uColor: { value: new THREE.Color(color) },
  };

  const stage = createStage(container, {
    fov: 55,
    z: 4,
    maxDpr: 1.75,
    alwaysRender,
    onFrame: (time, delta) => {
      uniforms.uTime.value = time;
      mouse.lerp(pointer, 1 - Math.pow(0.04, delta)); // eased follow, frame-rate independent
    },
  });
  if (!stage) return null;
  uniforms.uPixelRatio.value = stage.renderer.getPixelRatio();

  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const scales = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() * 2 - 1) * 5;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * 3.2;
    positions[i * 3 + 2] = -5 + Math.random() * 7.5;
    seeds[i] = Math.random();
    scales[i] = 0.4 + Math.pow(Math.random(), 3) * 1.6; // mostly fine grains, a few large out-of-focus flecks
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  stage.scene.add(points);

  return { uniforms, dispose: stage.dispose };
}
