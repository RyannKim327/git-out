const testCases = {
  normal: [3, 1, 4, 2],       // → 4
  negative: [-1, -5, -3],     // → -1
  single: [42],               // → 42
  empty: [],                  // → undefined
};

// Test all cases
Object.values(testCases).forEach(arr => {
  console.log(findMax(arr as number[]));
});
