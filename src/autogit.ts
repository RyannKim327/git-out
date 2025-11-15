interface Candidate<T> {
    sequence: T[];
    score: number; // Log probability (higher is better)
    completed?: boolean;
}

type NextStepGenerator<T> = (current: T[]) => Promise<Candidate<T>[]>;
type ScoreComparator<T> = (a: Candidate<T>, b: Candidate<T>) => number;

class BeamSearch<T> {
    constructor(
        private beamWidth: number,
        private maxSteps: number,
        private nextStepGenerator: NextStepGenerator<T>,
        private scoreComparator: ScoreComparator<T> = (a, b) => b.score - a.score
    ) {}

    async search(initialSequence: T[] = []): Promise<Candidate<T>[]> {
        // Initialize beam with starting candidate
        let beam: Candidate<T>[] = [{
            sequence: initialSequence,
            score: 0,
            completed: false
        }];

        for (let step = 0; step < this.maxSteps; step++) {
            const candidates: Candidate<T>[] = [];

            // Generate next steps for each candidate in current beam
            for (const candidate of beam) {
                if (candidate.completed) {
                    candidates.push(candidate);
                    continue;
                }

                const nextCandidates = await this.nextStepGenerator(candidate.sequence);
                for (const next of nextCandidates) {
                    candidates.push({
                        sequence: [...candidate.sequence, ...next.sequence],
                        score: candidate.score + next.score,
                        completed: next.completed
                    });
                }
            }

            // Filter out completed candidates
            const completedCandidates = candidates.filter(c => c.completed);
            const activeCandidates = candidates.filter(c => !c.completed);

            // Sort and select top candidates
            activeCandidates.sort(this.scoreComparator);
            beam = activeCandidates.slice(0, this.beamWidth);

            // Early termination if all candidates are completed
            if (beam.length === 0) {
                return completedCandidates.sort(this.scoreComparator);
            }
        }

        // Return both completed and active candidates
        return [
            ...beam,
            ...beam.filter(c => c.completed)
        ].sort(this.scoreComparator);
    }
}
// Example for text generation
type Token = string;

// Mock next step generator for demonstration
const mockGenerator: NextStepGenerator<Token> = async (currentSequence) => {
    // In practice, this would call your ML model for next token predictions
    // This example uses a simple mock with random probabilities
    const mockTokens: Token[] = ['the', 'a', 'some', 'one'];
    
    return mockTokens.map(token => ({
        sequence: [token],
        score: Math.log(Math.random()), // Using log probabilities
        completed: token === 'one' // Arbitrary completion condition
    }));
};

// Example execution
const beamSearch = new BeamSearch<Token>(
    3,  // Beam width
    5,  // Max steps
    mockGenerator
);

const initialSequence: Token[] = ['start'];
beamSearch.search(initialSequence)
    .then(results => {
        console.log('Top candidates:');
        results.forEach((candidate, i) => {
            console.log(`${i + 1}: ${candidate.sequence.join(' ')} - Score: ${candidate.score}`);
        });
    });
