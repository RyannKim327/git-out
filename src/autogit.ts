const reversed = [...str].reverse().join('');
function reverseString(s: string): string {
  return [...s].reverse().join('');
}

console.log(reverseString('TypeScript')); // "tpircSepyT"
