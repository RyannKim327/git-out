import * as readline from 'readline';

interface User {
    name: string;
    age: number;
    email: string;
}

class InputHandler {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async getUserInput(): Promise<User> {
        try {
            const name = await this.prompt('Enter your name: ');
            const age = await this.prompt('Enter your age: ');
            const email = await this.prompt('Enter your email: ');

            return {
                name: name.trim(),
                age: parseInt(age, 10),
                email: email.trim()
            };
        } catch (error) {
            throw new Error(`Input error: ${error.message}`);
        }
    }

    private prompt(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(question, resolve);
        });
    }

    close() {
        this.rl.close();
    }
}

// Example usage
async function main() {
    const inputHandler = new InputHandler();
    
    try {
        console.log('=== User Registration ===');
        const user = await inputHandler.getUserInput();
        
        console.log('\n=== User Information ===');
        console.log(`Name: ${user.name}`);
        console.log(`Age: ${user.age}`);
        console.log(`Email: ${user.email}`);
        
        // Validate age
        if (user.age < 0 || user.age > 150) {
            console.warn('Warning: Age seems unrealistic!');
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        inputHandler.close();
    }
}

// Run the program
main();
npm install -g typescript
tsc --init
tsc your-file.ts && node your-file.js
