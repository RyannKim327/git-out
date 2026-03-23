/**
 * Recursively returns n! (n factorial).
 *
 * @param n - non‑negative integer (or bigint)
 * @returns n! as a bigint
 */
export function factorial(n: bigint | number): bigint {
  // Normalize input to bigint
  const x = typeof n === "bigint" ? n : BigInt(n);

  // Negative numbers are not defined for factorial
  if (x < 0n) {
    throw new Error("Factorial is defined only for non‑negative integers.");
  }

  // Base case: 0! = 1, 1! = 1
  if (x === 0n || x === 1n) {
    return 1n;
  }

  // Recursive case: n! = n * (n-1)!
  return x * factorial(x - 1n);
}
console.log(factorial(5));        // 120n
console.log(factorial(20));       // 2432902008176640000n
console.log(factorial(25n));      // 15511210043330985984000000n
function factorialTail(n: bigint, acc = 1n): bigint {
  if (n <= 1n) return acc;
  return factorialTail(n - 1n, acc * n);
}
