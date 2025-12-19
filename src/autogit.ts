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

    // Function to get user input with validation
    async getUserInput(): Promise<User> {
        try {
            const name = await this.question('Enter your name: ');
            const ageInput = await this.question('Enter your age: ');
            const email = await this.question('Enter your email: ');

            const age = parseInt(ageInput);
            
            if (isNaN(age) || age <= 0) {
                throw new Error('Age must be a positive number');
            }

            if (!this.isValidEmail(email)) {
                throw new Error('Please enter a valid email address');
            }

            return {
                name: name.trim(),
                age,
                email: email.trim().toLowerCase()
            };
        } catch (error) {
            console.error('Error:', error.message);
            return await this.getUserInput(); // Retry on error
        }
    }

    // Wrapper for readline question with promise
    private question(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(prompt, resolve);
        });
    }

    // Simple email validation
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Close the readline interface
    close(): void {
        this.rl.close();
    }
}

// Main function
async function main() {
    console.log('=== User Registration ===');
    console.log('Please enter your information:\n');

    const inputHandler = new InputHandler();
    
    try {
        const userData = await inputHandler.getUserInput();
        
        console.log('\n=== User Information ===');
        console.log(`Name: ${userData.name}`);
        console.log(`Age: ${userData.age}`);
        console.log(`Email: ${userData.email}`);
        
        // Additional processing
        if (userData.age >= 18) {
            console.log('\n✅ You are eligible for registration!');
        } else {
            console.log('\n❌ You must be 18 or older to register.');
        }
        
    } catch (error) {
        console.error('Unexpected error:', error);
    } finally {
        inputHandler.close();
    }
}

// Run the program
if (require.main === module) {
    main().catch(console.error);
}

// Export for testing purposes
export { InputHandler, User };
npm install -g typescript
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    }
}
tsc filename.ts
node filename.js
=== User Registration ===
Please enter your information:

Enter your name: John Doe
Enter your age: 25
Enter your email: john.doe@example.com

=== User Information ===
Name: John Doe
Age: 25
Email: john.doe@example.com

✅ You are eligible for registration!
