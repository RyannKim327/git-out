// Import the 'readline' module to handle user input in the console
import * as readline from 'readline';

// Create an interface for reading input and writing output
const rl = readline.createInterface({
    input: process.stdin, // Standard input (keyboard)
    output: process.stdout // Standard output (console)
});

/**
 * Promisifies the rl.question function to use async/await
 * @param query The question to ask the user
 * @returns A promise that resolves with the user's input string
 */
function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl.question(query, resolve));
}

// Main asynchronous function to handle the interaction
async function main() {
    console.log("--- Welcome to the TypeScript Fun Fact Generator! ---");

    // 1. Get user's name
    const name: string = await askQuestion("What's your name? ");
    console.log(`Hello, ${name}!`);

    // 2. Get user's favorite number
    let favoriteNumberInput: string;
    let favoriteNumber: number;

    // Loop until a valid number is entered
    while (true) {
        favoriteNumberInput = await askQuestion("What's your favorite whole number? ");
        favoriteNumber = parseInt(favoriteNumberInput);

        if (isNaN(favoriteNumber)) {
            console.log("That doesn't look like a valid number. Please try again.");
        } else if (!Number.isInteger(favoriteNumber)) {
            console.log("Please enter a *whole* number. Try again.");
        }
        else {
            break; // Exit loop if input is a valid integer
        }
    }

    console.log(`Okay, ${favoriteNumber} is a great choice!`);

    // 3. Perform a simple calculation and generate a "fun fact"
    const doubledNumber: number = favoriteNumber * 2;
    const isEven: boolean = favoriteNumber % 2 === 0;
    const isPositive: boolean = favoriteNumber > 0;

    console.log("\n--- Here's a fun fact about your number: ---");
    console.log(`Your favorite number doubled is: ${doubledNumber}.`);
    console.log(`It's an ${isEven ? 'even' : 'odd'} number.`);

    if (favoriteNumber > 100) {
        console.log("Wow, that's a big number!");
    } else if (favoriteNumber < 0) {
        console.log("An interesting choice for a negative number!");
    } else if (favoriteNumber === 7) {
        console.log("Ah, 7! A classic lucky number!");
    } else if (favoriteNumber === 42) {
        console.log("42, the answer to the ultimate question of life, the universe, and everything!");
    } else {
        console.log("Every number has its own unique charm!");
    }

    if (isPositive) {
        console.log("And it's a positive number!");
    } else if (favoriteNumber < 0) {
        console.log("And it's a negative number!");
    } else {
        console.log("And it's zero! The origin of all numbers!");
    }


    console.log("\n--- Thanks for playing! Goodbye! ---");

    // Close the readline interface to terminate the program cleanly
    rl.close();
}

// Call the main function to start the interaction
main();
