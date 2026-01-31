// 1️⃣  Install the dependencies first:
//     npm install axios @types/axios

import axios, { AxiosError } from "axios";

// 2️⃣  Define the shape of the data we expect back.
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// 3️⃣  Perform the request in an async function.
async function fetchUsers(): Promise<User[]> {
  const url = "https://jsonplaceholder.typicode.com/users";

  try {
    // 4️⃣  Make the GET request
    const response = await axios.get<User[]>(url);

    // 5️⃣  Axios automatically parses JSON, so `data` has the correct type
    return response.data;
  } catch (err) {
    // 6️⃣  Gracefully handle a possible Axios error
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError;
      console.error(
        `Request failed! 🙁 Status: ${error.response?.status}  Message: ${error.message}`
      );
    } else {
      console.error("Unexpected error:", err);
    }
    return []; // Return an empty array if something goes wrong
  }
}

// 7️⃣  Use the function somewhere in your app
(async () => {
  const users = await fetchUsers();
  console.log("Fetched users:", users);
})();
