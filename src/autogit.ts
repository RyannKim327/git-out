const original = [1, 2, 3, 4, 5];

// If you don’t mind mutating the original array:
original.reverse();          // original is now [5, 4, 3, 2, 1]

// If you want a fresh array and keep the original intact:
const reversed = [...original].reverse();   // reversed is [5, 4, 3, 2, 1]
const reversed = original.reduce(
  (acc, cur) => [cur, ...acc] as typeof original,
  [] as typeof original
);
// reversed is [5, 4, 3, 2, 1]
const reversed: typeof original = [];
for (let i = original.length - 1; i >= 0; i--) {
  reversed.push(original[i]);
}
// reversed is [5, 4, 3, 2, 1]
