type State = {
  value: string; // or any structure
  score: number; // higher is better in this example
};

function beamSearch(
  initialStates: State[],
  expand: (state: State) => State[],
  beamWidth: number,
  maxSteps: number
): State {
  let beam: State[] = initialStates;

  for (let step = 0; step < maxSteps; step++) {
    // Expand all states in the current beam
    const candidates: State[] = [];
    for (const state of beam) {
      candidates.push(...expand(state));
    }

    // Sort candidates by score (descending) and keep top beamWidth
    candidates.sort((a, b) => b.score - a.score);
    beam = candidates.slice(0, beamWidth);

    // Optionally: Check termination condition
    // For example, if top candidate has some perfect score
    if (beam[0].score === 1) {
      break;
    }
  }

  // Return the best state found
  return beam[0];
}
const target = "hello";

function scoreWord(word: string): number {
  let score = 0;
  for (let i = 0; i < Math.min(word.length, target.length); i++) {
    if (word[i] === target[i]) score++;
  }
  return score / target.length; // normalized 0–1
}

function expandState(state: State): State[] {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const nextStates: State[] = [];

  // Append one letter at a time
  for (const l of letters) {
    const newValue = state.value + l;
    nextStates.push({
      value: newValue,
      score: scoreWord(newValue)
    });
  }

  return nextStates;
}

const initial = [{ value: "", score: 0 }];

const best = beamSearch(initial, expandState, 3, 5);
console.log("Best guess:", best);
