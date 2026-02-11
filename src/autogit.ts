function safeParseInt(s: string, radix = 10): number | undefined {
  const n = parseInt(s, radix);
  return isNaN(n) ? undefined : n;
}
const intVal = parseInt(myStr, 10); // for ordinary integers
const floatVal = Number(myStr);     // for decimals, natural format
const alt = +myStr;                 // the one‑liner version of Number
