function calculateTriangleArea(base: number, height: number): number {
    return (base * height) / 2;
}

// Example usage
const base = 10;
const height = 5;
const area = calculateTriangleArea(base, height);
console.log(`The area is: ${area}`); // Output: The area is: 25
