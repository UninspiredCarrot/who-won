// test.ts

import { Match } from './types/Match';
import { Set } from './types/Set';

// Basic testing function
function runTests() {
    console.log("Running manual tests for Player class...");

    // Test 1: Create a new player and check default values
    const match = new Match();
    console.log(match.player1.name);
    console.log(match.player2.name);
    match.sets.push(new Set());
    console.log(match.sets[0].points1);
}

// Run the tests
runTests();
