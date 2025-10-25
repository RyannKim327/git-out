interface User {
    name: string;
    age: number;
    email: string;
}

class UserManager {
    private users: User[] = [];

    addUser(): void {
        const name = prompt("Enter user name:") || "Unknown";
        const ageInput = prompt("Enter user age:") || "0";
        const email = prompt("Enter user email:") || "unknown@example.com";

        const age = parseInt(ageInput);

        if (isNaN(age) || age < 0) {
            console.log("Invalid age entered!");
            return;
        }

        const newUser: User = {
            name,
            age,
            email
        };

        this.users.push(newUser);
        console.log(`User ${name} added successfully!`);
    }

    displayUsers(): void {
        console.log("\n--- All Users ---");
        this.users.forEach((user, index) => {
            console.log(`${index + 1}. Name: ${user.name}, Age: ${user.age}, Email: ${user.email}`);
        });
    }

    findUserByName(): void {
        const searchName = prompt("Enter name to search:")?.toLowerCase();
        
        if (!searchName) {
            console.log("No name entered!");
            return;
        }

        const foundUsers = this.users.filter(user => 
            user.name.toLowerCase().includes(searchName)
        );

        if (foundUsers.length === 0) {
            console.log("No users found with that name.");
        } else {
            console.log("\n--- Found Users ---");
            foundUsers.forEach(user => {
                console.log(`Name: ${user.name}, Age: ${user.age}, Email: ${user.email}`);
            });
        }
    }
}

// Main program
function main(): void {
    const userManager = new UserManager();
    let running = true;

    console.log("=== User Management System ===");

    while (running) {
        const choice = prompt(
            "\nChoose an option:\n1. Add User\n2. Display All Users\n3. Find User by Name\n4. Exit\n\nEnter choice (1-4):"
        );

        switch (choice) {
            case "1":
                userManager.addUser();
                break;
            case "2":
                userManager.displayUsers();
                break;
            case "3":
                userManager.findUserByName();
                break;
            case "4":
                running = false;
                console.log("Goodbye!");
                break;
            default:
                console.log("Invalid choice! Please enter 1-4.");
        }
    }
}

// Run the program
main();
