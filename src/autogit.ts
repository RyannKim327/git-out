// xkcd.ts
import fetch from 'node-fetch';

interface XkcdComic {
  num: number;
  title: string;
  img: string;
  alt: string;
}

async function getRandomXkcd(): Promise<XkcdComic> {
  // 1. get the latest comic to learn the max number
  const latest = await fetch('https://xkcd.com/info.0.json').then(r => r.json() as Promise<XkcdComic>);
  const maxNum = latest.num;

  // 2. pick a random comic id
  const randomId = Math.floor(Math.random() * maxNum) + 1;

  // 3. fetch that comic
  return fetch(`https://xkcd.com/${randomId}/info.0.json`).then(r => r.json() as Promise<XkcdComic>);
}

(async () => {
  try {
    const comic = await getRandomXkcd();
    console.log(`#${comic.num} — ${comic.title}`);
    console.log(comic.img);
  } catch (err) {
    console.error('Failed to fetch comic:', err);
  }
})();
