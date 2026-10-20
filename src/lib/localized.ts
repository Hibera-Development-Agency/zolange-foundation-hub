import type { Language } from "@/i18n";

/**
 * Returns the localized value for a database field.
 * When the active language is French and a non-empty `<field>_fr` value
 * exists, that value is returned; otherwise the English field is used.
 */
export const getLocalized = <T extends Record<string, unknown>>(
  item: T | null | undefined,
  field: string,
  language: Language
): string => {
  if (!item) return "";
  if (language === "fr") {
    const frValue = item[`${field}_fr`];
    if (typeof frValue === "string" && frValue.trim() !== "") {
      return frValue;
    }
  }
  const value = item[field];
  return typeof value === "string" ? value : "";
};
