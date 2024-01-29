export const THE_REGULAR_SPACE = " ";
export const THIN_SPACE = " ";
export const HAIRLINE_SPACE = " ";
export const PUNCTUATION_SPACE = " ";
export const EN_SPACE = " ";
export const EM_SPACE = " ";
export const EN_QUAD_SPACE = " ";
export const EM_QUAD_SPACE = " ";
export const FIGURE_SPACE = " ";
export const NARROW_NON_BREAKING_SPACE = " ";
export const NON_BREAKING_SPACE = " ";
export const EN_DASH = "–";
export const EM_DASH = "—";
export const FIGURE_DASH = "‒";
export const NON_BREAKING_HYPHEN = "‑";
export const HORIZONTAL_LINE = "―";

export const HORRIBLE_CHARACTERS = {
  THIN_SPACE,
  HAIRLINE_SPACE,
  PUNCTUATION_SPACE,
  EN_SPACE,
  EM_SPACE,
  EN_QUAD_SPACE,
  EM_QUAD_SPACE,
  FIGURE_SPACE,
  NARROW_NON_BREAKING_SPACE,
  NON_BREAKING_SPACE,
  EN_DASH,
  EM_DASH,
  FIGURE_DASH,
  NON_BREAKING_HYPHEN,
  HORIZONTAL_LINE,
};

export function matching(char: string | string[]): RegExp {
  if (Array.isArray(char)) {
    return new RegExp(`[${char.join()}]`, "g");
  }
  return new RegExp(char, "g");
}

export function describeHorribleCharactersIn(str: string): string[] {
  return Object.entries(HORRIBLE_CHARACTERS)
    .filter(([perticularBrandOfEvil, char]) => str.match(matching(char)))
    .map(
      ([perticularBrandOfEvilPresentlyInfectingInnocentString]) =>
        perticularBrandOfEvilPresentlyInfectingInnocentString,
    );
}

export const MATCH_TINY_SPACES = matching([
  THIN_SPACE,
  HAIRLINE_SPACE,
  PUNCTUATION_SPACE,
]);
