function factorial(n: number): number {
  // 1. Input Validation:
  // Factorial is traditionally defined for non-negative integers.
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers.");
  }
  if (n !== Math.floor(n)) {
    throw new Error("Factorial is only defined for non-negative integers.");
  }

  // 2. Base Case:
  // The factorial of 0 (and 1) is 1. This is where the recursion stops.
  if (n === 0) {
    return 1;
  }

  // 3. Recursive Step:
  // n! = n * (n-1)!
  // The function calls itself with `n - 1`, moving closer to the base case.
  return n * factorial(n - 1);
}

// --- Examples ---
console.log(`Factorial of 0: ${factorial(0)}`);   // Expected: 1
console.log(`Factorial of 1: ${factorial(1)}`);   // Expected: 1
console.log(`Factorial of 2: ${factorial(2)}`);   // Expected: 2 * 1 = 2
console.log(`Factorial of 3: ${factorial(3)}`);   // Expected: 3 * 2 * 1 = 6
console.log(`Factorial of 5: ${factorial(5)}`);   // Expected: 5 * 4 * 3 * 2 * 1 = 120
console.log(`Factorial of 10: ${factorial(10)}`); // Expected: 3628800

// --- Error Handling Examples ---
try {
  console.log(`Factorial of -1: ${factorial(-1)}`);
} catch (error: any) {
  console.error(`Error: ${error.message}`); // Expected: Error: Factorial is not defined for negative numbers.
}

try {
  console.log(`Factorial of 3.5: ${factorial(3.5)}`);
} catch (error: any) {
  console.error(`Error: ${error.message}`); // Expected: Error: Factorial is only defined for non-negative integers.
}

// --- Large Number Caution ---
// JavaScript's 'number' type uses 64-bit floating point, which can lead to
// precision issues or 'Infinity' for very large factorials.
// Factorial of 170 is the last one that fits in a 'number' type without being Infinity.
// Factorial of 171 will result in Infinity.
console.log(`Factorial of 170: ${factorial(170)}`); // A very large number
console.log(`Factorial of 171: ${factorial(171)}`); // Expected: Infinity
