function calculateTriangleArea(base: number, height: number): number {
    if (base < 0 || height < 0) {
        throw new Error("Base and height must be non-negative numbers");
    }
    return (base * height) / 2;
}

// Example usage
const area = calculateTriangleArea(5, 10);
console.log(`The area is: ${area}`); // Output: The area is: 25
function calculateTriangleAreaBySides(a: number, b: number, c: number): number {
    if (a <= 0 || b <= 0 || c <= 0) {
        throw new Error("Sides must be positive numbers");
    }
    
    const s = (a + b + c) / 2; // semi-perimeter
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    
    // Check for invalid triangle (area would be NaN)
    if (isNaN(area)) {
        throw new Error("Invalid triangle sides");
    }
    
    return area;
}

// Example usage
const areaBySides = calculateTriangleAreaBySides(3, 4, 5);
console.log(`The area is: ${areaBySides}`); // Output: The area is: 6
