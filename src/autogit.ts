/**
 * Calculates n! recursively.
 *
 * @param n - The non‑negative integer whose factorial to compute.
 * @returns n! as a number (or NaN if n < 0).
 */
function factorialRecursive(n: number): number {
  if (n < 0) return NaN;        // keep it simple: no negative factorials
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

// Example:
console.log(factorialRecursive(5)); // 120
/**
 * Calculates n! iteratively.
 *
 * @param n - The non‑negative integer to factorialize.
 * @returns n! as a number (or NaN if n < 0).
 */
function factorialIterative(n: number): number {
  if (n < 0) return NaN;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Example:
console.log(factorialIterative(10)); // 3628800
/**
 * Calculates n! exactly using BigInt.
 *
 * @param n - The non‑negative integer to factorialize.
 * @returns n! as a BigInt (or NaN if n < 0).
 */
function factorialBigInt(n: number): bigint {
  if (n < 0) throw new Error("Factorial isn't defined for negative numbers");
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

// Example:
console.log(factorialBigInt(20)); // 2432902008176640000n
const factorialMemo = new Map<number, number | bigint>();

function factorialMemoized(n: number): number | bigint {
  if (n < 0) throw new Error("Negative input");
  if (n <= 1) return 1;
  if (factorialMemo.has(n)) return factorialMemo.get(n)!;
  
  // choose number or bigint based on the expected size
  const answer = n * factorialMemoized(n - 1);
  factorialMemo.set(n, answer);
  return answer;
}
