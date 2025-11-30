// random-trivia.ts
import axios, { AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';

type TriviaQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type TriviaResponse = {
  response_code: number;
  results: TriviaQuestion[];
};

function delay(ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms));
}

async function getRandomTrivia(amount: number = 1): Promise<TriviaQuestion[]> {
  const { data }: AxiosResponse<Trivia-Response> = await axios.get('https://opentdb.com/api.php', {
    params: { amount, encode: 'url3986' }
  });
  return data.results.map(q => ({
    ...q,
    question: decodeURIComponent(q.question),
    correct_answer: decodeURIComponent(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map(a => decodeURIComponent(a))
  }));
}

async function simulateQuiz() {
  const questions = await getRandomTrivia(5);
  for (const [idx, q] of questions.entries()) {
    console.log(`\nQuestion ${idx + 1}: ${q.question}`);
    console.log(`Category: ${q.category}, Difficulty: ${q.difficulty}`);
    console.log(`Correct answer: ${q.correct_answer}`);
    await delay(2000);
  }
}

// Run the quiz
simulateQuiz().catch(console.error);
