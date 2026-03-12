// 1) Using a regular expression (remove *any* whitespace)
const clean1 = originalString.replace(/\s+/g, "");

// 2) If you only care about literal space characters (no tabs, newlines, etc.)
const clean2 = originalString.replace(/ /g, "");

// 3) Split/join – handy if you’re scrubbing a handful of specific delimiters
const clean3 = originalString.split(" ").join("");

// 4) Manual loop (useful if you need to do something with each char)
let clean4 = "";
for (const ch of originalString) {
  if (ch !== " ") clean4 += ch;
}
