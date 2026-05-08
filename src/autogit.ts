const original = "a b  c\t\n  d";

const noSpaces = original.replaceAll(/\s+/g, ""); // → "abcd"
const noSpaces = original.replace(/\s+/g, "");
const noSpaces = original.split(/\s+/).join("");
