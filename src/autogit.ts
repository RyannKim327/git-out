/**
 * Returns n! (n factorial) for a non‑negative integer.
 *
 * @param n A non‑negative integer (0, 1, 2, …).
 * @returns The factorial of n. Returns 1 for n = 0.
 * @throws Error if n is negative.
 */
function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers.");
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Example
console.log(factorial(5)); // 120
function factorialRecursive(n: number): number {
  if (n < 0) {
    throw new Error("Negative input not allowed.");
  }
  return n <= 1 ? 1 : n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(5)); // 120
function factorialBigInt(n: number): bigint {
  if (n < 0) throw new Error("Negative input not allowed.");
  let result = 1n;          // BigInt literal starts with n
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

console.log(factorialBigInt(100).toString());
// "933262154... (full 158‑digit number)"
console.assert(factorial(0) === 1);
console.assert(factorial(1) === 1);
console.assert(factorial(5) === 120);
console.assert(factorialBigInt(10).toString() === "3628800");
