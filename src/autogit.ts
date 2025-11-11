// A simple program that calculates the area of a circle
function calculateCircleArea(radius: number): number {
    return Math.PI * radius * radius;
}

// Function to get and validate user input
function getUserInput(): number {
    const input = prompt("Enter the radius of the circle:");
    
    if (input === null) {
        throw new Error("User cancelled the input");
    }

    const radius = parseFloat(input);
    
    if (isNaN(radius) || radius <= 0) {
        throw new Error("Invalid input. Please enter a positive number.");
    }

    return radius;
}

// Main function
function main() {
    try {
        const radius = getUserInput();
        const area = calculateCircleArea(radius);
        
        console.log(`The area of a circle with radius ${radius} is: ${area.toFixed(2)}`);
        alert(`The area of a circle with radius ${radius} is: ${area.toFixed(2)}`);
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

// Run the program
main();
