const n: number = Number(str);   // or: +str
if (!Number.isNaN(n)) {
  // use n
}
const int = parseInt(str, 10);   // "123abc" → 123
const intValue = Number(str) as number; // no runtime “integer” type exists
function toInt(s: string): number | null {
  const n = Number(s);
  return Number.isInteger(n) ? n : null;
}
