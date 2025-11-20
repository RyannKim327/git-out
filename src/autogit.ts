// A simple TypeScript program that demonstrates user input and type safety
import * as readline from 'readline';

// Define interface for user data
interface UserData {
    name: string;
    age: number;
    height: number;
}

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to process user input with type validation
const processUserInput = (): void => {
    let user: UserData = {
        name: '',
        age: 0,
        height: 0
    };

    const askName = () => {
        rl.question('Enter your name: ', (nameInput) => {
            user.name = nameInput;
            askAge();
        });
    };

    const askAge = () => {
        rl.question('Enter your age: ', (ageInput) => {
            const age = parseInt(ageInput);
            if (isNaN(age)) {
                console.log('Please enter a valid number for age!');
                askAge();
            } else {
                user.age = age;
                askHeight();
            }
        });
    };

    const askHeight = () => {
        rl.question('Enter your height in cm: ', (heightInput) => {
            const height = parseFloat(heightInput);
            if (isNaN(height)) {
                console.log('Please enter a valid number for height!');
                askHeight();
            } else {
                user.height = height;
                displayUserData(user);
                rl.close();
            }
        });
    };

    const displayUserData = (user: UserData): void => {
        console.log('\n--- User Profile ---');
        console.log(`Name: ${user.name.toUpperCase()}`);
        console.log(`Age: ${user.age}`);
        console.log(`Height: ${user.height} cm`);
        
        // Type-guarding example
        if (user.age >= 18) {
            console.log('Status: Adult user');
        } else {
            console.log('Status: Minor user');
        }
    };

    askName();
};

// Start the input process
processUserInput();
