import { Match } from '../types/Match';
import { Rules } from '../types/Rules';
import { Player } from '../types/Player';
import { Set } from '../types/Set';

describe('Match Class', () => {
    let player1: Player;
    let player2: Player;
    let match: Match;

    beforeEach(() => {
        player1 = new Player('Player 1');
        player2 = new Player('Player 2');
        match = new Match(player1, player2);
    });

    test('should initialize with correct default values', () => {
        expect(match.player1.name).toBe('Player 1');
        expect(match.player2.name).toBe('Player 2');
        expect(match.state).toBe('Not Started');
        expect(match.sets.length).toBe(0);
    });

    test('should start the match and initialize the first set', () => {
        match.start();
        expect(match.state).toBe('Playing');
        expect(match.sets.length).toBe(1);
        expect(match.sets[0]).toBeInstanceOf(Set);
    });

    test('should throw an error if increment is called before the match starts', () => {
        expect(() => match.increment(player1)).toThrow('Match has not started');
    });

    test('should increment points for a player and add points to the set', () => {
        match.start();
        match.increment(player1);
        expect(match.sets[0].getPlayerScore(player1)).toBe(1);
        expect(match.sets[0].getPlayerScore(player2)).toBe(0);
    });

    test('should start a new set when a set is complete', () => {
        match.start();

        // Simulate player1 winning the set
        for (let i = 0; i < match.rules.maxPoints; i++) {
            match.increment(player1);
        }

        expect(match.sets[0].isDone()).toBe(true);
        expect(match.sets.length).toBe(2);  // Second set should be initialized
    });

    test('should declare the match as finished if a player wins the required number of sets', () => {
        match.start();

        // Simulate player1 winning all required sets to finish the match
        match.setScore(match.player1, match.player2, [21, 21], [19, 19])
        expect(match.state).toBe('Finished');
        expect(match.endState!.winner).toBe(player1);
        expect(match.endState!.loser).toBe(player2);
    });

    test('should correctly set custom scores and handle match progression', () => {
        match.start();
        
        // Set custom scores for each set
        const score1 = [21, 1, 21];
        const score2 = [8, 21, 9];
        match.setScore(player1, player2, score1, score2);

        // Verify scores
        expect(match.getScore()).toEqual([
            [21, 8], // Set 1: Player 1 wins
            [1, 21], // Set 2: Player 2 wins
            [21, 9], // Set 3: Player 1 wins
        ]);

        // Ensure match ends correctly when player1 wins 2 out of 3 sets
        expect(match.state).toBe('Finished');
        expect(match.endState!.winner).toBe(player1);
    });

    test('should throw an error if trying to increment after the match is finished', () => {
        match.start();
        
        const score1 = [21, 1, 21];
        const score2 = [8, 21, 9];
        match.setScore(player1, player2, score1, score2);

        expect(match.state).toBe('Finished');
        expect(() => match.increment(player1)).toThrow('Match has ended');
    });

});
