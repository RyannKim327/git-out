// 1. Define TypeScript Interfaces for the expected API response
// This helps ensure type safety and makes working with the data much easier.

interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

// 2. Define the API endpoint
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const USERS_ENDPOINT = '/users';

// 3. Asynchronous function to fetch users from the API
async function fetchUsers(): Promise<User[] | null> {
    console.log(`Attempting to fetch users from: ${API_BASE_URL}${USERS_ENDPOINT}`);
    try {
        // Make the API request using `fetch`
        const response = await fetch(`${API_BASE_URL}${USERS_ENDPOINT}`);

        // Check if the request was successful (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response body into a JavaScript object
        // We explicitly cast the result to `User[]` because we expect an array of User objects
        const users: User[] = await response.json();

        console.log(`Successfully fetched ${users.length} users.`);
        return users;

    } catch (error) {
        // Catch any errors that occurred during the fetch operation (e.g., network issues, invalid URL)
        console.error("Error fetching users:", error);
        return null; // Return null or throw the error further depending on error handling strategy
    }
}

// 4. Main execution block (using an Immediately Invoked Async Function Expression - IIAFE)
// This allows us to use `await` at the top level of our script.
(async () => {
    const users = await fetchUsers();

    if (users) {
        console.log("\n--- Displaying User Data ---");
        users.forEach(user => {
            console.log(`
            ID: ${user.id}
            Name: ${user.name} (${user.username})
            Email: ${user.email}
            Address: ${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}
            Company: ${user.company.name} ("${user.company.catchPhrase}")
            Website: ${user.website}
            Phone: ${user.phone}
            `);
        });

        // Example of accessing a specific typed property
        const firstUserEmail = users[0]?.email;
        if (firstUserEmail) {
            console.log(`The email of the first user is: ${firstUserEmail}`);
        }

    } else {
        console.log("Could not retrieve user data.");
    }
})();
Attempting to fetch users from: https://jsonplaceholder.typicode.com/users
Successfully fetched 10 users.

--- Displaying User Data ---

            ID: 1
            Name: Leanne Graham (Bret)
            Email: Sincere@april.biz
            Address: Kulas Light, Apt. 556, Gwenborough 92998-3874
            Company: Romaguera-Crona ("Multi-layered client-server neural-net")
            Website: hildegard.org
            Phone: 1-770-736-8031 x56442

... (output for other users) ...

            ID: 10
            Name: Clementina DuBuque (Moriah.Stanton)
            Email: Rey.Padberg@karina.biz
            Address: Kattie Turnpike, Suite 198, Lebsackbury 31428-2261
            Company: Hoeger LLC ("Centralized empowering task-force")
            Website: ola.org
            Phone: 0241-617-190

The email of the first user is: Sincere@april.biz
