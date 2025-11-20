// typescript-fetch-example.ts

type JokeResponse = {
  id: string;
  joke: string;
  status: number;
};

async function getRandomJoke(): Promise<void> {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: JokeResponse = await response.json();
    console.log(`Here's your random joke: ${data.joke}`);
  } catch (error) {
    console.error("Failed to fetch joke:", error);
  }
}

getRandomJoke();
