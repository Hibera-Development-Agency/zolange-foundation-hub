import type { Dict, Language } from "./types";
import { common } from "./common";
import { home } from "./home";
import { about } from "./about";
import { projects } from "./projects";
import { team } from "./team";
import { volunteer } from "./volunteer";
import { contact } from "./contact";
import { donate } from "./donate";

export type { Language, Dict };

export const translations: Dict = {
  ...common,
  ...home,
  ...about,
  ...projects,
  ...team,
  ...volunteer,
  ...contact,
  ...donate,
};

export const translate = (key: string, language: Language): string => {
  const entry = translations[key];
  if (!entry) return key;
  return entry[language] ?? entry.en;
};
