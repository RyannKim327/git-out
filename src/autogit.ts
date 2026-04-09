/**
 * Compute n! recursively.
 *
 * @param n – non‑negative integer (or BigInt)
 * @returns n! as the same numeric type that was passed in
 */
function factorial(n: number): number;
function factorial(n: BigInt): BigInt;
function factorial(n: number | BigInt): number | BigInt {
  // Validate the input
  if (typeof n === "number") {
    if (!Number.isInteger(n) || n < 0) {
      throw new Error("n must be a non‑negative integer");
    }
    // Base case
    if (n <= 1) return 1;
    // Recursive step
    return n * factorial(n - 1);
  } else {
    // BigInt path – same logic, but with BigInt operations
    if (n < 0n) {
      throw new Error("n must be a non‑negative integer");
    }
    if (n <= 1n) return 1n;
    return n * factorial(n - 1n);
  }
}
console.log(factorial(5));   // 120
console.log(factorial(20));  // 2432902008176640000
console.log(factorial(20n)); // 2432902008176640000n (BigInt)
