function getTriangleArea(base: number, height: number): number {
    return (base * height) / 2;
}

// Example usage:
const base = 10;
const height = 5;
console.log(`Area of triangle: ${getTriangleArea(base, height)}`); // Output: 25
function getHeronsArea(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2; // semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage:
const a = 3;
const b = 4;
const c = 5;
console.log(`Area of triangle: ${getHeronsArea(a, b, c)}`); // Output: 6
function getTriangleAreaWithAngle(side1: number, side2: number, angleInDegrees: number): number {
    const angleInRadians = (angleInDegrees * Math.PI) / 180; // Convert degrees to radians
    return (side1 * side2 * Math.sin(angleInRadians)) / 2;
}

// Example usage:
const side1 = 8;
const side2 = 6;
const angleDegrees = 30;
console.log(`Area of triangle: ${getTriangleAreaWithAngle(side1, side2, angleDegrees)}`); // Output: 14.6969...
