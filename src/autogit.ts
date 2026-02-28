function countChar(str: string, target: string): number {
  let count = 0;
  for (const ch of str) {
    if (ch === target) count++;
  }
  return count;
}

const times = countChar("hello world", "l"); // 3
function countChar(str: string, target: string): number {
  return str.split(target).length - 1;
}

countChar("banana", "a"); // 3
function countChar(str: string, target: string): number {
  return [...str].filter(ch => ch === target).length;
}

countChar("👋👋👋 hello", "👋"); // 3
function countChar(str: string, target: string): number {
  const re = new RegExp(`\\${target}`, "g");
  const matches = str.match(re);
  return matches ? matches.length : 0;
}

countChar("mississippi", "i"); // 4
function multicharCount(str: string, targets: string[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const t of targets) result[t] = 0;

  for (const ch of str) {
    if (result.hasOwnProperty(ch)) result[ch]++;
  }
  return result;
}

multicharCount("abacaba", ["a", "b", "c"]); // { a:4, b:2, c:1 }
