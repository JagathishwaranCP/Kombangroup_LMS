/** Joins class names, skipping falsy entries. */
export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");
