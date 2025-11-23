interface Beam {
    sequence: any[];
    score: number;
    completed?: boolean;
}

interface BeamSearchOptions {
    beamWidth: number;
    maxLength: number;
    getNextStates: (currentSequence: any[]) => Promise<{state: any, score: number}[]>;
    isComplete?: (sequence: any[]) => boolean;
}

class BeamSearch {
    async search(initialState: any, options: BeamSearchOptions): Promise<Beam[]> {
        const { beamWidth, maxLength, getNextStates, isComplete } = options;
        
        // Initialize beams with initial state
        let beams: Beam[] = [{ sequence: [initialState], score: 0, completed: false }];
        
        for (let step = 0; step < maxLength; step++) {
            const candidates: Beam[] = [];
            
            // Generate candidates from current beams
            for (const beam of beams) {
                if (beam.completed) {
                    candidates.push(beam);
                    continue;
                }
                
                const nextStates = await getNextStates(beam.sequence);
                
                for (const { state, score } of nextStates) {
                    const newSequence = [...beam.sequence, state];
                    const newScore = beam.score + score;
                    const completed = isComplete ? isComplete(newSequence) : false;
                    
                    candidates.push({
                        sequence: newSequence,
                        score: newScore,
                        completed
                    });
                }
            }
            
            // Sort candidates by score and select top beamWidth
            candidates.sort((a, b) => b.score - a.score);
            beams = candidates.slice(0, beamWidth);
            
            // Check if all beams are completed
            if (beams.every(beam => beam.completed)) {
                break;
            }
        }
        
        return beams;
    }
}
interface WordProbability {
    word: string;
    probability: number;
}

class TextBeamSearch extends BeamSearch {
    private vocabulary: string[];
    private languageModel: Map<string, WordProbability[]>;
    
    constructor(vocabulary: string[], languageModel: Map<string, WordProbability[]>) {
        super();
        this.vocabulary = vocabulary;
        this.languageModel = languageModel;
    }
    
    async generateText(startWord: string, beamWidth: number = 3, maxLength: number = 10): Promise<string[]> {
        const options: BeamSearchOptions = {
            beamWidth,
            maxLength,
            getNextStates: this.getNextWords.bind(this),
            isComplete: (sequence) => sequence[sequence.length - 1] === '<END>'
        };
        
        const results = await this.search(startWord, options);
        return results.map(beam => beam.sequence.join(' ').replace('<END>', ''));
    }
    
    private async getNextWords(currentSequence: string[]): Promise<{state: string, score: number}[]> {
        const lastWord = currentSequence[currentSequence.length - 1];
        const nextWords = this.languageModel.get(lastWord) || [];
        
        return nextWords.map(({ word, probability }) => ({
            state: word,
            score: Math.log(probability) // Use log probabilities to avoid underflow
        }));
    }
}
interface AdvancedBeamSearchOptions extends BeamSearchOptions {
    lengthPenalty?: number;
    earlyStopping?: boolean;
    minLength?: number;
}

class AdvancedBeamSearch extends BeamSearch {
    async advancedSearch(
        initialState: any, 
        options: AdvancedBeamSearchOptions
    ): Promise<Beam[]> {
        const { 
            beamWidth, 
            maxLength, 
            getNextStates, 
            isComplete, 
            lengthPenalty = 0.6,
            earlyStopping = true,
            minLength = 1
        } = options;
        
        let beams: Beam[] = [{ sequence: [initialState], score: 0, completed: false }];
        let completedBeams: Beam[] = [];
        
        for (let step = 0; step < maxLength; step++) {
            const candidates: Beam[] = [];
            
            for (const beam of beams) {
                if (beam.completed) {
                    candidates.push(beam);
                    continue;
                }
                
                const nextStates = await getNextStates(beam.sequence);
                
                for (const { state, score } of nextStates) {
                    const newSequence = [...beam.sequence, state];
                    const lengthAdjustedScore = this.applyLengthPenalty(beam.score + score, newSequence.length, lengthPenalty);
                    const completed = isComplete ? isComplete(newSequence) : false;
                    
                    candidates.push({
                        sequence: newSequence,
                        score: lengthAdjustedScore,
                        completed
                    });
                }
            }
            
            // Sort and select top candidates
            candidates.sort((a, b) => b.score - a.score);
            
            // Separate completed and ongoing beams
            const newCompleted = candidates.filter(beam => beam.completed && beam.sequence.length >= minLength);
            const ongoing = candidates.filter(beam => !beam.completed).slice(0, beamWidth);
            
            completedBeams = [...completedBeams, ...newCompleted]
                .sort((a, b) => b.score - a.score)
                .slice(0, beamWidth);
            
            beams = ongoing;
            
            // Early stopping condition
            if (earlyStopping && completedBeams.length >= beamWidth && 
                completedBeams[0].score > beams[0]?.score) {
                break;
            }
            
            if (beams.length === 0) break;
        }
        
        return [...completedBeams, ...beams]
            .sort((a, b) => b.score - a.score)
            .slice(0, beamWidth);
    }
    
    private applyLengthPenalty(score: number, length: number, alpha: number): number {
        return score / Math.pow(length, alpha);
    }
}
// Example usage with a simple language model
const vocabulary = ['hello', 'world', 'ai', 'typescript', '<END>'];
const languageModel = new Map<string, WordProbability[]>([
    ['hello', [{ word: 'world', probability: 0.6 }, { word: 'ai', probability: 0.4 }]],
    ['world', [{ word: '<END>', probability: 0.7 }, { word: 'ai', probability: 0.3 }]],
    ['ai', [{ word: 'typescript', probability: 0.5 }, { word: '<END>', probability: 0.5 }]],
    ['typescript', [{ word: '<END>', probability: 1.0 }]]
]);

const textGenerator = new TextBeamSearch(vocabulary, languageModel);

// Generate text
textGenerator.generateText('hello', 2, 5)
    .then(results => {
        console.log('Generated texts:', results);
    })
    .catch(error => {
        console.error('Error:', error);
    });
