// Define interface for user data structure
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

// Function to fetch user data from API
async function fetchUsers(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User[] = await response.json();
    return data;
}

// Main function to process and display user data
async function displayUserInfo() {
    try {
        const users = await fetchUsers();
        
        console.log('Fetched user data:');
        users.forEach(user => {
            console.log(`
ID: ${user.id}
Name: ${user.name}
Username: ${user.username}
Email: ${user.email}
City: ${user.address.city}
Phone: ${user.phone}
Company: ${user.company.name}
Website: http://${user.website}
            `);
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
    }
}

// Execute the main function
displayUserInfo();
ID: 1
Name: Leanne Graham
Username: Bret
Email: Sincere@april.biz
City: Gwenborough
Phone: 1-770-736-8031 x56442
Company: Romaguera-Crona
Website: http://hildegard.org
