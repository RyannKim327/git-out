/**
 * Return n! (n factorial)
 * Works nicely for small n (≤ 20 with a regular number type)
 */
const factorialRec = (n: number): number => {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  return n <= 1 ? 1 : n * factorialRec(n - 1);
};

// Example
console.log(factorialRec(5)); // 120
/**
 * Same result but no recursion overhead
 */
const factorialIter = (n: number): number => {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  let result = 1;
  for (let i = 2; i <= n; ++i) {
    result *= i;
  }
  return result;
};

// Example
console.log(factorialIter(5)); // 120
/**
 * Uses BigInt so it never loses precision
 */
const factorialBig = (n: number): bigint => {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  let result = 1n; // 1n is a BigInt literal
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
};

// Example
console.log(factorialBig(100).toString()); // “933262154439…(ends with 00)”
