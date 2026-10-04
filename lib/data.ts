const G = "https://lh3.googleusercontent.com/aida-public/";

export const IMAGES = {
  livingSalon: "/images/living-salon.png",
  earthHouse: "/images/earth-house.png",
  studioEvening: "/images/studio-evening.png",
  avatar:
    G +
    "AB6AXuBHecSw2zpJJaMKVdEyHbZ_HWS4yoxVoeJyU9kgh0CZDSwosIv9FxO3LcbQu3zDNDls3TOWzc9lhno6nywPCa71hIr2DA9TdPMKPuUGGoMsBRsdNslF3TDnDVm4_mCb0lEdXBUd2XKH6D8pyG0fyq9ZB6QZxrdHjmgmA2iN2qx4gxEKXsq6T2TVSvf3MqH5LPkGfDVC9qlJojTBPoFZr2JAFR2LRa7nrv64fzpNrYNxi5dIAHI-GNaw",
  heroSalon:
    G +
    "AB6AXuCp_novWfwUvGg__cB6WuH-JHYNzD1evly_QgOQKi5o21gwGSNsTCUsRq5pTkVRCq_8IoU9jmNBzGcX3VU4EEXVcVAok00UcOFnDztcOOdw82xPV2APDI7H9Xkal2a0hf5TpMNdWoSOlMYOI5OcXNdwdcAVKSgH4owdcto-2bjwqmlLu-wYExVuej74bu0KthSiYyINcr8yiFxhjw3ufk3BA1RIiwkt5eKqd5TbLQarUDS-FCG3a_pP",
};

export type Category = "residential" | "commercial" | "retreat";

export type Project = {
  slug: string;
  number: string;
  title: string;
  city: string;
  category: Category;
  tag: string;
  summary: string;
  year: string;
  area: string;
  typology: string;
  scope: string;
  image: string;
  alt: string;
  /** desktop grid span + image aspect, mirroring the asymmetric editorial grid */
  span: string;
  aspect: string;
  narrative: string[];
};

export const projects: Project[] = [
  {
    slug: "the-earth-house",
    number: "01",
    title: "The Earth House",
    city: "Ahmedabad",
    category: "residential",
    tag: "Residential",
    summary: "Rammed earth monolithic structure · Passive solar shading · 2026",
    year: "2026",
    area: "4,200 sq.ft",
    typology: "Private Sanctuary Villa",
    scope: "Interior Architecture & Custom FF&E",
    image: IMAGES.earthHouse,
    alt: "Rammed earth living room with curved bouclé sofa, jute rug and fluted oak credenza opening onto a planted water court",
    span: "md:col-span-8",
    aspect: "aspect-[16/10]",
    narrative: [
      "Commissioned as a secluded multi-generational retreat on Ahmedabad’s western periphery, The Earth House orchestrates thermal self-sufficiency through 450mm rammed local red earth walls, shaded interior verandas, and fluted white oak joinery.",
      "Every room opens onto water reflection courtyards that draw south-westerly breezes through slaked-lime corridors, maintaining natural passive cooling without visual friction.",
    ],
  },
  {
    slug: "the-olive-residence",
    number: "02",
    title: "The Olive Residence",
    city: "Surat",
    category: "residential",
    tag: "Private Duplex",
    summary: "Fluted lime plaster, brass joinery, reclaimed teak · 2025",
    year: "2025",
    area: "3,800 sq.ft",
    typology: "Private Duplex",
    scope: "Interior Architecture & Styling",
    image:
      G +
      "AB6AXuB7_ahbEqmNZlr5irbKxmtkYNPKxyxMwb0FLli3Tdk3W35sJfT2Nl9MVM2_2kPtGGj_wMw13y_HuBkKd6G0RwyXsYWe358Wnug1ivEaiPuZ7CSYdZiBLNqGPg9PfnUItscOA3Fa7hJ-s2iZdnj0QsIj-HsK1XE4wcLazbxKWE9otSOLCaqwvGkdaxdQ0BgqZrKO3hTy642Da4FPSRAAsrZjhgV7PQAY1r0n8rJw0TeW-SwOxwrlTamM",
    alt: "Foyer with fluted slaked lime plaster wall and a sandstone pedestal holding a bronze vessel",
    span: "md:col-span-4",
    aspect: "aspect-[3/4]",
    narrative: [
      "A duplex composed around a single fluted lime plaster wall that rises through both levels, catching the low winter sun from the stair void.",
      "Reclaimed teak and unlacquered brass joinery soften the vertical rhythm, while olive lime-washed bedrooms settle into a quieter register.",
    ],
  },
  {
    slug: "the-courtyard-home",
    number: "03",
    title: "The Courtyard Home",
    city: "Vadodara",
    category: "retreat",
    tag: "Heritage",
    summary: "Heritage stone restoration & biophilic breeze channels · 2025",
    year: "2025",
    area: "5,100 sq.ft",
    typology: "Heritage Restoration",
    scope: "Restoration, Interior Architecture & Landscape",
    image:
      G +
      "AB6AXuD4AYi0qCCMC6g8IDXTeRFXoVhD7uxwJPqce8PooHsJPuZzXoBEroISRLJeFS-bb4es89KLtwvIvzvff5JO--dTsCh6n7FOMjQ5Ek3enzOh4z8k6iPjThqrbiKRXY6I5OO-1fCA6F85SFU2eu5rNxBlf5PHN8q_GkCgKZLalZ6t98a4LN72KdkgKoUcuEDB-7dWAIkyBe26X-Zl8biBuvcqD9ed8BXX1BthtFd6GN6vUOH80Ykr7HVK",
    alt: "Inner courtyard with traditional Gujarati stone arcade, shallow reflecting pond and a teak bench",
    span: "md:col-span-5",
    aspect: "aspect-[4/3]",
    narrative: [
      "A restored Gujarati haveli whose stone arcades had been enclosed for decades. We reopened the central court and re-established its shallow reflecting pond.",
      "Biophilic breeze channels, antique stone floors and restrained teak furniture let the original architecture speak without reconstruction.",
    ],
  },
  {
    slug: "the-atelier-hq",
    number: "04",
    title: "The Atelier HQ",
    city: "Mumbai",
    category: "commercial",
    tag: "Studio HQ",
    summary: "Dark smoked timber, Nero Marquina marble & brushed bronze accents · 2024",
    year: "2024",
    area: "2,600 sq.ft",
    typology: "Commercial Studio",
    scope: "Workplace Interior & Bespoke Millwork",
    image:
      G +
      "AB6AXuD_rzkOE6Y_ZSEWy4M_d62y_LjWkWE49N62SwzkjXnZLcHmb-AzlgP2ScKvvRibijq43QVgWMPDg-w9cKtkENy_rOBGViv8z2URHzYJvGgw2z9-6VSPvl83rJPpbCjAUn2QISse3OvMP2LqGafWIOz2JENTcTIXURd47DrtmocAK-si2iWBnmx7MvZLaJClQ1d6elZAZTZ08qetWDu6zeRT7Dn5WjTGf2Txed53A4sAADEKJB9DtgjR",
    alt: "Boardroom with smoked walnut paneling, Nero Marquina marble table and a sculptural brass pendant",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
    narrative: [
      "Our own Mumbai headquarters: a moody, material-first environment where clients review stone, timber and brass under true evening light.",
      "Smoked walnut paneling and a monolithic Nero Marquina table anchor the room beneath a hand-beaten brass pendant.",
    ],
  },
  {
    slug: "casa-verde-penthouse",
    number: "05",
    title: "Casa Verde Penthouse",
    city: "Bangalore",
    category: "residential",
    tag: "Penthouse",
    summary: "Travertine stone masses & tropical terrace integration · 2025",
    year: "2025",
    area: "4,600 sq.ft",
    typology: "Penthouse",
    scope: "Interior Architecture & Terrace Design",
    image:
      G +
      "AB6AXuAbsbbhE8pglU9WyB51IcELbJsvzRLTNWjO1y3npix3vX4yVn3OtwrSDezqIF3QLq3HH49uEkPpqDmwemD-rdMa8j7ecsUtTXEW9gh93kKAgRMWK2rrxJFLnIRwLxHVo9kN5_UbHkX5_M74Wfw1chWA9-YpO3yovPaXjGzr6nO1p36cyXJgBpWfGTtbev52EGTLDgHo2NrKKw2ngEznIPJvKXP97FD1FqxU1VgLvZdiJV2dGNjEUHg0",
    alt: "Sunlit dining space with a honed travertine table, raw stone bench and sheer linen curtains",
    span: "md:col-span-6",
    aspect: "aspect-[16/11]",
    narrative: [
      "A rooftop residence organised around honed travertine masses — a dining monolith, a stone bench, and inset lit shelving carved from the same block.",
      "Floor-to-ceiling sheer linen dissolves the boundary with a tropical terrace planted for shade and scent.",
    ],
  },
  {
    slug: "the-minimalist-practice",
    number: "06",
    title: "The Minimalist Practice",
    city: "Ahmedabad",
    category: "commercial",
    tag: "Workspace",
    summary: "Oak library joinery & parchment acoustics · 2024",
    year: "2024",
    area: "1,900 sq.ft",
    typology: "Private Office",
    scope: "Workplace Interior & Joinery",
    image:
      G +
      "AB6AXuCLm1XhS2W5OpS44H5aNzV-DANMK5oyiE7oIhWmJ5j2TiILcu9s40EtuF4D5MVUAJ7AfBrhB2FHgR9Iz_XvHlzW9e2nyxwoOwJpQNJyJeoffYacsFEx30ovEupxSyc-zFHJI75gwLoJ-hamQN9ri3a2wq1a6mNTsMunZuqeaZlnL3lwRopnjxUFavUf5Jc6m208A_MpoFJZ5q64pqWrJL2N0FvwfhhCnmub4PSacHzzNpvK_dIw2fjt",
    alt: "Private office library with recessed smoked oak shelving and a parchment leather reading chair",
    span: "md:col-span-6",
    aspect: "aspect-[16/11]",
    narrative: [
      "An executive practice conceived as a private library: floor-to-ceiling recessed smoked oak shelving and a lime-washed ceiling that absorbs sound.",
      "Soft task lighting and parchment leather keep the palette hushed and focused.",
    ],
  },
];

export type GalleryItem = {
  image: string;
  alt: string;
  title: string;
  category: Category;
  tag: string;
  /** desktop grid span + image aspect, continuing the projects grid below the case files */
  span: string;
  aspect: string;
};

/** Studio photographs and renders shown alongside the case files in Selected Works. */
export const gallery: GalleryItem[] = [
  {
    image: "/images/623300658_18053229458452294_3111213358015965888_n.webp",
    alt: "Open living room with grey sectional sofa, backlit marble TV wall, fluted timber panels and a ring chandelier",
    title: "Living Room",
    category: "residential",
    tag: "Residential",
    span: "md:col-span-6",
    aspect: "aspect-[16/9]",
  },
  {
    image: "/images/649686690_17900201490244152_6027450473975709598_n.webp",
    alt: "Master bedroom with rust upholstered bed, arched wall panels, walnut wardrobe and sheer linen curtains",
    title: "Master Bedroom",
    category: "residential",
    tag: "Residential",
    span: "md:col-span-6",
    aspect: "aspect-[16/9]",
  },
  {
    image: "/images/464057715_17858327319269618_8257504718237011461_n.webp",
    alt: "Executive cabin with backlit marble shelving, fluted wall panels and a sculptural ribbon pendant light",
    title: "Executive Cabin",
    category: "commercial",
    tag: "Workspace",
    span: "md:col-span-4",
    aspect: "aspect-square",
  },
  {
    image: "/images/655220048_17968065239882171_2028109791229071092_n.webp",
    alt: "Office cabin with grey leather high-back chairs, linear pendant light and framed ginkgo artwork",
    title: "Office Cabin",
    category: "commercial",
    tag: "Workspace",
    span: "md:col-span-4",
    aspect: "aspect-square",
  },
  {
    image: "/images/656334767_18096828154816384_572890411755261853_n.webp",
    alt: "Completed office cabin with walnut desk, linear pendant and glazed partition",
    title: "Office Cabin — Completed",
    category: "commercial",
    tag: "Workspace",
    span: "md:col-span-4",
    aspect: "aspect-square",
  },
  {
    image: "/images/654559456_18155571460451906_3356182601869622489_n.webp",
    alt: "Bedroom with upholstered bed, walnut and ivory wardrobes, oval backlit mirror and ink-wash artwork",
    title: "Bedroom Suite",
    category: "residential",
    tag: "Residential",
    span: "md:col-span-4",
    aspect: "aspect-[16/9]",
  },
  {
    image: "/images/655240718_18097015480957553_2738899952263484484_n.webp",
    alt: "Bedroom with sculpted ivory wall panels, brass-framed mirror, circular wall niche and rust bench",
    title: "Guest Bedroom",
    category: "residential",
    tag: "Residential",
    span: "md:col-span-4",
    aspect: "aspect-[16/9]",
  },
  {
    image: "/images/656718220_18084904868249140_1304101562768950972_n.webp",
    alt: "Twin bedroom with relief-panelled ivory wall, upholstered single beds and monochrome artwork",
    title: "Twin Bedroom",
    category: "residential",
    tag: "Residential",
    span: "md:col-span-4",
    aspect: "aspect-[16/9]",
  },
];

export const filters: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All Works (18)" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial & Studios" },
  { key: "retreat", label: "Retreats & Hospitality" },
];

export const materials = [
  {
    code: "MAT. 01",
    title: "Natural Dholpur Sandstone",
    body: "Thermal mass substrate quarried from Rajasthan basin. Unsealed honed surface retains cool subterranean temperatures during peak subcontinental summers.",
    left: "Thermal Mass",
    right: "Honed Finish",
    image:
      G +
      "AB6AXuB2WRIMrYRmtqNPxLvJuLzlshD7zMjq48h7GKiQSB4KRtpbglA_jTDmCLFihojgiLYZlUDE3EjgT0-y0QHAch0YKYe24MLUFYKLPd2XxmWcbXU78UA61RMvI1ac3pHLg_hb61iOfoJVgMmDJCzcfMJ8zCTk5Zbz0D5u-A1jvplbLkMlTc3oMhzrJiXzezPc82fcI7cVCnpvDeBxdvR2P3ZOyxD9BzyQImd4Su8AiDYxxdA_P6deP8aT",
  },
  {
    code: "MAT. 02",
    title: "Reclaimed Gujarat Teak",
    body: "Salvaged from historic pol architecture. Seasoned over 80+ years, yielding zero moisture shrinkage, rich honey-dark grain, and bespoke tactile warmth.",
    left: "Salvaged 1930s",
    right: "Natural Linseed Oil",
    image:
      G +
      "AB6AXuCmVGv-4Wgy3tBzHbz9fj3-UXST6V2N0uLuefnBknkFDuA5XNkJJSVjDynX-ZZtKeUyaNCw4n62Y5arsWvq0ZuBUiI8EoNpNy_ZFC-c5vLRPGkubPm7ybp5H39kHl7QXDObTKRtdP_pxbt3wlrCUSiI-RHexfPGmRTNkd16_qgkP-qwTibeRDhyaIY71VCGPTzdf2ivml2_meGS3_U4GUUx92eCH1SDnsl4j3wUtqvCbqXzvOL4AVX1",
  },
  {
    code: "MAT. 03",
    title: "Slaked Lime Plaster",
    body: "Aged slaked lime mixed with river sand and vegetable gums. Highly breathable, anti-fungal, seamless, and dampens high-frequency acoustic reflections.",
    left: "Acoustic Softness",
    right: "Hand-Troweled",
    image:
      G +
      "AB6AXuAQRZSyE7OPQLCoXvMPjfMX3f0Ujbq96KCBHaG3a4dYTXEbb3fu0gHYQG_vKNUBM5VxslI9WnB8Yxga4VRt5zchIRFsmHrvfMw23DckqANNoTGmpKtazNPYg4C2lIPdsqPGaPgzYI8jFXtdqm1XJjvqAJnQTGafdzL4clB6mGr8BoCcIGGnG5XskvjsHnieTnNGjFKE7V2z62LcI9N_f7uJ17nMyO3o1JxSwYr5Ps9IHAJbfczUCDVb",
  },
  {
    code: "MAT. 04",
    title: "Patinated Raw Brass",
    body: "Pure unlacquered brass custom-milled for pulls, reveals, and light portals. Develops an organic, deeply personal antique patina through daily touch.",
    left: "Living Metal",
    right: "Unlacquered 98%",
    image:
      G +
      "AB6AXuD7Frahf-jXQrXVGUkjZK7mO3qnFJDFPaQ9RFdN8HT1CRAv73_XTLqvrXA0X34bdEZw9cgFVb_dOC5uvOfb4rxjO0vlr1XtWhC_IwuGvoqgtmHU_ujik3Ip96Kw3wY-b_RC4dCXLD5tXxarNQfXaTShkFa54kFeDS-Yq7WRZK2lKbhS7VKO6p4m8QqjmnGiT5HaOoOoMW8ayu3G1d0OHxWl62SDMuadhYUVXCuIFOHIFGJeHj4x1OPZ",
  },
];

export const services = [
  {
    title: "Interior Architecture",
    body: "Structural alignments, micro-climate sun path simulation, ceiling volumetric transitions, natural daylight portals, and envelope modifications that establish harmonious volume.",
    meta: "Spatial Massing",
    icon: "straighten",
  },
  {
    title: "Interior Design & Curation",
    body: "Atmospheric moodboards, tactile finish schedules, antique architectural fragment sourcing, custom textile hand-weaves, and comprehensive FF&E specification.",
    meta: "Tactile Schedules",
    icon: "palette",
  },
  {
    title: "Turnkey Execution & Site Governance",
    body: "Rigid on-site supervision, artisan master-mason coordination, advanced MEP integration, zero-tolerance joinery fits, and weekly client photographic audit briefs.",
    meta: "Full Oversight",
    icon: "precision_manufacturing",
  },
  {
    title: "Bespoke Millwork & Furniture",
    body: "Commissioned monolithic stone dining slabs, floating timber credenzas, custom unlacquered brass hardware, and studio-designed low-slung seating typologies.",
    meta: "Custom Fabrication",
    icon: "chair",
  },
  {
    title: "Art Direction & Sensory Styling",
    body: "Acquisition of contemporary South Asian ceramics, site-specific canvases, olfactory architectural ambient scents, and layered private library curation.",
    meta: "Gallery Curations",
    icon: "brush",
  },
  {
    title: "Private Architectural Advisory",
    body: "Pre-acquisition land and property assessment, spatial feasibility analyses for legacy properties, and master planning for private collector compounds.",
    meta: "Pre-Acquisition",
    icon: "explore",
  },
];

export const phases = [
  {
    title: "Discover",
    body: "Immersion into how you move, rest, and gather. Site orientation, microclimatic sun studies, and cultural habits documentation.",
    time: "Weeks 01–03",
    border: "border-primary",
  },
  {
    title: "Concept",
    body: "Volumetric diagrams, atmospheric lighting moodboards, initial clay scale models, and spatial axis definition.",
    time: "Weeks 04–07",
    border: "border-secondary",
  },
  {
    title: "Design",
    body: "Exhaustive millwork detailing, full 1:1 tactile stone & plaster mockups, MEP integrations, and custom hardware engineering.",
    time: "Weeks 08–14",
    border: "border-outline",
  },
  {
    title: "Execute",
    body: "On-site craftsmanship coordination, daily masonry tolerances governance, dry-lay stone inspection, and MEP precision fitting.",
    time: "Months 04–10",
    border: "border-primary-container",
  },
  {
    title: "Reveal",
    body: "Turnkey white-glove handover, artisanal book curation, custom signature scent diffusion, and framed architectural archive folio presentation.",
    time: "Handover",
    border: "border-secondary-fixed-dim",
  },
];

export const articles = [
  {
    category: "Architecture",
    read: "6 Min Read",
    title: "5 Principles of Timeless Indian Minimalist Design",
    body: "How moving away from synthetic luxury toward raw stone, deep courtyards, and silent joinery redefines the contemporary Indian domestic sanctum.",
    date: "Published Feb 2026",
    image:
      G +
      "AB6AXuAOq0lBGAedl3BLkRVDPsSxu6esq2bTOcQDxI2p6yOQFr6k0Xnw8-ErNnhbCYnWgBJ1zlt4yZYxIClFaxLB4KEasvuwBVYGlzn27vlHuf3uYNoNWolTtmeFzFwg3_G1eBbHZmyWOjxrL4U89aH1k_YL8Hb3cPb2BrHOdtuE8T1q5_15estUMMwGXsaY3aKobJrPqJIR4FLGDhVR1nAWJALcxqVkFdxqeqHKncXjs34T8UqNIgKwo_DH",
  },
  {
    category: "Materiality",
    read: "8 Min Read",
    title: "How Rammed Earth & Slaked Lime Plaster Transform Room Acoustics",
    body: "Evaluating the micro-porosity of natural wall finishes to eliminate synthetic foam acoustic panels and create naturally hushed spaces.",
    date: "Published Jan 2026",
    image:
      G +
      "AB6AXuBkR94-UcnCpUtA2SkEGuVZtRRQwGJGtuwTZ7qdU4erjUchzsnBlbS10Q6UdPp45fPWd3QbAtLNwmBCt8biV8JuP2FLFv3G-FoQ9TvJgPlz2kufsBDdfV_FFFdxO376wp1dpy00-2EYo6s2fHQBmuQA9oWNrQNLri6xMycGPiSGjAZmtnoVq6fBRnQbrUP4Iqr1PQZlPC3ytoqVliosvgHM4kAAra92FSwE99arz1Kmh_Ctyh4tvbkA",
  },
  {
    category: "Climatic Design",
    read: "5 Min Read",
    title: "The Art of Designing Around Ahmedabad’s Harsh Western Sun",
    body: "Deploying deep stone reveals, indirect light wells, and thermal buffer zones to turn intense desert glare into contemplative ambient glow.",
    date: "Published Dec 2025",
    image:
      G +
      "AB6AXuDxzl9cvJ6HdM7HivmfmEq6DAlh5pi6a7SBG9N0skS2QsAYbfQEv5bIQX-y-8o8SMx9h6ZbGaxTt7s46a6YwBf_irRCbFci-zhTUn4NQzrQL_0hYXIJti-Yu_MOUGaXTj6zmnwwpIsSQAQh-IPZT_2PCg1AblSVLruSl7YlmzeYsgzt7twABn1MVNxesn2vnr7iOROt0MoGuzoxLkJJt8UbfBCoofmjSecW8iL0DqqrYnm1hxkoBwCA",
  },
];

export const vignettes = [
  {
    label: "Joinery Detail",
    image:
      G +
      "AB6AXuDUomrHgYpbqvkc0k6w0MsFHIjyA-uezsCe3-V8_ox8v5iJhcqW5J-O7SdZOWFf0zBCfqa0SMSyBRn-W1k0pysmcJzB-pwCFG_4i5CNxsJI2utfHi4RE2KvyRSMkS0fnTpFWdxOZpfkAlbtEkaxjobIfhSfGraanEnlzHTqb0ypB0g9PEKh9EzTFu4Jx4kT3HGZODxcgjbOBfWc-h7OudqdbDbXxAuwFlfRIGO39ISwON1btRYlagWw",
  },
  {
    label: "Cantilever Step",
    image:
      G +
      "AB6AXuAhrd4ZiXf2XqmGHbeMn2FkPkgoT5wxlTmCM83IG9uy6tOaXETGgIeNI8r_qPSjDszJ08jUIAY0PvQH9SoSmiusZ-5z74-VAyW2yADRIzO-NB0r2yxfO16BOXjc6DL-ODRFJRR3Ei6Y97p2pw_Nbgf_s6r6ToG2e2a8Qw6scJ4wVHWCPsitjvf7m4JJLlTz_qfj4mw6Dp2Ktt9ZojirKl_xAnqb-nypYBiBVipuy9gx6uwxPyvACjvF",
  },
  {
    label: "Stone Powder",
    image:
      G +
      "AB6AXuDZgKVO4GwSdY7HlrwVA3eeghvW1fhRDQanWYVQikvKcing07C-NPnkAmjV8sozoaaTq1WQKYqZVpTR1--y3xQmB-2bRWhmOvEZUhh0Wdr9N7eG07lEHu_QlIQ6YBaHSRXyICVOcvtnp3HnMCKxxUd2wMwlvjYeDp7pJBrlqXcPEagUH9z8xysAQxcDcqMl8_JK2-7kgV4sems1vqOxQl4GpmQ-mB8quC8TJush77wZQj1cNWqGm9fK",
  },
  {
    label: "Material Palette",
    image:
      G +
      "AB6AXuB_foTo8LZ9EKMNOM31IKFXB87UgDpM4edu63DS9Ecw8W78usHJ_1jShowysA1uILp3g11sNSNxuNncudBveLZHsgdjJjBxVn35iur4r8PJqmBYp__wWaqxiEDGMjdKM751uPIHajK9r5_3dajIeDtiWkW9raUBbBS-3lrSzFdKXHNHjDq5mhb84hkelulBB5o7BaXVCmqFwcushBD2Q_vT_8rnAOlcyhMfE7uLFLBKXeRb51Yg5Eb8",
  },
];

export const navItems = [
  { href: "/works", label: "Selected Works" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/materiality", label: "Materiality" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export const dayMoments = [
  {
    time: "06:40",
    phase: "Dawn",
    title: "First light on travertine",
    body: "Sheer linen softens the eastern sun into a single warm wash. The stone walls are still cool from the night; the house wakes slowly.",
    image: IMAGES.livingSalon,
    bg: "#efe7da",
    fg: "#241b14",
  },
  {
    time: "12:30",
    phase: "Noon",
    title: "Shade, stone, stillness",
    body: "450mm rammed earth walls hold the heat at bay. Deep verandas cast long shadows, and the courtyard pond draws a breeze through every room.",
    image: IMAGES.earthHouse,
    bg: "#f4e3c1",
    fg: "#241b14",
  },
  {
    time: "17:50",
    phase: "Dusk",
    title: "The courtyard exhales",
    body: "The western sun slips low across the arcade. Family gathers on the teak bench as the reflecting pond turns to copper.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4AYi0qCCMC6g8IDXTeRFXoVhD7uxwJPqce8PooHsJPuZzXoBEroISRLJeFS-bb4es89KLtwvIvzvff5JO--dTsCh6n7FOMjQ5Ek3enzOh4z8k6iPjThqrbiKRXY6I5OO-1fCA6F85SFU2eu5rNxBlf5PHN8q_GkCgKZLalZ6t98a4LN72KdkgKoUcuEDB-7dWAIkyBe26X-Zl8biBuvcqD9ed8BXX1BthtFd6GN6vUOH80Ykr7HVK",
    bg: "#a86f45",
    fg: "#fcf9f3",
  },
  {
    time: "21:15",
    phase: "Night",
    title: "Brass and lamplight",
    body: "2700K coves graze the walnut; a hand-beaten brass pendant pools light over the table. The house becomes intimate, quiet, complete.",
    image: IMAGES.studioEvening,
    bg: "#1a1410",
    fg: "#f3f0ea",
  },
];

export const blueprintSteps = [
  {
    label: "The Plan",
    title: "Every home begins as a single line.",
    body: "Sun paths, prevailing breezes, and the way a family moves through a day — all resolved on paper first.",
  },
  {
    label: "The Material",
    title: "Then the line becomes stone.",
    body: "Rammed red earth, honed sandstone and fluted oak give the drawing weight, texture, and thermal mass.",
  },
  {
    label: "The Light",
    title: "Light is the final material.",
    body: "Glazed courtyards and shaded verandas are tuned until the afternoon sun arrives softly, never harshly.",
  },
  {
    label: "The Life",
    title: "And finally, it is lived in.",
    body: "A home is complete only when it holds Sunday afternoons, long conversations, and quiet mornings.",
  },
];

export const stats = [
  { value: 18, suffix: "", label: "Homes & spaces completed" },
  { value: 8, suffix: "", label: "Years of quiet practice" },
  { value: 42, suffix: "", label: "Master artisans in our circle" },
  { value: 4, suffix: "°C", label: "Cooler, by passive design alone" },
];
