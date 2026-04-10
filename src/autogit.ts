function customLength(s: string): number {
  let count = 0;
  while (s[count] !== undefined) {
    count++;
  }
  return count;
}
function customLengthUsingForOf(s: string): number {
  let count = 0;
  for (const _ of s) {
    count++;
  }
  return count;
}
