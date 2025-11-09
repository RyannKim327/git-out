interface BeamSearchNode<T> {
  state: T;
  score: number;
  sequence: any[]; // Could be tokens, words, etc.
  completed?: boolean;
}

interface BeamSearchConfig {
  beamWidth: number;
  maxDepth: number;
  earlyStopping?: boolean;
}

class BeamSearch<T> {
  private beamWidth: number;
  private maxDepth: number;
  private earlyStopping: boolean;

  constructor(config: BeamSearchConfig) {
    this.beamWidth = config.beamWidth;
    this.maxDepth = config.maxDepth;
    this.earlyStopping = config.earlyStopping || false;
  }

  /**
   * Main beam search algorithm
   */
  async search(
    initialStates: BeamSearchNode<T>[],
    getNextStates: (currentState: T) => Promise<BeamSearchNode<T>[]>,
    isComplete: (state: T) => boolean
  ): Promise<BeamSearchNode<T>[]> {
    let beam: BeamSearchNode<T>[] = initialStates;

    for (let depth = 0; depth < this.maxDepth; depth++) {
      const candidates: BeamSearchNode<T>[] = [];

      // Generate next states for all nodes in current beam
      for (const node of beam) {
        if (node.completed) {
          candidates.push(node);
          continue;
        }

        const nextStates = await getNextStates(node.state);
        
        for (const nextState of nextStates) {
          const completed = isComplete(nextState.state);
          candidates.push({
            state: nextState.state,
            score: node.score + nextState.score,
            sequence: [...node.sequence, nextState.sequence],
            completed
          });
        }
      }

      // Sort candidates by score and select top-k
      candidates.sort((a, b) => b.score - a.score);
      
      beam = candidates.slice(0, this.beamWidth);

      // Early stopping if all top candidates are complete
      if (this.earlyStopping && beam.every(node => node.completed)) {
        break;
      }
    }

    return beam;
  }
}
// Example usage for text generation
interface TextGenerationState {
  currentText: string;
  lastToken: string;
}

class TextBeamSearch extends BeamSearch<TextGenerationState> {
  private vocabulary: string[];
  private targetLength: number;

  constructor(
    config: BeamSearchConfig,
    vocabulary: string[],
    targetLength: number
  ) {
    super(config);
    this.vocabulary = vocabulary;
    this.targetLength = targetLength;
  }

  // Scoring function - could be replaced with a neural network
  private scoreToken(currentText: string, token: string): number {
    // Simple example scoring - in practice, use a language model
    const baseScore = Math.random(); // Replace with actual model prediction
    const lengthPenalty = currentText.length / this.targetLength;
    return baseScore - lengthPenalty;
  }

  async generateNextTokens(
    currentState: TextGenerationState
  ): Promise<BeamSearchNode<TextGenerationState>[]> {
    const nextNodes: BeamSearchNode<TextGenerationState>[] = [];

    for (const token of this.vocabulary) {
      const newText = currentState.currentText + token;
      const score = this.scoreToken(currentState.currentText, token);

      nextNodes.push({
        state: {
          currentText: newText,
          lastToken: token
        },
        score: score,
        sequence: [token]
      });
    }

    return nextNodes;
  }

  isComplete(state: TextGenerationState): boolean {
    return state.currentText.length >= this.targetLength;
  }

  async generateText(initialPrompt: string): Promise<string[]> {
    const initialState: BeamSearchNode<TextGenerationState> = {
      state: {
        currentText: initialPrompt,
        lastToken: ''
      },
      score: 0,
      sequence: []
    };

    const results = await this.search(
      [initialState],
      this.generateNextTokens.bind(this),
      this.isComplete.bind(this)
    );

    return results.map(result => result.state.currentText);
  }
}

// Usage example
async function example() {
  const vocabulary = [' hello', ' world', ' how', ' are', ' you', '?', '!'];
  const beamSearch = new TextBeamSearch(
    { beamWidth: 3, maxDepth: 10, earlyStopping: true },
    vocabulary,
    15
  );

  const generatedTexts = await beamSearch.generateText('Start:');
  console.log('Generated texts:', generatedTexts);
}

example();
interface AdvancedBeamSearchConfig extends BeamSearchConfig {
  minScoreThreshold?: number;
  diversityPenalty?: number;
}

class AdvancedBeamSearch<T> extends BeamSearch<T> {
  private minScoreThreshold: number;
  private diversityPenalty: number;

  constructor(config: AdvancedBeamSearchConfig) {
    super(config);
    this.minScoreThreshold = config.minScoreThreshold || -Infinity;
    this.diversityPenalty = config.diversityPenalty || 0;
  }

  protected applyDiversityPenalty(
    candidates: BeamSearchNode<T>[],
    currentBeam: BeamSearchNode<T>[]
  ): BeamSearchNode<T>[] {
    if (this.diversityPenalty === 0) return candidates;

    return candidates.map(candidate => {
      // Penalize candidates similar to those already in beam
      const similarity = this.calculateSimilarity(candidate, currentBeam);
      return {
        ...candidate,
        score: candidate.score - this.diversityPenalty * similarity
      };
    });
  }

  private calculateSimilarity(
    candidate: BeamSearchNode<T>,
    beam: BeamSearchNode<T>[]
  ): number {
    // Implement your similarity metric here
    // For text, this could be based on shared tokens or embeddings
    return 0; // Placeholder
  }

  async search(
    initialStates: BeamSearchNode<T>[],
    getNextStates: (currentState: T) => Promise<BeamSearchNode<T>[]>,
    isComplete: (state: T) => boolean
  ): Promise<BeamSearchNode<T>[]> {
    let beam = initialStates;

    for (let depth = 0; depth < this.maxDepth; depth++) {
      const candidates: BeamSearchNode<T>[] = [];

      for (const node of beam) {
        if (node.completed) {
          candidates.push(node);
          continue;
        }

        const nextStates = await getNextStates(node.state);
        
        for (const nextState of nextStates) {
          const completed = isComplete(nextState.state);
          const newNode = {
            state: nextState.state,
            score: node.score + nextState.score,
            sequence: [...node.sequence, nextState.sequence],
            completed
          };

          // Apply minimum score threshold
          if (newNode.score >= this.minScoreThreshold) {
            candidates.push(newNode);
          }
        }
      }

      // Apply diversity penalty
      const penalizedCandidates = this.applyDiversityPenalty(candidates, beam);
      
      penalizedCandidates.sort((a, b) => b.score - a.score);
      beam = penalizedCandidates.slice(0, this.beamWidth);

      if (this.earlyStopping && beam.every(node => node.completed)) {
        break;
      }
    }

    return beam;
  }
}
