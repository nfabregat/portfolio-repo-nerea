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
    title: "BSc in Design & Creative Technologies (2nd year)",
    institution: "Universitat Politècnica de València (UPV)",
    period: "Currently studying",
    notes: ["Design, creative technology, and visual/technical foundations."],
  },
  {
    title: "Artistic Baccalaureate",
    institution: "IES Leopoldo Querol, Vinaròs",
    period: "Completed",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Design",
    items: ["Branding systems", "Typography", "Visual hierarchy & layout", "Prototyping"],
  },
  {
    title: "Production",
    items: ["Photo editing & retouching", "3D basics"],
  },
  {
    title: "Collaboration",
    items: ["Collaboration & feedback", "Version control basics (Git/GitHub)"],
  },
];


export const otherInfo = {
  tools: [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe After Effects",
    "Adobe Premiere Pro",
    "Blender",
    "Procreate",
    "Figma",
    "VS Code",
    "GitHub",
    "Reaper",
    "Photography",
  ],
  languages: [
    "Spanish (native)",
    "Catalan (native)",
    "English (B2 — Cambridge certified)",
    "French (5 years of study)",
    "Czech (learning currently)",
  ],
  interests: [
    "Photography",
    "Web / UI design",
    "Branding & packaging",
    "Motion graphics",
    "3D exploration",
    "Creative technology",
  ],
};
