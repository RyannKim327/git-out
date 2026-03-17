function countChar(str: string, char: string): number {
  let counter = 0;
  for (const c of str) {
    if (c === char) counter++;
  }
  return counter;
}
function countChar(str: string, char: string): number {
  // Escape regex specials if needed
  const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}
function countChar(str: string, char: string): number {
  return str.split(char).length - 1;
}
function countChar(str: string, char: string): number {
  return Array.from(str).filter(c => c === char).length;
}
console.log(countChar('hello world', 'l')); // 3
console.log(countChar('😀😃😄😁😆', '😄')); // 1
