export type ProjectTag = "web" | "ui" | "branding" | "video";

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
    title: "Transversal 2",
    summary: "Project summary (edit this later).",
    year: "2026",
    tags: ["web"],
    tools: ["Vue", "TypeScript", "Tailwind"],
    cover: withBase("/portfolio/covers/transversal2.webp"),

    description: "Project overview (edit this later).",
    gallery: [
      withBase("/portfolio/covers/transversal2.webp"),
      withBase("/portfolio/projects/transversal2/01.webp"),
      withBase("/portfolio/projects/transversal2/02.webp"),
      withBase("/portfolio/projects/transversal2/03.webp"),
      withBase("/portfolio/projects/transversal2/04.webp"),
      withBase("/portfolio/projects/transversal2/05.webp"),
      withBase("/portfolio/projects/transversal2/06.webp"),
      withBase("/portfolio/projects/transversal2/07.webp"),
    ],
  },

  {
    slug: "placeres",
    title: "Placeres",
    summary: "Short project summary (edit later).",
    year: "2026",
    tags: ["web"],
    tools: ["Vue", "TypeScript", "Tailwind"],
    cover: withBase("/portfolio/covers/placeres.webp"),
    description: "Project overview (edit later).",
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
    title: "Aureo",
    summary: "Short project summary (edit later).",
    year: "2026",
    tags: ["web"],
    tools: ["Vue", "TypeScript", "Tailwind"],
    cover: withBase("/portfolio/covers/aureo.webp"),
    description: "Project overview (edit later).",
    gallery: [
      withBase("/portfolio/covers/aureo.webp"),
      withBase("/portfolio/projects/aureo/01.webp"),
      withBase("/portfolio/projects/aureo/02.webp"),
      withBase("/portfolio/projects/aureo/03.webp"),
      withBase("/portfolio/projects/aureo/04.webp"),
      withBase("/portfolio/projects/aureo/05.webp"),
      withBase("/portfolio/projects/aureo/06.webp"),
      withBase("/portfolio/projects/aureo/07.webp"),
      withBase("/portfolio/projects/aureo/08.webp"),
    ],
  },
];
