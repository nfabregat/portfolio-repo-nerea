export type ProjectTag = "web" | "ui" | "branding" | "video";

export interface Project {
  slug: string;       
  summary: string;
  year: string;
  tags: ProjectTag[];
  tools: string[];
  cover: string;   
  
  description: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "transversal2",
    title: "Transversal 2",
    summary: "Project summary (edit this later).",
    year: "2026",
    tags: ["web"],
    tools: ["Vue", "TypeScript", "Tailwind"],
    cover: "/portfolio/covers/transversal2.webp",

    description: "Project overview (edit this later).",
    gallery: [
      "/portfolio/covers/transversal2.webp",
      "/portfolio/projects/transversal2/01.webp",
      "/portfolio/projects/transversal2/02.webp",
      "/portfolio/projects/transversal2/03.webp",
      "/portfolio/projects/transversal2/04.webp",
      "/portfolio/projects/transversal2/05.webp",
      "/portfolio/projects/transversal2/06.webp",
      "/portfolio/projects/transversal2/07.webp",
    ],
  },

  {
    slug: "placeres",
    title: "Placeres",
    summary: "Short project summary (edit later).",
    year: "2026",
    tags: ["web"],
    tools: ["Vue", "TypeScript", "Tailwind"],
    cover: "/portfolio/covers/placeres.webp",
    description: "Project overview (edit later).",
    gallery: [
      "/portfolio/covers/placeres.webp",
      "/portfolio/projects/placeres/01.webp",
      "/portfolio/projects/placeres/02.webp",
      "/portfolio/projects/placeres/03.webp",
      "/portfolio/projects/placeres/04.webp",
      "/portfolio/projects/placeres/05.webp",
      "/portfolio/projects/placeres/06.webp",
      "/portfolio/projects/placeres/07.webp",
      "/portfolio/projects/placeres/08.webp",
    ],
  },

  {
    slug: "aureo",
    title: "Aureo",
    summary: "Short project summary (edit later).",
    year: "2026",
    tags: ["web"],
    tools: ["Vue", "TypeScript", "Tailwind"],
    cover: "/portfolio/covers/aureo.webp",
    description: "Project overview (edit later).",
    gallery: [
      "/portfolio/covers/aureo.webp",
      "/portfolio/projects/aureo/01.webp",
      "/portfolio/projects/aureo/02.webp",
      "/portfolio/projects/aureo/03.webp",
      "/portfolio/projects/aureo/04.webp",
      "/portfolio/projects/aureo/05.webp",
      "/portfolio/projects/aureo/06.webp",
      "/portfolio/projects/aureo/07.webp",
      "/portfolio/projects/aureo/08.webp",
    ],
  },
];