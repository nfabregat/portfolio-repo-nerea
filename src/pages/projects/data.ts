export type ProjectTag = "web" | "ui" | "branding" | "video";

export interface Project {
  slug: string;       
  summary: string;
  year: string;
  tags: ProjectTag[];
  tools: string[];
  cover: string;      
}

export const projects: Project[] = [
  {
    slug: "mi-web-base",
    title: "Base Vue Website (Class Project)",
    summary: "Starting point built in class with Vue, TypeScript, Router and Tailwind.",
    year: "2026",
    tags: ["web", "ui"],
    tools: ["Vue", "TypeScript", "Tailwind"],
    cover: "/vite.svg",
  },
  {
    slug: "ui-components",
    title: "UI Components Collection",
    summary: "Reusable UI components and responsive layouts.",
    year: "2026",
    tags: ["ui"],
    tools: ["shadcn/ui", "Lucide", "Tailwind"],
    cover: "/vite.svg",
  },
  {
    slug: "branding-piece",
    title: "Branding Exercise",
    summary: "Visual identity exploration: typography, color, and layout decisions.",
    year: "2026",
    tags: ["branding"],
    tools: ["Illustrator", "Figma"],
    cover: "/vite.svg",
  },
];