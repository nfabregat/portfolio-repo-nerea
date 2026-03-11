export type ProjectTag = string;

export interface Project {
  slug: string; 
  title: string;      
  summary: string;
  year: string;
  tags: ProjectTag[];
  tools: string[];
  cover: string;   
  
  description: string;
  gallery: string[];


  course?: string;
  assignment?: string;
  team?: string[];
  keywords?: string[];
  concept?: string;
  inspiration?: string[];
  takeaways?: {
    strengths: string[];
    limitations: string[];
  };
  heroImage?: string;
}

const baseUrl = import.meta.env.BASE_URL ?? "/";

function withBase(path: string) {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}${normalizedPath}`;
}

export const projects: Project[] = [
  {
    slug: "transversal2",
    heroImage: withBase("/portfolio/projects/transversal2/07.webp"),
    title: "Sobrevive a la Vida",
    summary:
      "Survive the Life is a mental-health inspired board game concept focused on emotional intelligence. I created the visual identity and the final game assets with a playful, youth-friendly tone.",
    year: "2026",
    tags: ["illustrator", "photoshop", "blender", "photography", "procreate"],
    tools: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Blender",
      "Procreate",
      "Photography",
    ],
    cover: withBase("/portfolio/covers/transversal2.webp"),

    description:
      "The project translates emotional skills into approachable visuals. The focus was on creating a cohesive graphic system for the board, cards, and tokens—clear, readable, and consistent across all pieces.",
    concept:
      "A game aesthetic inspired by mental health and emotional awareness, designed to feel friendly rather than clinical. Humor, color and iconography help make an “intimidating” topic feel approachable and engaging.",
    inspiration: [
      "Bold, modular layouts for quick scanning.",
      "High-contrast hierarchy (titles, icons, key text).",
      "A playful visual language to balance a sensitive theme.",
    ],
    gallery: [
      withBase("/portfolio/projects/transversal2/01.webp"),
      withBase("/portfolio/projects/transversal2/02.webp"),
      withBase("/portfolio/covers/transversal2.webp"),
      withBase("/portfolio/projects/transversal2/03.webp"),
      withBase("/portfolio/projects/transversal2/04.webp"),
      withBase("/portfolio/projects/transversal2/05.webp"),
      withBase("/portfolio/projects/transversal2/06.webp"),
      withBase("/portfolio/projects/transversal2/07.webp"),
    ],
  },

  {
  slug: "placeres",
  heroImage: withBase("/portfolio/projects/placeres/08.webp"),
  title: "Placeres",
  summary:
    "A photographic series that romanticizes small everyday moments, inspired by Jacques Henri Lartigue and Marta Soliño’s “Placeres”.",
  year: "2026",
  tags: ["photoshop", "photography"],
  tools: ["Photography", "Photoshop"],
  cover: withBase("/portfolio/covers/placeres.webp"),

  // Case study fields
  course: "Fundamentals of Digital Image",
  assignment: "Composition based on an author",
  team: ["Mar Albiol", "Berta Beniel", "Nerea Fabregat", "María del Rocío Torres"],
  keywords: ["Happiness", "Everyday rituals", "Spontaneity", "Motion", "Natural light"],

  description:
    "Placeres explores whether happiness can be portrayed and how it appears in daily life. The series captures intimate, spontaneous gestures and small routines with a dynamic, light-filled visual approach.",
  concept:
    "In a fast-paced world, we often miss the tiny moments that make life feel softer. Placeres invites the viewer to slow down, pay attention, and turn everyday actions into visual poetry—finding wellbeing in presence rather than in big achievements.",
  inspiration: [
    "Movement and spontaneity: freezing the instant without posing.",
    "Natural light to keep the images bright, alive, and authentic.",
    "Bold framing and unexpected angles to enhance dynamism.",
    "Everyday intimacy: small gestures and routines as “pleasures”.",
  ],
  takeaways: {
    strengths: [
      "Spontaneous framing creates a fresh and energetic tone.",
      "Natural light adds texture and a sense of authenticity.",
      "Everyday scenes become emotionally relatable when treated with care.",
    ],
    limitations: [
      "There’s a risk of idealizing reality if the perspective is too narrow.",
      "We focused on universal, simple gestures to keep it approachable.",
    ],
  },

    gallery: [
      withBase("/portfolio/covers/placeres.webp"),
      withBase("/portfolio/projects/placeres/01.webp"),
      withBase("/portfolio/projects/placeres/02.webp"),
      withBase("/portfolio/projects/placeres/03.webp"),
      withBase("/portfolio/projects/placeres/04.webp"),
      withBase("/portfolio/projects/placeres/05.webp"),
      withBase("/portfolio/projects/placeres/06.webp"),
      withBase("/portfolio/projects/placeres/07.webp"),
      withBase("/portfolio/projects/placeres/08.webp"),
    ],
  },

  {
    slug: "aureo",
    title: "Áureo chocolates",
    summary:
      "Aureo is a branding and packaging system for an accessible “artisan chocolate” line—modern, friendly, and sustainability-driven, designed for both retail and online launch.",
    year: "2026",
    tags: ["illustrator", "blender"],
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    cover: withBase("/portfolio/covers/aureo.webp"),
    heroImage: withBase("/portfolio/projects/aureo/08.webp"),
    description:
      "Aureo is a family business evolving from traditional nougat into a contemporary chocolate brand. The goal was to democratize “author chocolate”: premium quality and experimentation at an accessible price point, supported by a clean, attractive visual system and sustainable packaging.",
    concept:
      "The identity balances heritage and modernity without looking “luxury”. The tone is close and confident—designed to feel high-quality but approachable. The packaging system prioritizes clarity (brand + flavor) and scalability across four bars, a welcome pack, a paper bag, and social media stories.",
    inspiration: [
      "Typography-first logo (no symbol) for versatility across packaging and social media.",
      "System-based layout: consistent hierarchy, clear flavor naming, and easy product recognition.",
      "Contemporary look with room for experimental flavors while staying readable on-shelf.",
      "Sustainability cues through material choices and restrained printing (CMYK + 1 special finish).",
    ],
    gallery: [
      withBase("/portfolio/projects/aureo/01.webp"),
      withBase("/portfolio/projects/aureo/02.webp"),
      withBase("/portfolio/covers/aureo.webp"),
      withBase("/portfolio/projects/aureo/03.webp"),
      withBase("/portfolio/projects/aureo/04.webp"),
      withBase("/portfolio/projects/aureo/05.webp"),
      withBase("/portfolio/projects/aureo/06.webp"),
      withBase("/portfolio/projects/aureo/07.webp"),
      withBase("/portfolio/projects/aureo/08.webp"),
    ],
  },
];
