export interface EducationItem {
  title: string;
  institution: string;
  period: string;
  notes?: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export const education: EducationItem[] = [
  {
    title: "Higher National Diploma / Degree (Your program name)",
    institution: "Your school / university",
    period: "2024 — 2026",
    notes: ["Focus on web design, frontend development, and digital projects."],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["Vue 3", "TypeScript", "Vue Router", "Tailwind CSS"],
  },
  {
    title: "UI / Design",
    items: ["Figma", "Responsive layout", "Component design"],
  },
  {
    title: "Tools",
    items: ["Git / GitHub", "VS Code"],
  },
];