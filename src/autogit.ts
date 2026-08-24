/**
 * Return the factorial of a non‑negative integer.
 *
 * @param n - the number to calculate the factorial of.
 * @returns factorial(n) as a number (or BigInt if you want larger values).
 * @throws TypeError if the input is not a non‑negative integer.
 */
function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError("Factorial is only defined for non‑negative integers");
  }

  // Base case: 0! = 1 and 1! = 1
  if (n <= 1) return 1;

  // Recursive step: n! = n * (n – 1)!
  return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // 120
function factorialBig(n: BigInt): BigInt {
  if (n < 0n) throw new TypeError("Must be non‑negative");

  if (n <= 1n) return 1n;

  return n * factorialBig(n - 1n);
}

console.log(factorialBig(20n).toString()); // 2432902008176640000
