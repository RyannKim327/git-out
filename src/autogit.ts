import axios from 'axios';

type CatFact = { fact: string; length: number };

const randomCatFact = async (): Promise<string> => {
  try {
    const { data } = await axios.get('https://catfact.ninja/fact');
    return (data as CatFact).fact;
  } catch (err) {
    console.error('The cats refused to spill the beans:', err);
    return 'No cat fact for you today 🙀';
  }
};

async function main() {
  const fact = await randomCatFact();
  console.log(`Random cat fact: ${fact}`);
}

main();
