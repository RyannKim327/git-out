function factorial(n: number): number {
  if (n < 0) throw new Error("Negative numbers don't have factorials.");
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // prints 120
function factorial(n: number): number {
  if (n < 0) throw new Error("Negative numbers don't have factorials.");
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5)); // prints 120
