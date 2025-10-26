// Random Number Guessing Game with Input
class NumberGame {
    private secretNumber: number;
    private attempts: number = 0;
    
    constructor(min: number = 1, max: number = 100) {
        this.secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Method to process user input
    guessNumber(userInput: string): string {
        this.attempts++;
        
        const guessedNumber = parseInt(userInput);
        
        if (isNaN(guessedNumber)) {
            return "Please enter a valid number!";
        }
        
        if (guessedNumber === this.secretNumber) {
            return `🎉 Congratulations! You guessed it in ${this.attempts} attempts!`;
        } else if (guessedNumber < this.secretNumber) {
            return "📈 Try higher!";
        } else {
            return "📉 Try lower!";
        }
    }
    
    getSecretNumber(): number {
        return this.secretNumber;
    }
}

// Example usage with simulated input
const game = new NumberGame();

// Simulating user inputs
const inputs = ["50", "75", "25", "60", "85", "95", "100"];

console.log("🤔 Guess the number between 1-100!");
console.log("Secret number:", game.getSecretNumber()); // Cheat code!

inputs.forEach((input, index) => {
    console.log(`\nAttempt ${index + 1}: "${input}"`);
    const result = game.guessNumber(input);
    console.log(result);
});

// Function to get real user input (Node.js environment)
function getUserInput(): void {
    if (typeof process !== 'undefined') {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question('Enter your guess: ', (input: string) => {
            const result = game.guessNumber(input);
            console.log(result);
            
            if (result.includes("Congratulations")) {
                readline.close();
            } else {
                getUserInput(); // Recursive call for next guess
            }
        });
    }
}

// Uncomment to play with real input (Node.js only)
// console.log("🤔 Guess the number between 1-100!");
// getUserInput();

export { NumberGame };
