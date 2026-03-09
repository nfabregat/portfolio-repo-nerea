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
    slug: "riceDenmark",
    title: "Rice Denmark",
    summary: "Project summary (edit this later).",
    year: "2026",
    tags: ["web"],
    tools: ["Vue", "TypeScript", "Tailwind"],
    cover: "/portfolio/covers/riceDenmark.webp",

    description: "Project overview (edit this later).",
    gallery: [
      "/portfolio/covers/riceDenmark.webp",
      "/portfolio/projects/riceDenmark/01.webp",
      "/portfolio/projects/riceDenmark/02.webp",
      "/portfolio/projects/riceDenmark/03.webp",
      "/portfolio/projects/riceDenmark/04.webp",
      "/portfolio/projects/riceDenmark/05.webp",
      "/portfolio/projects/riceDenmark/06.webp",
      "/portfolio/projects/riceDenmark/07.webp",
      "/portfolio/projects/riceDenmark/08.webp",
      "/portfolio/projects/riceDenmark/09.webp",
    ],
  },
  
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
];