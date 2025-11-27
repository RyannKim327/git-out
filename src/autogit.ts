function factorial(n: number): number {
  // Input validation: Factorial is typically defined for non-negative integers.
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers.");
  }
  if (!Number.isInteger(n)) {
    throw new Error("Factorial is only defined for integers.");
  }

  // Base Case: The condition that stops the recursion.
  // The factorial of 0 is 1.
  if (n === 0) {
    return 1;
  }

  // Recursive Step: The function calls itself with a smaller input.
  // n! = n * (n-1)!
  return n * factorial(n - 1);
}

// --- Examples ---

console.log(`Factorial of 0: ${factorial(0)}`);   // Expected: 1
console.log(`Factorial of 1: ${factorial(1)}`);   // Expected: 1
console.log(`Factorial of 5: ${factorial(5)}`);   // Expected: 120 (5 * 4 * 3 * 2 * 1)
console.log(`Factorial of 10: ${factorial(10)}`); // Expected: 3628800

// --- Error Handling Examples ---
try {
  console.log(`Factorial of -3: ${factorial(-3)}`);
} catch (error: any) {
  console.error(`Error: ${error.message}`); // Expected: Factorial is not defined for negative numbers.
}

try {
  console.log(`Factorial of 3.5: ${factorial(3.5)}`);
} catch (error: any) {
  console.error(`Error: ${error.message}`); // Expected: Factorial is only defined for integers.
}
