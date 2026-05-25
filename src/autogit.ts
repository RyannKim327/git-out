function removeAllWhitespace(str: string): string {
  return str.replace(/\s+/g, "");
}
function trimStart(str: string): string {
  return str.replace(/^\s+/, "");
}
function trimEnd(str: string): string {
  return str.replace(/\s+$/, "");
}
const raw = "\n  Let's   test this!  \t\n";
console.log("original  :", raw);
console.log("trimmed    :", raw.trim());
console.log("no spaces :", raw.replace(/\s+/g, ""));
original  : "
  Let's   test this!   
"
trimmed    : "Let's   test this!"
no spaces : "Letstestthis!"
