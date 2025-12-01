// --- 1. Defining Types for Structured Input ---
// This makes our function inputs clear and helps catch errors early.

interface PlayerStats {
    name: string;
    level: number;
    health: number;
    magicPower: number;
    hasSpecialItem?: boolean; // Optional property
}

type MagicEffect = "healing" | "damage" | "boost"; // A union type for specific string values

// --- 2. Core Function: Calculating Magic Score ---
// This function takes a PlayerStats object as input and returns a calculated score.

/**
 * Calculates a player's magic score based on their stats and a chosen magic effect.
 * @param stats The player's statistics.
 * @param effect The type of magic effect to apply (influences score calculation).
 * @param bonusMultiplier An optional multiplier for the final score.
 * @returns A string summarizing the player's magic score.
 */
function calculateMagicScore(
    stats: PlayerStats,
    effect: MagicEffect,
    bonusMultiplier: number = 1 // Default parameter value
): string {
    let baseScore = stats.level * 10 + stats.magicPower * 2;

    // Apply effect-specific modifiers
    switch (effect) {
        case "healing":
            baseScore += stats.health * 0.5;
            console.log(`Applying healing effect...`);
            break;
        case "damage":
            baseScore += stats.level * 5; // Damage scales more with level
            console.log(`Applying damage effect...`);
            break;
        case "boost":
            baseScore += stats.magicPower * 1.5;
            console.log(`Applying boost effect...`);
            break;
        default:
            // This case should ideally not be reachable due to `MagicEffect` type,
            // but it's good practice for robustness.
            console.warn(`Unknown magic effect: ${effect}. No specific modifier applied.`);
    }

    // Apply special item bonus if present
    if (stats.hasSpecialItem) {
        baseScore *= 1.25; // 25% bonus for special item
        console.log(`Special item bonus applied!`);
    }

    // Apply optional bonus multiplier
    const finalScore = baseScore * bonusMultiplier;

    return `${stats.name}'s Magic Score for ${effect} effect: ${finalScore.toFixed(2)}`;
}

// --- 3. Example Usage with Direct Function Parameters ---
console.log("--- Direct Input via Function Parameters ---");

const player1Stats: PlayerStats = {
    name: "Anya",
    level: 15,
    health: 80,
    magicPower: 90,
    hasSpecialItem: true
};

const player2Stats: PlayerStats = {
    name: "Bren",
    level: 10,
    health: 120,
    magicPower: 50
    // hasSpecialItem is optional, so we can omit it
};

console.log(calculateMagicScore(player1Stats, "boost", 1.5));
console.log(calculateMagicScore(player2Stats, "healing")); // Using default bonusMultiplier
console.log(calculateMagicScore(player1Stats, "damage"));

// --- 4. Simulated User Input (like a CLI or Browser Prompt) ---
// In a real application, you'd use `prompt()` (browser) or `readline` (Node.js)
// Here, we simulate by pre-defining input variables.

console.log("\n--- Simulated User Input ---");

// Helper function to simulate getting string input
function getSimulatedStringInput(promptMessage: string, defaultValue: string): string {
    // In a real browser: return prompt(promptMessage) || defaultValue;
    // In Node.js: Use readline.question(...)
    console.log(`(Simulating input for: "${promptMessage}")`);
    // For this example, we just return a predefined value.
    if (promptMessage.includes("name")) return "Caleb";
    if (promptMessage.includes("effect")) return "damage";
    return defaultValue;
}

// Helper function to simulate getting number input
function getSimulatedNumberInput(promptMessage: string, defaultValue: number): number {
    // In a real browser: const input = prompt(promptMessage); return input ? parseFloat(input) : defaultValue;
    // In Node.js: Use readline.question(...) and parse result
    console.log(`(Simulating input for: "${promptMessage}")`);
    // For this example, we just return a predefined value.
    if (promptMessage.includes("level")) return 20;
    if (promptMessage.includes("health")) return 100;
    if (promptMessage.includes("magic power")) return 110;
    if (promptMessage.includes("multiplier")) return 1.8;
    return defaultValue;
}

// Helper function to simulate getting boolean input
function getSimulatedBooleanInput(promptMessage: string, defaultValue: boolean): boolean {
    // In a real environment: const input = prompt(promptMessage)?.toLowerCase(); return input === 'yes' || input === 'true';
    console.log(`(Simulating input for: "${promptMessage}")`);
    // For this example, we just return a predefined value.
    if (promptMessage.includes("special item")) return true;
    return defaultValue;
}

const playerNameInput = getSimulatedStringInput("Enter player name:", "Anonymous");
const playerLevelInput = getSimulatedNumberInput("Enter player level:", 1);
const playerHealthInput = getSimulatedNumberInput("Enter player health:", 50);
const playerMagicPowerInput = getSimulatedNumberInput("Enter player magic power:", 20);
const playerHasSpecialItemInput = getSimulatedBooleanInput("Does player have a special item? (yes/no):", false);
const magicEffectInput: MagicEffect = getSimulatedStringInput("Choose magic effect (healing, damage, boost):", "healing") as MagicEffect; // Type assertion needed for simulated input
const bonusMultiplierInput = getSimulatedNumberInput("Enter bonus multiplier (e.g., 1.5):", 1);


const player3Stats: PlayerStats = {
    name: playerNameInput,
    level: playerLevelInput,
    health: playerHealthInput,
    magicPower: playerMagicPowerInput,
    hasSpecialItem: playerHasSpecialItemInput
};

console.log(calculateMagicScore(player3Stats, magicEffectInput, bonusMultiplierInput));

// Example with another simulated player, but with less input
console.log("\n--- Another Simulated Player ---");
const player4Stats: PlayerStats = {
    name: getSimulatedStringInput("Enter player name:", "Zoe"), // Simulating different input values
    level: getSimulatedNumberInput("Enter player level:", 8),
    health: getSimulatedNumberInput("Enter player health:", 60),
    magicPower: getSimulatedNumberInput("Enter player magic power:", 45),
    hasSpecialItem: false
};
console.log(calculateMagicScore(player4Stats, "healing"));
