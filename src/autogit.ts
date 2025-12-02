const s = "42";

// 1. parseInt (radix is *always* a good idea)
const n1: number = parseInt(s, 10);   // 42

// 2. Number constructor
const n2: number = Number(s);         // 42

// 3. If the string might be garbage, guard first
function toInt(str: string): number | null {
  const v = Number(str);
  return Number.isNaN(v) ? null : v;
}
