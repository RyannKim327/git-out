function factorial(n: number): number {
  // Validate input: must be non-negative integer
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Factorial is only defined for non-negative integers.");
  }

  let result = 1;
  // Multiply all integers from 2 to n
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
function factorialRecursive(n: number): number {
  // Input validation
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Factorial is only defined for non-negative integers.");
  }

  // Base case: 0! = 1
  if (n === 0) {
    return 1;
  }
  return n * factorialRecursive(n - 1);
}
console.log(factorial(0));     // 1 (0!)
console.log(factorial(5));     // 120 (5!)
console.log(factorial(10));    // 3,628,800 (10!)
console.log(factorial(170));   // ~7.257415615308004e+306 (max precise value)
console.log(factorial(171));   // Infinity (due to floating-point limits)
