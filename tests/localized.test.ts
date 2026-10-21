import { describe, expect, test } from "bun:test";
import { getLocalized } from "../src/lib/localized";

describe("saved bilingual content", () => {
  const project = { title: "English title", title_fr: "Titre français" };
  test("French locale selects the saved French text", () => {
    expect(getLocalized(project, "title", "fr")).toBe("Titre français");
  });
  test("English locale selects the saved English text", () => {
    expect(getLocalized(project, "title", "en")).toBe("English title");
  });
  test("a blank French field falls back to English", () => {
    expect(getLocalized({ ...project, title_fr: "  " }, "title", "fr")).toBe("English title");
  });
  test("a missing French field falls back to English", () => {
    expect(getLocalized({ title: "English title" }, "title", "fr")).toBe("English title");
  });
});