import * as readline from 'readline';

// Create an interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask a question and return a promise
function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

// Main function to run the program
async function main() {
    const name = await askQuestion("What is your name? ");
    const ageInput = await askQuestion("What is your age? ");

    // Convert age input to a number
    const age = parseInt(ageInput, 10);

    if (isNaN(age)) {
        console.log("Please enter a valid number for your age.");
    } else {
        const yearsUntil100 = 100 - age;
        console.log(`Hello, ${name}! You have ${yearsUntil100} years until you turn 100.`);
    }

    // Close the readline interface
    rl.close();
}

// Run the main function
main();
