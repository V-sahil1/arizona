/** Linen drapes that gather to the sides during the hero intro. */
export function Curtains() {
  return (
    <>
      <div data-curtain="l" className="curtain absolute inset-y-0 left-0 w-1/2 origin-left" />
      <div data-curtain="r" className="curtain absolute inset-y-0 right-0 w-1/2 origin-right" />
    </>
  );
}

/** A band of afternoon sun drifting across the room. */
export function Sunbeam() {
  return (
    <div
      data-sunbeam
      className="pointer-events-none absolute inset-y-[-20%] left-0 w-1/3 bg-gradient-to-r from-transparent via-[#fddfa9]/15 to-transparent mix-blend-screen blur-2xl"
    />
  );
}

/** Ground-floor plan of The Earth House: walls, door swings, glazing, pond, furniture, dimensions. */
const PLAN_PATHS: { d: string; w?: number }[] = [
  { d: "M20 40 H500 V320 H20 Z", w: 2 },
  { d: "M220 40 V170 M220 230 V320" },
  { d: "M20 200 H150" },
  { d: "M360 40 V130 M360 190 V250" },
  { d: "M220 230 L220 180 A50 50 0 0 1 270 230" },
  { d: "M360 190 L405 190 A45 45 0 0 0 360 145" },
  { d: "M70 36 H170 M70 44 H170 M390 316 H480 M390 324 H480" },
  { d: "M60 250 H180 V300 H60 Z" },
  { d: "M395 275 Q440 225 490 255" },
  { d: "M290 110 m-26 0 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0" },
  { d: "M20 345 H500 M20 338 V352 M500 338 V352" },
  { d: "M512 40 V320 M505 40 H519 M505 320 H519" },
];

const LABELS = [
  { x: 260, y: 370, size: 10, text: "PLAN 084 — 4,200 SQ.FT — GROUND LEVEL" },
  { x: 120, y: 280, size: 8, text: "POND" },
  { x: 120, y: 120, size: 8, text: "LIVING SALON" },
  { x: 290, y: 280, size: 8, text: "DINING" },
  { x: 430, y: 90, size: 8, text: "COURT" },
];

/**
 * The plan as an SVG. `pathAttr` / `labelAttr` name the data attributes the animation engine looks for,
 * so the same drawing can play in the hero intro and in the scroll story.
 */
export function PlanSvg({
  stroke = "#dfc390",
  pathAttr = "data-bp",
  labelAttr = "data-bp-text",
  className = "",
}: {
  stroke?: string;
  pathAttr?: string;
  labelAttr?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 520 380" className={`h-auto w-full ${className}`} aria-hidden="true">
      {PLAN_PATHS.map((p) => (
        <path
          key={p.d}
          {...{ [pathAttr]: "" }}
          d={p.d}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          fill="none"
          stroke={stroke}
          strokeWidth={p.w ?? 1.2}
        />
      ))}
      {LABELS.map((l) => (
        <text
          key={l.text}
          {...{ [labelAttr]: "" }}
          data-anim-hide
          x={l.x}
          y={l.y}
          textAnchor="middle"
          fill={stroke}
          fontSize={l.size}
          letterSpacing={l.size > 8 ? 3 : 2}
          fontFamily="var(--font-manrope)"
        >
          {l.text}
        </text>
      ))}
    </svg>
  );
}
