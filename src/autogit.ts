// random-star-wars-character.ts
// Fetches a random Star Wars character from SWAPI and prints a tiny summary.

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

interface Person {
  name: string;
  height: string;
  mass: string;
  films: string[];
}

const fetchRandomCharacter = async (): Promise<void> => {
  const id = randomInt(1, 83); // SWAPI has ~83 people
  const url = `https://swapi.dev/api/people/${id}/`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const person: Person = await res.json();

    console.log(`🌟 Random Star Wars Character 🌟`);
    console.log(`Name : ${person.name}`);
    console.log(`Height: ${person.height} cm`);
    console.log(`Mass  : ${person.mass} kg`);
    console.log(`Films : ${person.films.length}`);
  } catch (err) {
    console.error("Could not fetch character:", (err as Error).message);
  }
};

// Run it
fetchRandomCharacter();
