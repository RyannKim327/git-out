interface State {
    sequence: string[];
    score: number; // A score representing the quality of the sequence
}
function scoringFunction(sequence: string[]): number {
    // Placeholder scoring: sum the lengths of the actions in the sequence
    return sequence.reduce((acc, action) => acc + action.length, 0);
}
function beamSearch(actions: string[], beamWidth: number, maxDepth: number): string[] {
    let currentBeam: State[] = [{ sequence: [], score: 0 }];
    
    for (let depth = 0; depth < maxDepth; depth++) {
        let nextBeam: State[] = [];
        
        for (const state of currentBeam) {
            for (const action of actions) {
                const newSequence = [...state.sequence, action];
                const newScore = scoringFunction(newSequence);
                
                nextBeam.push({ sequence: newSequence, score: newScore });
            }
        }

        // Sort the new candidates by score and take the top `beamWidth`
        nextBeam.sort((a, b) => b.score - a.score);
        currentBeam = nextBeam.slice(0, beamWidth);
    }
    
    // Return the best sequence from the final beam
    currentBeam.sort((a, b) => b.score - a.score);
    return currentBeam[0].sequence;
}
const actions = ['a', 'b', 'c', 'd'];
const beamWidth = 2;
const maxDepth = 3;

const bestSequence = beamSearch(actions, beamWidth, maxDepth);
console.log('Best sequence:', bestSequence);
