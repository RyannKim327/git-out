interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

async function fetchRandomUser(): Promise<User> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData: User = await response.json();
        return userData;

    } catch (error) {
        console.error('Error fetching user:', error instanceof Error ? error.message : 'Unknown error');
        throw error;
    }
}

// Usage
(async () => {
    try {
        const user = await fetchRandomUser();
        console.log('User data:');
        console.log(`Name: ${user.name}`);
        console.log(`Email: ${user.email}`);
        console.log(`City: ${user.address.city}`);
        console.log(`Company: ${user.company.name}`);
    } catch {
        console.log('Failed to fetch user data');
    }
})();
npm install node-fetch @types/node-fetch typescript ts-node
npx ts-node api-example.ts
